(function () {
  "use strict";

  // =====================================================================
  // DEFAULT_CERTS — this is the PERMANENT, SHARED certificate list.
  // Everyone who visits the site sees exactly what's in this array,
  // because it ships as part of the code (not saved in a visitor's browser).
  //
  // HOW TO ADD A CERTIFICATE PERMANENTLY (manual / code way):
  //   1. Use the "+ Pin Certificate" admin form as normal (it will still
  //      preview locally in YOUR browser only).
  //   2. After pinning, a "Copy code" box will pop up with a ready-made
  //      object like the example below.
  //   3. Paste that object into this DEFAULT_CERTS array (below), then
  //      save script.js and re-upload/push the site.
  //   4. Now it's part of the code itself, so it shows for every visitor.
  //
  // Example entry:
  // {
  //   id: 1710000000000,
  //   title: "Unity Fundamentals",
  //   org: "Coursera",
  //   date: "March 2024",
  //   image: "data:image/jpeg;base64,....."   // or a normal image URL
  // }
  // =====================================================================
  var DEFAULT_CERTS = [
    {
    id: 1,
    title: "Supervised Machine Learning: Regression and
Classification",
    org: "DeepLearning.AI/ Coursera",
    date: "28 Dec 2025",
    image: "https://example.com/certificate.jpg"
  }
    // 👉 paste new certificate objects here, separated by commas
  ];

  var CERT_KEY = "vk_certs_board_v2";
  var ADMIN_KEY = "vk_admin_unlocked";
  var MAX_IMAGE_SIDE = 1400; // resize large photos before save
  var MAX_DATA_MB = 1.8;
  // ----- Scroll reveal -----
  var revealEls = document.querySelectorAll("section, .project-card");
  var PVijesh = "vijesh10101010";
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
          window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
        }
      }
    });
  });
  // ----- Skills marquee L→R -----
  var track = document.getElementById("skillsTrack");
  var marquee = document.getElementById("skillsMarquee");
  if (track && marquee) {
    var offset = 0, speed = 0.5, paused = false, dragging = false, startX = 0, startOff = 0, halfW = 0;
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
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(tick);
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
    if (params.get("admin") === PVijesh) setAdmin(true);
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
      if (document.getElementById("adminPass").value === PVijesh) {
        setAdmin(true);
        closeModal("adminModal");
        if (unlockBtn) unlockBtn.textContent = "Lock admin";
        alert("Admin unlocked. You can pin & delete certificates.");
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
  // ----- File upload (one click, no URL) -----
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
        // shrink quality if still huge
        while (dataUrl.length > MAX_DATA_MB * 1024 * 1024 && quality > 0.45) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        if (dataUrl.length > MAX_DATA_MB * 1024 * 1024 * 1.2) {
          alert("Image is still too large after compress. Try a smaller photo.");
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
    // drag & drop
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
  // ----- Certificates store -----
  // certs = DEFAULT_CERTS (shared, permanent, ships with the code)
  //         + anything pinned locally in THIS browser (preview only,
  //         marked with local:true, and NOT visible to other visitors
  //         until you copy its code into DEFAULT_CERTS above).
  var certs = [];
  var rots = [-2.5, 1.8, -1.2, 2.2, -3, 1, -1.8, 2.8];
  function loadLocalCerts() {
    try { return JSON.parse(localStorage.getItem(CERT_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function loadCerts() {
    var local = loadLocalCerts().map(function (c) {
      c.local = true;
      return c;
    });
    // avoid duplicate ids if a local one was later baked into DEFAULT_CERTS
    var defaultIds = DEFAULT_CERTS.map(function (c) { return c.id; });
    local = local.filter(function (c) { return defaultIds.indexOf(c.id) === -1; });
    certs = DEFAULT_CERTS.concat(local);
  }
  function saveLocalCerts(localOnly) {
    try {
      localStorage.setItem(CERT_KEY, JSON.stringify(localOnly));
    } catch (e) {
      alert("Storage full. Delete an old certificate or use a smaller image.");
      throw e;
    }
  }
  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }
  function renderCerts() {
    var g = document.getElementById("certsGrid");
    if (!g) return;
    if (!certs.length) {
      g.innerHTML = '<p class="board-empty">No certificates pinned yet.</p>';
      return;
    }
    g.innerHTML = certs.map(function (c, i) {
      return (
        '<div class="cert-note" style="--rot:' + rots[i % rots.length] + 'deg" data-id="' + c.id + '">' +
          '<span class="pin"></span><span class="tape"></span>' +
          (c.local ? '<span class="local-badge admin-only" title="Only visible in this browser until added to code">LOCAL PREVIEW</span>' : '') +
          '<button type="button" class="remove-cert admin-only" data-remove="' + c.id + '" title="Delete">✕</button>' +
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
        var c = certs.filter(function (x) { return x.id === id; })[0];
        if (c) openViewer(c);
      });
    });
    g.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!isAdmin()) return;
        if (!confirm("Delete this certificate? (Only removes it from your local preview / from DEFAULT_CERTS you'll still need to edit code for permanent ones.)")) return;
        var id = Number(btn.getAttribute("data-remove"));
        var localOnly = loadLocalCerts().filter(function (x) { return x.id !== id; });
        saveLocalCerts(localOnly);
        loadCerts();
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
  loadCerts();
  renderCerts();

  // ----- Code export modal (for making a cert permanent/shared) -----
  function buildCertCode(c) {
    return "{\n" +
      "  id: " + c.id + ",\n" +
      "  title: " + JSON.stringify(c.title) + ",\n" +
      "  org: " + JSON.stringify(c.org) + ",\n" +
      "  date: " + JSON.stringify(c.date || "") + ",\n" +
      "  image: " + JSON.stringify(c.image) + "\n" +
      "},";
  }
  function showExportBox(code) {
    var overlay = document.createElement("div");
    overlay.className = "modal open";
    overlay.style.display = "flex";
    overlay.innerHTML =
      '<div class="modal-content" style="max-width:560px;">' +
        '<div class="modal-header"><h2>Copy code — make it permanent</h2>' +
        '<button class="close-btn" id="exportCloseBtn">×</button></div>' +
        '<p class="form-hint" style="margin-bottom:0.6rem;">Paste this object inside the <code>DEFAULT_CERTS = [ ... ]</code> array near the top of script.js, then save &amp; re-upload the site. It will then show for every visitor, not just this browser.</p>' +
        '<textarea id="exportCodeArea" readonly style="width:100%;min-height:180px;background:#0c0c0e;color:#f2f0eb;border:1px solid #2a2a32;border-radius:8px;padding:0.6rem;font-family:monospace;font-size:0.78rem;"></textarea>' +
        '<button type="button" class="btn btn-primary" id="exportCopyBtn" style="width:100%;margin-top:0.75rem;">Copy code</button>' +
      '</div>';
    document.body.appendChild(overlay);
    var area = overlay.querySelector("#exportCodeArea");
    area.value = code;
    overlay.querySelector("#exportCloseBtn").addEventListener("click", function () {
      document.body.removeChild(overlay);
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) document.body.removeChild(overlay);
    });
    overlay.querySelector("#exportCopyBtn").addEventListener("click", function () {
      area.select();
      area.setSelectionRange(0, 999999);
      try {
        navigator.clipboard.writeText(area.value);
        overlay.querySelector("#exportCopyBtn").textContent = "Copied ✓";
      } catch (e) {
        document.execCommand("copy");
      }
    });
  }

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
      var newCert = {
        id: Date.now(),
        title: title,
        org: org,
        date: date,
        image: pendingDataUrl
      };
      var localOnly = loadLocalCerts();
      localOnly.push(newCert);
      try {
        saveLocalCerts(localOnly);
      } catch (err) {
        return;
      }
      loadCerts();
      renderCerts();
      certForm.reset();
      resetUpload();
      closeModal("addCertModal");
      showExportBox(buildCertCode(newCert));
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
