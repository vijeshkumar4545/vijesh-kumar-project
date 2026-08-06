(function () {
  "use strict";

  // ===== CONFIG: change your admin password here =====
  var ADMIN_PASSWORD = "vijesh2024";
  var CERT_KEY = "vk_certs_board_v1";
  var ADMIN_KEY = "vk_admin_unlocked";

  // ===== Scroll reveal =====
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

  // ===== Active nav =====
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

  // ===== Skills marquee L→R =====
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

  // ===== Admin unlock =====
  function isAdmin() {
    return sessionStorage.getItem(ADMIN_KEY) === "1";
  }
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

  // Also unlock via ?admin=YOUR_PASSWORD
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
      var pass = document.getElementById("adminPass").value;
      if (pass === ADMIN_PASSWORD) {
        setAdmin(true);
        closeModal("adminModal");
        if (unlockBtn) unlockBtn.textContent = "Lock admin";
        alert("Admin unlocked. You can pin certificates.");
      } else {
        alert("Wrong password.");
      }
    });
  }

  var openCertBtn = document.getElementById("openCertModal");
  if (openCertBtn) {
    openCertBtn.addEventListener("click", function () {
      if (!isAdmin()) {
        openModal("adminModal");
        return;
      }
      openModal("addCertModal");
    });
  }

  // ===== Certificates =====
  var certs = [];
  var rots = [-2.5, 1.8, -1.2, 2.2, -3, 1, -1.8, 2.8];

  function loadCerts() {
    try { certs = JSON.parse(localStorage.getItem(CERT_KEY) || "[]"); }
    catch (e) { certs = []; }
  }
  function saveCerts() {
    localStorage.setItem(CERT_KEY, JSON.stringify(certs));
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
          '<button type="button" class="remove-cert admin-only" data-remove="' + c.id + '">×</button>' +
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
        var id = Number(btn.getAttribute("data-remove"));
        certs = certs.filter(function (x) { return x.id !== id; });
        saveCerts();
        renderCerts();
      });
    });
  }

  function openViewer(c) {
    document.getElementById("viewerTitle").textContent = c.title || "Certificate";
    document.getElementById("viewerMeta").textContent =
      (c.org || "") + (c.date ? " · " + c.date : "") + " · View only";
    var body = document.getElementById("viewerBody");
    body.innerHTML = "";
    if (c.image) {
      var img = document.createElement("img");
      img.src = c.image;
      img.alt = c.title || "Certificate";
      img.draggable = false;
      body.appendChild(img);
    } else {
      body.innerHTML = '<p style="color:#c4b59a;padding:2rem;text-align:center;">No image linked for this certificate.</p>';
    }
    openModal("viewerModal");
  }

  // Discourage download / context menu on viewer
  var viewerBody = document.getElementById("viewerBody");
  if (viewerBody) {
    viewerBody.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  }

  loadCerts();
  renderCerts();

  var certForm = document.getElementById("certForm");
  if (certForm) {
    certForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!isAdmin()) return;
      var title = document.getElementById("certTitle").value.trim();
      var org = document.getElementById("certOrg").value.trim();
      var date = document.getElementById("certDate").value.trim();
      var image = document.getElementById("certImage").value.trim();
      if (!title || !org || !image) return;
      certs.push({ id: Date.now(), title: title, org: org, date: date, image: image });
      saveCerts();
      renderCerts();
      certForm.reset();
      closeModal("addCertModal");
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
