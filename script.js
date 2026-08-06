(function () {
    "use strict";

    // Sticky header
    const header = document.querySelector("header");
    if (header) {
        const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    // Scroll reveal
    const revealEls = document.querySelectorAll("section, .project-card, .cert-card");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const parent = entry.target.parentElement;
                        if (parent && (parent.classList.contains("projects-grid") || parent.classList.contains("certs-grid"))) {
                            const siblings = Array.from(parent.children).filter(c => c.classList.contains("project-card") || c.classList.contains("cert-card"));
                            const idx = siblings.indexOf(entry.target);
                            if (idx >= 0) entry.target.style.transitionDelay = `${idx * 0.08}s`;
                        }
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("visible"));
    }

    // Active nav
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
    if (sections.length && navLinks.length) {
        const setActive = () => {
            let current = "";
            sections.forEach((sec) => {
                if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute("id");
            });
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
            });
        };
        window.addEventListener("scroll", setActive, { passive: true });
        setActive();
    }

    // Smooth anchors
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const id = anchor.getAttribute("href");
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            }
        });
    });

    // ========== Skills marquee: continuous left → right ==========
    const track = document.getElementById("skillsTrack");
    const marquee = document.querySelector(".skills-marquee");

    if (track && marquee) {
        let offset = 0;
        let speed = 0.9;
        let direction = 1; // left → right
        let paused = false;
        let isDragging = false;
        let startX = 0;
        let startOffset = 0;
        let halfWidth = 0;

        function measure() {
            const cards = track.querySelectorAll(".skill-card");
            const half = Math.floor(cards.length / 2);
            if (half < 1) return;
            const first = cards[0].getBoundingClientRect();
            const mid = cards[half].getBoundingClientRect();
            halfWidth = mid.left - first.left;
            if (Math.abs(offset) < 1) offset = -halfWidth * 0.12;
        }

        measure();
        window.addEventListener("resize", measure);

        function tick() {
            if (!paused && !isDragging && halfWidth > 0) {
                offset += speed * direction;
                if (direction === 1 && offset >= 0) offset -= halfWidth;
                else if (direction === -1 && offset <= -halfWidth) offset += halfWidth;
            }
            track.style.transform = `translateX(${offset}px)`;
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        marquee.addEventListener("mouseenter", () => { paused = true; });
        marquee.addEventListener("mouseleave", () => { if (!isDragging) paused = false; });

        function onPointerDown(e) {
            isDragging = true;
            paused = true;
            startX = e.clientX || (e.touches && e.touches[0].clientX);
            startOffset = offset;
            marquee.style.cursor = "grabbing";
        }
        function onPointerMove(e) {
            if (!isDragging) return;
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            offset = startOffset + (x - startX);
            while (offset > 0) offset -= halfWidth;
            while (offset < -halfWidth) offset += halfWidth;
        }
        function onPointerUp() {
            if (!isDragging) return;
            isDragging = false;
            paused = false;
            marquee.style.cursor = "grab";
        }

        marquee.addEventListener("mousedown", onPointerDown);
        window.addEventListener("mousemove", onPointerMove);
        window.addEventListener("mouseup", onPointerUp);
        marquee.addEventListener("touchstart", onPointerDown, { passive: true });
        window.addEventListener("touchmove", onPointerMove, { passive: true });
        window.addEventListener("touchend", onPointerUp);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            paused = true;
            track.style.transform = "translateX(0)";
        }
    }

    // Project card 3D tilt
    if (window.matchMedia("(pointer: fine)").matches) {
        document.querySelectorAll(".project-card").forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
            });
            card.addEventListener("mouseleave", () => { card.style.transform = ""; });
        });
    }

    // ========== Certificates (localStorage) ==========
    const CERT_KEY = "vk_certificates";
    let certificates = [];

    function loadCerts() {
        try {
            certificates = JSON.parse(localStorage.getItem(CERT_KEY) || "[]");
        } catch {
            certificates = [];
        }
    }

    function saveCerts() {
        localStorage.setItem(CERT_KEY, JSON.stringify(certificates));
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str || "";
        return div.innerHTML;
    }

    function renderCerts() {
        const grid = document.getElementById("certsGrid");
        if (!grid) return;

        if (certificates.length === 0) {
            grid.innerHTML = '<p class="certs-empty">No certificates yet. Click “Add Certificate” to add one.</p>';
            return;
        }

        grid.innerHTML = certificates
            .map(
                (c) => `
            <div class="cert-card visible">
                <button type="button" class="remove-cert" data-id="${c.id}" title="Remove">×</button>
                <div class="cert-icon">🏆</div>
                <h3>${escapeHtml(c.title)}</h3>
                <p class="cert-org">${escapeHtml(c.org)}</p>
                <p class="cert-date">${escapeHtml(c.date || "")}</p>
                ${c.link ? `<a class="cert-link" href="${escapeHtml(c.link)}" target="_blank" rel="noopener">View certificate →</a>` : ""}
            </div>`
            )
            .join("");

        grid.querySelectorAll(".remove-cert").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = Number(btn.getAttribute("data-id"));
                certificates = certificates.filter((c) => c.id !== id);
                saveCerts();
                renderCerts();
            });
        });
    }

    loadCerts();
    renderCerts();

    const certModal = document.getElementById("addCertModal");
    const openCertBtn = document.getElementById("openCertModal");
    const closeCertBtn = document.getElementById("closeCertModal");
    const certForm = document.getElementById("certForm");

    if (openCertBtn && certModal) {
        openCertBtn.addEventListener("click", () => {
            certModal.classList.add("open");
            certModal.style.display = "flex";
        });
    }
    if (closeCertBtn && certModal) {
        closeCertBtn.addEventListener("click", () => {
            certModal.classList.remove("open");
            certModal.style.display = "none";
        });
    }
    if (certModal) {
        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) {
                certModal.classList.remove("open");
                certModal.style.display = "none";
            }
        });
    }
    if (certForm) {
        certForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("certTitle").value.trim();
            const org = document.getElementById("certOrg").value.trim();
            const date = document.getElementById("certDate").value.trim();
            const link = document.getElementById("certLink").value.trim();
            if (!title || !org) return;

            certificates.push({
                id: Date.now(),
                title,
                org,
                date,
                link,
            });
            saveCerts();
            renderCerts();
            certForm.reset();
            certModal.classList.remove("open");
            certModal.style.display = "none";
        });
    }

    // Project modal helpers (kept)
    const projectModal = document.getElementById("addProjectModal");
    if (projectModal) {
        window.onclick = function (event) {
            if (event.target === projectModal) {
                projectModal.style.display = "none";
            }
        };
    }

    window.addProject = function (event) {
        event.preventDefault();
        const projectName = document.getElementById("projectName").value;
        const projectDate = document.getElementById("projectDate").value;
        const projectDesc = document.getElementById("projectDesc").value;
        const projectTech = document.getElementById("projectTech").value;
        const projectLink = document.getElementById("projectLink").value;

        if (!window.customProjects) window.customProjects = [];

        window.customProjects.push({
            id: Date.now(),
            name: projectName,
            date: projectDate,
            desc: projectDesc,
            tech: projectTech.split(",").map((t) => t.trim()),
            link: projectLink,
        });
        displayCustomProjects();
        document.getElementById("projectForm").reset();
        alert("✅ Project added successfully!");
    };

    window.displayCustomProjects = function () {
        const container = document.getElementById("customProjects");
        if (!container) return;
        const list = window.customProjects || [];
        if (list.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:var(--text-muted);">No custom projects added yet</p>';
            return;
        }
        container.innerHTML = list
            .map(
                (p) => `
            <div class="project-item">
                <div>
                    <strong>${escapeHtml(p.name)}</strong>
                    <p style="font-size:0.8rem;color:var(--text-dim);margin-top:0.25rem;">${escapeHtml(p.date || "No date")}</p>
                </div>
                <button onclick="removeProject(${p.id})">Remove</button>
            </div>`
            )
            .join("");
    };

    window.removeProject = function (id) {
        window.customProjects = (window.customProjects || []).filter((p) => p.id !== id);
        displayCustomProjects();
        alert("Project removed!");
    };
})();
