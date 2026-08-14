(function () {
  "use strict";

  /* =========================================================
     PUBLIC CERTIFICATES — everyone sees these
     1. Put image files in folder:  certificates/your-file.jpg
     2. Add one object below for each certificate
     3. image path must match the file name
     ========================================================= */
  var DEFAULT_CERTS = [
    // EXAMPLE — delete or edit these and add your real ones:
    // {
    //   id: 1,
    //   title: "Supervised Machine Learning: Regression and Classification",
    //   org: "Coursera/DeepLearning.AI/Stanford",
    //   date: "28 Dec 2025",
    //   image: "certificates/supervised_machine_learning.png"
    // }
    // {
    //   id: 2,
    //   title: "AI Fundamentals",
    //   org: "IBM",
    //   date: "Jul 2025",
    //   image: "certificates/ai-fundamentals.jpg"
    // }
  ];

  var ADMIN_PASSWORD = "vijesh10101010"; // change this
  var CERT_KEY = "vk_certs_board_v2";
  var ADMIN_KEY = "vk_admin_unlocked";
  var MAX_IMAGE_SIDE = 1400;
  var MAX_DATA_MB = 1.8;

  // ----- Scroll reveal -----
  var revealEls = document.querySelectorAll("section, .project-card");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var parent = e.target.parentElement;
          if (parent && parent.classList.contains("projects-grid")) {
            var kids = Array.prototype.slice.call(parent.children);
            var i = kids.indexOf(e.target);
            if (i >= 0) e.target.style.transitionDelay = i * 0.07 + "s";
          }
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // ----- Nav -----
  var sections = document.querySelectorAll("section[id], #certificates");
  var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  function setActive() {
    var current = "";
    sections.forEach(function (s) {
      if (s.id && window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    navLinks.forEach(function (l) {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length > 1) {
        var t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          window.scrollTo({
            top: t.getBoundingClientRect().top + window.pageYOffset - 80,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // ----- Skills marquee L→R -----
  var track = document.getElementById("skillsTrack");
  var marquee = document.getElementById("skillsMarquee");
  if (track && marquee) {
    var offset = 0, speed = 0.5, paused = false, dragging = false;
    var startX = 0, startOff = 0, halfW = 0;
    function measure() {
      var cards = track.querySelectorAll(".skill-card");
      var half = Math.floor(cards.length / 2);
      if (half < 1) return;
      halfW = cards[half].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
      if (Math.abs(offset) < 1) offset = -halfW * 0.1;
    }
    measure();
    window.addEventListener("resize", measure);
    function tick() {
      if (!paused && !dragging && halfW > 0) {
        offset += speed;
        if (offset >= 0) offset -= halfW;
      }
      track.style.transform = "translateX(" + offset + "px)";
      requestAnimationFrame(tick);
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(tick);
    }
    marquee.addEventListener("mouseenter", function () { paused = true; });
    marquee.addEventListener("mouseleave", function () { if (!dragging) paused = false; });
    function down(e) {
      dragging = true; paused = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startOff = offset;
    }
    function move(e) {
      if (!dragging) return;
      var x = e.clientX || (e.touches && e.touches[0].clientX);
      offset = startOff + (x - startX);
      while (offset > 0) offset -= halfW;
      while (offset < -halfW) offset += halfW;
    }
    function up() { dragging = false; paused = false; }
    marquee.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    marquee.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);
  }

  // ----- Admin -----
  function isAdmin() { return sessionStorage.getItem(ADMIN_KEY) === "1"; }
  function setAdmin(on) {
    if (on) {
      sessionStorage.setItem(ADMIN_KEY, "1");
      document.body.classList.add("is-admin");
    } else {
      sessionStorage.removeItem(ADMIN_KEY);
      document.body.classList.remove("is-admin");
    }
  }
  if (isAdmin()) document.body.classList.add("is-admin");
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get("admin") === ADMIN_PASSWORD) setAdmin(true);
  } catch (e) {}

  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add("open");
    m.style.display = "flex";
  }
  function closeModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.remove("open");
    m.style.display = "none";
  }

  document.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      closeModal(btn.getAttribute("data-close"));
    });
  });
  document.querySelectorAll(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) {
      if (e.target === m) {
        m.classList.remove("open");
        m.style.display = "none";
      }
    });
  });

  var unlockBtn = document.getElementById("adminUnlockBtn");
  if (unlockBtn) {
    unlockBtn.addEventListener("click", function () {
      if (isAdmin()) {
        setAdmin(false);
        unlockBtn.textContent = "Admin unlock";
        alert("Admin locked.");
      } else {
        openModal("adminModal");
      }
    });
  }
  var adminForm = document.getElementById("adminForm");
  if (adminForm) {
    adminForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (document.getElementById("adminPass").value === ADMIN_PASSWORD) {
        setAdmin(true);
        closeModal("adminModal");
        if (unlockBtn) unlockBtn.textContent = "Lock admin";
        alert("Admin unlocked.");
      } else {
        alert("Wrong password.");
      }
    });
  }

  var openCertBtn = document.getElementById("openCertModal");
  if (openCertBtn) {
    openCertBtn.addEventListener("click", function () {
      if (!isAdmin()) { openModal("adminModal"); return; }
      resetUpload();
      openModal("addCertModal");
    });
  }

  // ----- File upload (preview only on this PC — for permanent use code method) -----
  var pendingDataUrl = null;
  var fileInput = document.getElementById("certFile");
  var uploadZone = document.getElementById("uploadZone");
  var fileNameEl = document.getElementById("fileName");
  var previewThumb = document.getElementById("previewThumb");

  function resetUpload() {
    pendingDataUrl = null;
    if (fileInput) fileInput.value = "";
    if (fileNameEl) fileNameEl.textContent = "";
    if (previewThumb) {
      previewThumb.style.display = "none";
      previewThumb.removeAttribute("src");
    }
  }

  function readAndCompress(file, cb) {
    if (!file || !file.type.match(/^image\//)) {
      alert("Please choose an image file (PNG/JPG).");
      return;
    }
    var reader = new FileReader();
    reader.onload = function (ev) {
      var img = new Image();
      img.onload = function () {
        var w = img.width, h = img.height;
        var scale = 1;
        if (w > MAX_IMAGE_SIDE || h > MAX_IMAGE_SIDE) {
          scale = MAX_IMAGE_SIDE / Math.max(w, h);
        }
        var cw = Math.round(w * scale);
        var ch = Math.round(h * scale);
        var canvas = document.createElement("canvas");
        canvas.width = cw;
        canvas.height = ch;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, cw, ch);
        var quality = 0.82;
        var dataUrl = canvas.toDataURL("image/jpeg", quality);
        while (dataUrl.length > MAX_DATA_MB * 1024 * 1024 && quality > 0.45) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        if (dataUrl.length > MAX_DATA_MB * 1024 * 1024 * 1.2) {
          alert("Image still too large. Try a smaller photo.");
          return;
        }
        cb(dataUrl, file.name);
      };
      img.onerror = function () { alert("Could not read image."); };
      img.src = ev.target.result;
    };
    reader.onerror = function () { alert("Could not read file."); };
    reader.readAsDataURL(file);
  }

  if (uploadZone && fileInput) {
    uploadZone.addEventListener("click", function () { fileInput.click(); });
    fileInput.addEventListener("change", function () {
      var f = fileInput.files && fileInput.files[0];
      if (!f) return;
      readAndCompress(f, function (dataUrl, name) {
        pendingDataUrl = dataUrl;
        if (fileNameEl) fileNameEl.textContent = name + " ✓ ready";
        if (previewThumb) {
          previewThumb.src = dataUrl;
          previewThumb.style.display = "block";
        }
      });
    });
    uploadZone.addEventListener("dragover", function (e) {
      e.preventDefault();
      uploadZone.classList.add("dragover");
    });
    uploadZone.addEventListener("dragleave", function () {
      uploadZone.classList.remove("dragover");
    });
    uploadZone.addEventListener("drop", function (e) {
      e.preventDefault();
      uploadZone.classList.remove("dragover");
      var f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (!f) return;
      readAndCompress(f, function (dataUrl, name) {
        pendingDataUrl = dataUrl;
        if (fileNameEl) fileNameEl.textContent = name + " ✓ ready";
        if (previewThumb) {
          previewThumb.src = dataUrl;
          previewThumb.style.display = "block";
        }
      });
    });
  }

  // ----- Certificates -----
  // Public list = DEFAULT_CERTS (in code, visible to everyone)
  // localStorage extras = only visible on this browser (admin testing)
  var localCerts = [];
  var rots = [-2.5, 1.8, -1.2, 2.2, -3, 1, -1.8, 2.8];

  function loadLocal() {
    try { localCerts = JSON.parse(localStorage.getItem(CERT_KEY) || "[]"); }
    catch (e) { localCerts = []; }
  }
  function saveLocal() {
    try {
      localStorage.setItem(CERT_KEY, JSON.stringify(localCerts));
    } catch (e) {
      alert("Storage full. Use the permanent method (images folder + DEFAULT_CERTS).");
      throw e;
    }
  }

  function allCerts() {
    // Everyone always sees DEFAULT_CERTS
    // Admin also sees localStorage pins on this PC
    return DEFAULT_CERTS.concat(localCerts);
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function renderCerts() {
    var g = document.getElementById("certsGrid");
    if (!g) return;
    var list = allCerts();
    if (!list.length) {
      g.innerHTML = '<p class="board-empty">No certificates yet. Add them in script.js → DEFAULT_CERTS (see README note).</p>';
      return;
    }
    g.innerHTML = list.map(function (c, i) {
      var isLocal = localCerts.some(function (x) { return x.id === c.id; });
      return (
        '<div class="cert-note" style="--rot:' + rots[i % rots.length] + 'deg" data-id="' + c.id + '" data-local="' + (isLocal ? "1" : "0") + '">' +
          '<span class="pin"></span><span class="tape"></span>' +
          (isLocal
            ? '<button type="button" class="remove-cert admin-only" data-remove="' + c.id + '" title="Delete">✕</button>'
            : "") +
          "<h3>" + esc(c.title) + "</h3>" +
          '<p class="cert-org">' + esc(c.org) + "</p>" +
          '<p class="cert-date">' + esc(c.date || "") + "</p>" +
          '<p class="view-hint">Click to view →</p>' +
        "</div>"
      );
    }).join("");

    g.querySelectorAll(".cert-note").forEach(function (note) {
      note.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-cert")) return;
        var id = Number(note.getAttribute("data-id"));
        var c = allCerts().filter(function (x) { return x.id === id; })[0];
        if (c) openViewer(c);
      });
    });
    g.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!isAdmin()) return;
        if (!confirm("Delete this local certificate?")) return;
        var id = Number(btn.getAttribute("data-remove"));
        localCerts = localCerts.filter(function (x) { return x.id !== id; });
        saveLocal();
        renderCerts();
      });
    });
  }

  function openViewer(c) {
    document.getElementById("viewerTitle").textContent = c.title || "Certificate";
    document.getElementById("viewerMeta").textContent =
      (c.org || "") + (c.date ? " · " + c.date : "") + " · View only · no download";
    var body = document.getElementById("viewerBody");
    body.innerHTML = "";
    if (c.image) {
      var img = document.createElement("img");
      img.src = c.image;
      img.alt = c.title || "Certificate";
      img.draggable = false;
      body.appendChild(img);
    } else {
      body.innerHTML = '<p style="color:#c4b59a;padding:2rem;text-align:center;">No image for this certificate.</p>';
    }
    openModal("viewerModal");
  }

  var viewerBody = document.getElementById("viewerBody");
  if (viewerBody) {
    viewerBody.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  }

  loadLocal();
  renderCerts();

  var certForm = document.getElementById("certForm");
  if (certForm) {
    certForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isAdmin()) return;
      var title = document.getElementById("certTitle").value.trim();
      var org = document.getElementById("certOrg").value.trim();
      var date = document.getElementById("certDate").value.trim();
      if (!title || !org) return;
      if (!pendingDataUrl) {
        alert("Please choose a certificate image first.");
        return;
      }
      // Local pin (only this browser) + show how to make permanent
      var entry = {
        id: Date.now(),
        title: title,
        org: org,
        date: date,
        image: pendingDataUrl
      };
      localCerts.push(entry);
      try {
        saveLocal();
      } catch (err) {
        localCerts.pop();
        return;
      }
      renderCerts();
      certForm.reset();
      resetUpload();
      closeModal("addCertModal");

      alert(
        "Pinned on THIS computer only.\n\n" +
        "To show it to EVERYONE permanently:\n" +
        "1. Save the certificate image into folder: certificates/\n" +
        "   e.g. certificates/" + title.replace(/\s+/g, "-").toLowerCase() + ".jpg\n" +
        "2. Open script.js and add inside DEFAULT_CERTS:\n\n" +
        "{\n" +
        "  id: " + entry.id + ",\n" +
        "  title: \"" + title.replace(/"/g, '\\"') + "\",\n" +
        "  org: \"" + org.replace(/"/g, '\\"') + "\",\n" +
        "  date: \"" + date.replace(/"/g, '\\"') + "\",\n" +
        "  image: \"certificates/your-file-name.jpg\"\n" +
        "}\n\n" +
        "Then upload the website files again (with the certificates folder)."
      );
    });
  }

  // Legacy project helpers
  window.addProject = function (event) {
    event.preventDefault();
    if (!window.customProjects) window.customProjects = [];
    window.customProjects.push({
      id: Date.now(),
      name: document.getElementById("projectName").value,
      date: document.getElementById("projectDate").value,
      desc: document.getElementById("projectDesc").value,
      tech: document.getElementById("projectTech").value.split(",").map(function (t) { return t.trim(); }),
      link: document.getElementById("projectLink").value
    });
    displayCustomProjects();
    document.getElementById("projectForm").reset();
    alert("Project added!");
  };
  window.displayCustomProjects = function () {
    var c = document.getElementById("customProjects");
    if (!c) return;
    var list = window.customProjects || [];
    if (!list.length) {
      c.innerHTML = '<p style="text-align:center;color:var(--muted)">No custom projects</p>';
      return;
    }
    c.innerHTML = list.map(function (p) {
      return '<div class="project-item"><div><strong>' + esc(p.name) + "</strong></div>" +
        '<button onclick="removeProject(' + p.id + ')">Remove</button></div>';
    }).join("");
  };
  window.removeProject = function (id) {
    window.customProjects = (window.customProjects || []).filter(function (p) { return p.id !== id; });
    displayCustomProjects();
  };
})();
