(function () {
  "use strict";

  /* =========================================================
     PUBLIC CERTIFICATES
     ========================================================= */
  var DEFAULT_CERTS = [
    {
      id: 1,
      title: "Supervised Machine Learning: Regression and Classification",
      org: "Coursera/DeepLearning.AI/Stanford",
      date: "28 Dec 2025",
      image: "certificates/supervised_machine_learning.png"
    },
    {
      id: 2,
      title: "Unsupervised Learning, Recommenders,Reinforcement Learning",
      org: "Coursera/DeepLearning.AI/Stanford",
      date: "7 feb 2026",
      image: "certificates/unsupervised.png"
    },
    {
      id: 3,
      title: "Google Cloud Career Launchpad Cybersecurity track",
      org: "Coursera/DeepLearning.AI/Stanford",
      date: "7 jan 2026",
      image: "certificates/cyberSecurity.png"
    },
    {
      id: 4,
      title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      org: "Oracle",
      date: "8 oct 2025",
      image: "certificates/generative_ai_2.png"
    },
    {
      id: 5,
      title: "AI and Innovation: How MongoDB Enables a Resilient AI Strategy",
      org: "Coursera/DeepLearning.AI/Stanford",
      date: "6 Aug 2026",
      image: "certificates/mongoDB.png"
    }
  ];

  var ADMIN_PASSWORD = "vijesh10101010";
  var CERT_KEY = "vk_certs_board_v2";
  var ADMIN_KEY = "vk_admin_unlocked";
  var MAX_IMAGE_SIDE = 1400;
  var MAX_DATA_MB = 1.8;

  // ----- Typewriter for "Vijesh Kumar" -----
  (function typewriterLoop() {
    var el = document.getElementById("heroName");
    if (!el) return;
    var text = "Vijesh Kumar";
    var i = 0;
    var isDeleting = false;
    var speed = 120;

    function tick() {
      if (!isDeleting) {
        el.textContent = text.substring(0, i + 1);
        i++;
        if (i === text.length) {
          isDeleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        el.textContent = text.substring(0, i - 1);
        i--;
        if (i === 0) {
          isDeleting = false;
          setTimeout(tick, 600);
          return;
        }
      }
      setTimeout(tick, isDeleting ? 70 : speed);
    }
    tick();
  })();

// ----- Skills Orbit (3D Spherical style) -----
(function initSkillsOrbit() {
  var container = document.getElementById("skillsOrbit");
  if (!container) return;

  var logos = [
    { icon: "devicon-unity-original", label: "Unity" },
    { icon: "devicon-csharp-plain", label: "C#" },
    { icon: "devicon-android-plain", label: "Android" },
    { icon: "devicon-python-plain", label: "Python" },
    { icon: "devicon-javascript-plain", label: "JavaScript" },
    { icon: "devicon-html5-plain", label: "HTML5" },
    { icon: "devicon-css3-plain", label: "CSS3" },
    { icon: "devicon-react-original", label: "React" },
    { icon: "devicon-git-plain", label: "Git" },
    { icon: "devicon-github-original", label: "GitHub" },
    { icon: "devicon-firebase-plain", label: "Firebase" },
    { icon: "devicon-mysql-plain", label: "MySQL" },
    { icon: "devicon-java-plain", label: "Java" },
    { icon: "devicon-kotlin-plain", label: "Kotlin" },
    { icon: "devicon-bootstrap-plain", label: "Bootstrap" },
    { icon: "devicon-vscode-plain", label: "VS Code" },
    { icon: "devicon-figma-plain", label: "Figma" },
    { icon: "devicon-docker-plain", label: "Docker" },
    { icon: "devicon-numpy-original", label: "NumPy" },
    { icon: "devicon-pandas-original", label: "Pandas" },
    { icon: "devicon-opencv-plain", label: "OpenCV" },
    { icon: "devicon-tensorflow-original", label: "TensorFlow" },
    { icon: "devicon-nodejs-plain", label: "Node.js" },
    { icon: "devicon-typescript-plain", label: "TypeScript" }
  ];

  logos.forEach(function (item) {
    var el = document.createElement("div");
    el.className = "orbit-logo";
    el.innerHTML = '<i class="' + item.icon + ' colored"></i><span class="logo-label">' + item.label + '</span>';
    el.title = item.label;
    container.appendChild(el);
  });

  var logoEls = Array.from(container.querySelectorAll(".orbit-logo"));
  var angles = [];
  var radii = [];
  var speeds = [];
  var centerX = 0, centerY = 0;
  var baseRadius = 180;

  // Initialize
  logoEls.forEach(function (el, i) {
    var ring = i % 3; // 3 rings for better sphere feel
    radii.push(baseRadius * (0.65 + ring * 0.22) + (Math.random() * 18 - 9));
    angles.push((i / logoEls.length) * Math.PI * 2 + Math.random() * 0.5);
    speeds.push(0.004 + Math.random() * 0.003 + ring * 0.001);
  });

  function resize() {
    var rect = container.getBoundingClientRect();
    centerX = rect.width / 2;
    centerY = rect.height / 2;

    // Responsive radius
    if (window.innerWidth < 640) {
      baseRadius = Math.min(rect.width, rect.height) * 0.32;
    } else {
      baseRadius = Math.min(rect.width, rect.height) * 0.38;
    }

    // Update radii based on new base
    logoEls.forEach(function (el, i) {
      var ring = i % 3;
      radii[i] = baseRadius * (0.65 + ring * 0.22) + (Math.random() * 12 - 6);
    });
  }
  resize();
  window.addEventListener("resize", resize);

  function animate() {
    logoEls.forEach(function (el, i) {
      angles[i] += speeds[i];

      // Spherical projection
      var x = Math.cos(angles[i]) * radii[i];
      var y = Math.sin(angles[i]) * radii[i] * 0.72; // slightly flattened for nicer look

      // Depth (z) based on angle → front/back
      var depth = Math.sin(angles[i]); // -1 (back) to +1 (front)

      // Scale: back = small, front = large
      var scale = 0.55 + (depth + 1) * 0.35; // range ~0.55 → 1.25

      // Opacity: back = dim, front = bright
      var opacity = 0.25 + (depth + 1) * 0.4; // range ~0.25 → 1.05 (clamped later)

      // z-index so front icons appear on top
      var zIndex = Math.floor((depth + 1) * 50);

      el.style.transform = 
        "translate(" + (centerX + x - 28) + "px, " + (centerY + y - 28) + "px) scale(" + scale + ")";
      el.style.opacity = Math.max(0.22, Math.min(1, opacity));
      el.style.zIndex = zIndex;
    });
    requestAnimationFrame(animate);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    requestAnimationFrame(animate);
  } else {
    // Static fallback
    logoEls.forEach(function (el, i) {
      var x = Math.cos(angles[i]) * radii[i];
      var y = Math.sin(angles[i]) * radii[i] * 0.72;
      var depth = Math.sin(angles[i]);
      var scale = 0.55 + (depth + 1) * 0.35;
      el.style.transform = "translate(" + (centerX + x - 28) + "px, " + (centerY + y - 28) + "px) scale(" + scale + ")";
      el.style.opacity = 0.25 + (depth + 1) * 0.4;
    });
  }
})();
  

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

  // ----- File upload -----
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
      g.innerHTML = '<p class="board-empty">No certificates yet. Add them in script.js → DEFAULT_CERTS.</p>';
      return;
    }
    g.innerHTML = list.map(function (c, i) {
      var isLocal = localCerts.some(function (x) { return x.id === c.id; });
      return (
        '<div class="cert-note" style="--rot:' + rots[i % rots.length] + 'deg" data-id="' + c.id + '" data-local="' + (isLocal ? "1" : "0") + '">' +
          '<span class="pin"></span><span class="tape"></span>' +
          (isLocal ? '<button type="button" class="remove-cert admin-only" data-remove="' + c.id + '" title="Delete">✕</button>' : "") +
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
      alert("Pinned on THIS computer only.\n\nTo make permanent: save image in certificates/ folder + add to DEFAULT_CERTS in script.js");
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
