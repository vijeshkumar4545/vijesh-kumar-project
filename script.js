(function () {
  "use strict";

  /* ===================== DATA SCIENCE NOTES ===================== */
  var DEFAULT_NOTES = [
    {
      id: 1,
      title: "Python for Data Science",
      topic: "Basics + Pandas + NumPy",
      date: "2025",
      file: "notes/python_for_data_science.html",
      desc: "Complete notes on Python fundamentals for Data Science"
    },
    {
      id: 2,
      title: "Machine Learning Algorithms",
      topic: "Supervised + Unsupervised",
      date: "2025",
      file: "notes/ml_algorithms.html",
      desc: "Regression, Classification, Clustering detailed notes"
    },
    {
      id: 3,
      title: "Deep Learning with CNN",
      topic: "Computer Vision",
      date: "2025",
      file: "notes/deep_learning_cnn.html",
      desc: "CNN architecture, Transfer Learning, OpenCV"
    },
    {
      id: 4,
      title: "Data Visualization",
      topic: "Matplotlib + Seaborn",
      date: "2025",
      file: "notes/data_visualization.html",
      desc: "Beautiful plots and storytelling with data"
    }
  ];

  /* ===================== CERTIFICATES ===================== */
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

  // ========== TYPEWRITER ==========
  (function () {
    var el = document.getElementById("heroName");
    if (!el) return;
    var text = "Vijesh Kumar", i = 0, isDeleting = false;
    function tick() {
      if (!isDeleting) {
        el.textContent = text.substring(0, i + 1);
        i++;
        if (i === text.length) { isDeleting = true; setTimeout(tick, 1800); return; }
      } else {
        el.textContent = text.substring(0, i - 1);
        i--;
        if (i === 0) { isDeleting = false; setTimeout(tick, 600); return; }
      }
      setTimeout(tick, isDeleting ? 70 : 120);
    }
    tick();
  })();

  // ========== SKILLS ORBIT ==========
  (function () {
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
      container.appendChild(el);
    });

    var logoEls = container.querySelectorAll(".orbit-logo");
    var centerX = 0, centerY = 0, angles = [], radii = [], speeds = [];

    logoEls.forEach(function (el, i) {
      var orbit = i % 4;
      radii.push(110 + orbit * 55 + (Math.random() * 25 - 12));
      angles.push((i / logoEls.length) * Math.PI * 2 + Math.random() * 0.4);
      speeds.push(0.0018 + Math.random() * 0.0022 + orbit * 0.0004);
    });

    function resize() {
      var r = container.getBoundingClientRect();
      centerX = r.width / 2;
      centerY = r.height / 2;
    }
    resize();
    window.addEventListener("resize", resize);

    function animate() {
      logoEls.forEach(function (el, i) {
        angles[i] += speeds[i];
        var x = centerX + Math.cos(angles[i]) * radii[i];
        var y = centerY + Math.sin(angles[i]) * radii[i];
        el.style.transform = "translate(" + (x - 28) + "px," + (y - 28) + "px)";
      });
      requestAnimationFrame(animate);
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(animate);
    }
  })();

  // ========== NOTES (Strict View Only) ==========
  function renderNotes() {
    var grid = document.getElementById("notesGrid");
    if (!grid) return;
    if (!DEFAULT_NOTES.length) {
      grid.innerHTML = '<p style="color:var(--muted);text-align:center;">No notes added yet.</p>';
      return;
    }
    grid.innerHTML = DEFAULT_NOTES.map(function (n, i) {
      return (
        '<div class="note-card float-card" data-id="' + n.id + '" style="animation-delay:' + (i * 0.12) + 's">' +
          '<div class="note-icon">📓</div>' +
          '<h3>' + n.title + '</h3>' +
          '<p class="note-topic">' + n.topic + '</p>' +
          '<p class="note-desc">' + (n.desc || "") + '</p>' +
          '<div class="note-footer">' +
            '<span class="note-date">' + (n.date || "") + '</span>' +
            '<span class="view-hint">Click to view →</span>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    grid.querySelectorAll(".note-card").forEach(function (card) {
      card.addEventListener("click", function () {
        var id = Number(card.getAttribute("data-id"));
        var note = DEFAULT_NOTES.find(function (x) { return x.id === id; });
        if (note) openNotesViewer(note);
      });
    });
  }

  function openNotesViewer(note) {
    document.getElementById("notesViewerTitle").textContent = note.title;
    document.getElementById("notesViewerMeta").textContent =
      (note.topic || "") + " · " + (note.date || "") + " · View only · Download disabled";

    var body = document.getElementById("notesViewerBody");
    body.innerHTML = "";

    var protect = document.createElement("div");
    protect.className = "notes-protect-layer";
    protect.innerHTML = '<div class="notes-watermark">VIEW ONLY</div>';

    var iframe = document.createElement("iframe");
    iframe.src = note.file;
    iframe.className = "notes-iframe";
    iframe.setAttribute("sandbox", "allow-same-origin allow-scripts");
    iframe.setAttribute("loading", "lazy");

    body.appendChild(iframe);
    body.appendChild(protect);

    iframe.onload = function () {
      try {
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.addEventListener("contextmenu", function (e) { e.preventDefault(); });
        doc.addEventListener("selectstart", function (e) { e.preventDefault(); });
        doc.body.style.userSelect = "none";
        doc.body.style.webkitUserSelect = "none";
      } catch (e) {}
    };

    openModal("notesViewerModal");
  }

  // Extra keyboard protection
  (function () {
    var modal = document.getElementById("notesViewerModal");
    if (!modal) return;
    modal.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    modal.addEventListener("keydown", function (e) {
      if (e.ctrlKey && ["s", "p", "c", "a", "u"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.key === "F12") e.preventDefault();
    });
  })();

  renderNotes();

  // ========== SCROLL REVEAL ==========
  var revealEls = document.querySelectorAll("section, .project-card, .note-card");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // ========== NAV ==========
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

  // ========== ADMIN + CERTIFICATES ==========
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

  function openModal(id) {
    var m = document.getElementById(id);
    if (m) { m.classList.add("open"); m.style.display = "flex"; }
  }
  function closeModal(id) {
    var m = document.getElementById(id);
    if (m) { m.classList.remove("open"); m.style.display = "none"; }
  }

  document.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      closeModal(btn.getAttribute("data-close"));
    });
  });
  document.querySelectorAll(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) {
      if (e.target === m) closeModal(m.id);
    });
  });

  var unlockBtn = document.getElementById("adminUnlockBtn");
  if (unlockBtn) {
    unlockBtn.addEventListener("click", function () {
      if (isAdmin()) {
        setAdmin(false);
        unlockBtn.textContent = "Admin unlock";
        alert("Admin locked.");
      } else openModal("adminModal");
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
      } else alert("Wrong password.");
    });
  }

  // Certificates
  var localCerts = [];
  var rots = [-2.5, 1.8, -1.2, 2.2, -3, 1, -1.8, 2.8];
  function loadLocal() {
    try { localCerts = JSON.parse(localStorage.getItem(CERT_KEY) || "[]"); }
    catch (e) { localCerts = []; }
  }
  function saveLocal() {
    try { localStorage.setItem(CERT_KEY, JSON.stringify(localCerts)); }
    catch (e) { alert("Storage full"); throw e; }
  }
  function allCerts() { return DEFAULT_CERTS.concat(localCerts); }
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
      g.innerHTML = '<p class="board-empty">No certificates yet.</p>';
      return;
    }
    g.innerHTML = list.map(function (c, i) {
      var isLocal = localCerts.some(function (x) { return x.id === c.id; });
      return (
        '<div class="cert-note" style="--rot:' + rots[i % rots.length] + 'deg" data-id="' + c.id + '">' +
          '<span class="pin"></span><span class="tape"></span>' +
          (isLocal ? '<button type="button" class="remove-cert admin-only" data-remove="' + c.id + '">✕</button>' : "") +
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
        var c = allCerts().find(function (x) { return x.id === id; });
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
      img.alt = c.title;
      img.draggable = false;
      body.appendChild(img);
    }
    openModal("viewerModal");
  }

  loadLocal();
  renderCerts();

  // Upload
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
      alert("Please choose an image file");
      return;
    }
    var reader = new FileReader();
    reader.onload = function (ev) {
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(img.width, img.height));
        var canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        var quality = 0.82;
        var dataUrl = canvas.toDataURL("image/jpeg", quality);
        while (dataUrl.length > MAX_DATA_MB * 1024 * 1024 && quality > 0.45) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        cb(dataUrl, file.name);
      };
      img.src = ev.target.result;
    };
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
  }

  var openCertBtn = document.getElementById("openCertModal");
  if (openCertBtn) {
    openCertBtn.addEventListener("click", function () {
      if (!isAdmin()) { openModal("adminModal"); return; }
      resetUpload();
      openModal("addCertModal");
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
      if (!title || !org || !pendingDataUrl) {
        alert("Fill all fields + image");
        return;
      }
      localCerts.push({
        id: Date.now(),
        title: title,
        org: org,
        date: date,
        image: pendingDataUrl
      });
      try { saveLocal(); } catch (err) { localCerts.pop(); return; }
      renderCerts();
      certForm.reset();
      resetUpload();
      closeModal("addCertModal");
      alert("Pinned on this PC only.\nFor permanent: put image in certificates/ folder + add to DEFAULT_CERTS");
    });
  }
})();
