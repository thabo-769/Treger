import "./style.css";
import { initNav, initReveals, initCounters } from "./ui";
import { initShop, initDivisions } from "./shop";
initNav();
initReveals();
initCounters();
initShop();
initDivisions();
const hero = document.querySelector(".hero-zoom");
requestAnimationFrame(() => requestAnimationFrame(() => hero?.classList.add("loaded")));
const year = document.getElementById("year");
if (year)
    year.textContent = String(new Date().getFullYear());
const storeBtn = document.getElementById("storeBtn");
storeBtn?.addEventListener("click", () => {
    const v = document.getElementById("storeInput")?.value || "Bulawayo";
    const out = document.getElementById("storeOut");
    if (out)
        out.innerHTML = `<p class="text-sm text-neutral-300">Showing Treger outlets near <strong class="text-white">${v}</strong> — Bulawayo HQ (Khami Rd), Harare branch + 300+ partner stores nationwide. <span class="text-treger font-bold">Editable demo data.</span></p>`;
});
