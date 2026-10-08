import { PRODUCTS } from "./products";
import { PRODUCTS2, DIVISIONS } from "./more";
const ALL = [...PRODUCTS, ...PRODUCTS2];
export function card(p: (typeof ALL)[number]): string {
  return `<article class="p-card group w-[220px] md:w-[250px] shrink-0 snap-start bg-white border border-neutral-200 rounded-xl overflow-hidden">
    <div class="relative h-[170px] overflow-hidden bg-neutral-100">
      <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
      <span class="absolute top-2 left-2 text-[10px] font-bold tracking-widest bg-black text-white px-2 py-1 rounded">${p.division.toUpperCase()}</span>
    </div>
    <div class="p-3">
      <h3 class="font-display font-800 font-extrabold text-[12px] leading-tight tracking-tight">${p.name}</h3>
      <p class="text-[11px] text-neutral-500 mt-0.5">${p.category} • ${p.spec}</p>
      <span class="inline-flex items-center gap-1 text-[11px] font-bold text-treger mt-2">Explore <span class="p-arrow inline-flex w-5 h-5 rounded-full border border-treger items-center justify-center text-[12px]">→</span></span>
    </div></article>`;
}
export function initShop() {
  const feat = document.getElementById("featRow");
  if (feat) feat.innerHTML = ALL.slice(0, 12).map(card).join("");
  const grid = document.getElementById("productGrid");
  const pills = document.getElementById("pills");
  const search = document.getElementById("search") as HTMLInputElement | null;
  const count = document.getElementById("resultCount");
  let filter = "All";
  const render = () => {
    if (!grid) return;
    grid.classList.add("switching");
    setTimeout(() => {
      const q = (search?.value || "").toLowerCase();
      const list = ALL.filter(p => (filter === "All" || p.tags.includes(filter)) && (!q || (p.name + p.division + p.category).toLowerCase().includes(q)));
      grid.innerHTML = list.map(card).join("") || `<p class="text-sm text-neutral-500 py-10">No products found. Try another search.</p>`;
      if (count) count.textContent = `${list.length} products`;
      grid.classList.remove("switching");
    }, 220);
  };
  pills?.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    pills.querySelectorAll("button").forEach(x => x.classList.remove("active"));
    b.classList.add("active"); filter = b.dataset.f || "All"; render();
  }));
  search?.addEventListener("input", render);
  render();
  const rail = (id: string, prev: string, next: string) => {
    const el = document.getElementById(id); if (!el) return;
    document.getElementById(prev)?.addEventListener("click", () => el.scrollBy({ left: -560, behavior: "smooth" }));
    document.getElementById(next)?.addEventListener("click", () => el.scrollBy({ left: 560, behavior: "smooth" }));
  };
  rail("featRow", "featPrev", "featNext");
  rail("ecoRow", "ecoPrev", "ecoNext");
}
export function initDivisions() {
  const btns = document.getElementById("divBtns");
  const img = document.getElementById("divImg") as HTMLImageElement | null;
  const tag = document.getElementById("divTag");
  const name = document.getElementById("divName");
  const desc = document.getElementById("divDesc");
  const pts = document.getElementById("divPts");
  if (!btns) return;
  btns.innerHTML = DIVISIONS.map((d, i) =>
    `<button data-i="${i}" class="div-btn w-full text-left px-4 py-3 rounded-r-lg flex items-center gap-3 ${i===0?"active bg-white text-black":"text-neutral-400"}">
      <span class="div-dot w-2 h-2 rounded-full bg-neutral-700"></span>
      <span class="font-display font-extrabold text-sm tracking-wide">${d.name}</span></button>`).join("");
  const show = (i: number) => {
    const d = DIVISIONS[i];
    btns.querySelectorAll("button").forEach((b, j) => {
      b.classList.toggle("active", j === i);
      b.classList.toggle("bg-white", j === i);
    });
    if (img) { img.style.opacity = "0"; setTimeout(() => { img.src = d.img; img.onload = () => img.style.opacity = "1"; }, 200); }
    if (tag) tag.textContent = d.tag;
    if (name) name.textContent = d.name;
    if (desc) desc.textContent = d.desc;
    if (pts) pts.innerHTML = d.points.map(p => `<li class="flex items-center gap-2 text-sm text-neutral-300"><span class="w-1.5 h-1.5 bg-treger rounded-full"></span>${p}</li>`).join("");
  };
  btns.querySelectorAll("button").forEach(b => b.addEventListener("click", () => show(Number(b.dataset.i))));
  show(0);
}
