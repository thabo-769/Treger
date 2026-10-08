export function initNav() {
    const nav = document.getElementById("nav");
    const burger = document.getElementById("burger");
    const menu = document.getElementById("mobileMenu");
    const bar = document.getElementById("progressBar");
    const onScroll = () => {
        nav.classList.toggle("scrolled", window.scrollY > 40);
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
        const bg = document.getElementById("heroBg");
        if (bg && window.scrollY < innerHeight) {
            bg.style.transform = `translateY(${window.scrollY * 0.25}px) scale(${1 + window.scrollY / 4000})`;
        }
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    burger.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        burger.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        menu.classList.remove("open");
        document.body.style.overflow = "";
    }));
    document.querySelectorAll(".magnetic").forEach(el => {
        const e = el;
        e.addEventListener("mousemove", (ev) => {
            const r = e.getBoundingClientRect();
            e.style.transform = `translate(${(ev.clientX - r.left - r.width / 2) * 0.15}px,${(ev.clientY - r.top - r.height / 2) * 0.2}px)`;
        });
        e.addEventListener("mouseleave", () => e.style.transform = "");
    });
    const dot = document.getElementById("cursorDot");
    if (dot && matchMedia("(pointer:fine)").matches) {
        addEventListener("mousemove", (ev) => {
            dot.style.left = ev.clientX + "px";
            dot.style.top = ev.clientY + "px";
        });
    }
}
export function initReveals() {
    const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
        }
    }), { threshold: 0.15 });
    document.querySelectorAll(".reveal,.reveal-img,.grow-line,.timeline-line").forEach(el => io.observe(el));
}
export function initCounters() {
    const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting)
            return;
        const el = e.target;
        io.unobserve(el);
        const end = Number(el.dataset.count || "0");
        const suf = el.dataset.suffix || "";
        const t0 = performance.now(), dur = 1600;
        const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
            if (p < 1)
                requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }), { threshold: 0.5 });
    document.querySelectorAll("[data-count]").forEach(el => io.observe(el));
}
