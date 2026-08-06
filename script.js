/* Portfolio interactions – pure vanilla JS */

(function () {
    "use strict";

    // ---------- Sticky header shadow ----------
    const header = document.querySelector("header");
    if (header) {
        const onScroll = () => {
            header.classList.toggle("scrolled", window.scrollY > 20);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    // ---------- Scroll-triggered reveal ----------
    const revealEls = document.querySelectorAll(
        "section, .skill-card, .project-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // staggered delay for grid items
                        const parent = entry.target.parentElement;
                        if (
                            parent &&
                            (parent.classList.contains("skills-grid") ||
                                parent.classList.contains("projects-grid"))
                        ) {
                            const siblings = Array.from(parent.children);
                            const idx = siblings.indexOf(entry.target);
                            entry.target.style.transitionDelay = `${idx * 0.08}s`;
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
        // fallback – show everything
        revealEls.forEach((el) => el.classList.add("visible"));
    }

    // ---------- Active nav link on scroll ----------
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

    if (sections.length && navLinks.length) {
        const setActive = () => {
            let current = "";
            sections.forEach((sec) => {
                const top = sec.offsetTop - 120;
                if (window.scrollY >= top) {
                    current = sec.getAttribute("id");
                }
            });
            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${current}`
                );
            });
        };
        window.addEventListener("scroll", setActive, { passive: true });
        setActive();
    }

    // ---------- Smooth internal links (extra polish for older browsers) ----------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const id = anchor.getAttribute("href");
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    const y =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        80;
                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            }
        });
    });

    // ---------- Modal (add project) – kept for compatibility ----------
    const modal = document.getElementById("addProjectModal");
    if (modal) {
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                modal.classList.remove("open");
            }
        };
    }

    // expose helpers used by inline onsubmit in index.html
    window.addProject = function (event) {
        event.preventDefault();
        const projectName = document.getElementById("projectName").value;
        const projectDate = document.getElementById("projectDate").value;
        const projectDesc = document.getElementById("projectDesc").value;
        const projectTech = document.getElementById("projectTech").value;
        const projectLink = document.getElementById("projectLink").value;

        if (!window.customProjects) window.customProjects = [];

        const project = {
            id: Date.now(),
            name: projectName,
            date: projectDate,
            desc: projectDesc,
            tech: projectTech.split(",").map((t) => t.trim()),
            link: projectLink,
        };
        window.customProjects.push(project);
        displayCustomProjects();
        document.getElementById("projectForm").reset();
        alert("✅ Project added successfully!");
    };

    window.displayCustomProjects = function () {
        const container = document.getElementById("customProjects");
        if (!container) return;
        const list = window.customProjects || [];
        if (list.length === 0) {
            container.innerHTML =
                '<p style="text-align:center;color:var(--text-muted);">No custom projects added yet</p>';
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
        window.customProjects = (window.customProjects || []).filter(
            (p) => p.id !== id
        );
        displayCustomProjects();
        alert("Project removed!");
    };

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    // ---------- Small cursor glow on project cards (desktop) ----------
    if (window.matchMedia("(pointer: fine)").matches) {
        document.querySelectorAll(".project-card").forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--mx", `${x}px`);
                card.style.setProperty("--my", `${y}px`);
            });
        });
    }
})();
