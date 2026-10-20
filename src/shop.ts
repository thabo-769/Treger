import { PRODUCTS, Product } from "./products";
import { PRODUCTS2, DIVISIONS } from "./more";

export const ALL_PRODUCTS: Product[] = [...PRODUCTS, ...PRODUCTS2];

export function card(p: Product): string {
  return `<article class="p-card group w-[220px] md:w-[250px] shrink-0 snap-start bg-white border border-neutral-200 rounded-xl overflow-hidden cursor-pointer" data-prod-id="${p.id}">
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

export function openProductModal(productId: string) {
  const p = ALL_PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("pModalImg") as HTMLImageElement | null;
  const modalName = document.getElementById("pModalName");
  const modalDiv = document.getElementById("pModalDivision");
  const modalCat = document.getElementById("pModalCategory");
  const modalSpec = document.getElementById("pModalSpec");
  const modalDesc = document.getElementById("pModalDesc");
  const modalTags = document.getElementById("pModalTags");
  const quoteBtn = document.getElementById("pModalQuoteBtn");

  if (modalImg) modalImg.src = p.img;
  if (modalName) modalName.textContent = p.name;
  if (modalDiv) modalDiv.textContent = `${p.division.toUpperCase()} DIVISION`;
  if (modalCat) modalCat.textContent = p.category;
  if (modalSpec) modalSpec.textContent = p.spec;
  if (modalDesc) {
    modalDesc.textContent = `Manufactured in Bulawayo to rigorous quality standards. Engineered for homes, commercial contractors, and agricultural projects across Zimbabwe. Full SABS/ISO compliance with nationwide warranty.`;
  }
  if (modalTags) {
    modalTags.innerHTML = p.tags.map(t => `<span class="px-2.5 py-1 bg-neutral-100 rounded-full text-[11px] font-semibold text-neutral-600">${t}</span>`).join("");
  }
  if (quoteBtn) {
    quoteBtn.onclick = () => {
      modal?.classList.remove("open");
      (window as any).openQuoteModalWithProduct?.(p.name, p.division);
    };
  }

  modal?.classList.add("open");
}

let currentFilter = "All";

export function setCategoryFilter(f: string) {
  currentFilter = f;
  const pills = document.getElementById("pills");
  pills?.querySelectorAll("button").forEach(b => {
    b.classList.toggle("active", b.dataset.f === f);
  });
  const finderEl = document.getElementById("finder");
  if (finderEl) {
    finderEl.scrollIntoView({ behavior: "smooth" });
  }
  triggerRender();
}

let triggerRender = () => {};

export function initShop() {
  const feat = document.getElementById("featRow");
  if (feat) {
    feat.innerHTML = ALL_PRODUCTS.slice(0, 12).map(card).join("");
    feat.querySelectorAll("[data-prod-id]").forEach(el => {
      el.addEventListener("click", () => {
        const id = (el as HTMLElement).dataset.prodId;
        if (id) openProductModal(id);
      });
    });
  }

  const grid = document.getElementById("productGrid");
  const pills = document.getElementById("pills");
  const search = document.getElementById("search") as HTMLInputElement | null;
  const count = document.getElementById("resultCount");

  const render = () => {
    if (!grid) return;
    grid.classList.add("switching");
    setTimeout(() => {
      const q = (search?.value || "").toLowerCase();
      const list = ALL_PRODUCTS.filter(p => {
        const matchesFilter = (currentFilter === "All" || p.tags.includes(currentFilter) || p.division.toLowerCase().includes(currentFilter.toLowerCase()) || p.category.toLowerCase().includes(currentFilter.toLowerCase()));
        const matchesQuery = (!q || (p.name + p.division + p.category + p.spec).toLowerCase().includes(q));
        return matchesFilter && matchesQuery;
      });

      grid.innerHTML = list.map(card).join("") || `<div class="col-span-full text-center py-12"><p class="text-sm font-semibold text-neutral-500">No products match your criteria.</p><button onclick="window.resetProductSearch()" class="mt-3 px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-bold">Clear Filters</button></div>`;
      
      grid.querySelectorAll("[data-prod-id]").forEach(el => {
        el.addEventListener("click", () => {
          const id = (el as HTMLElement).dataset.prodId;
          if (id) openProductModal(id);
        });
      });

      if (count) count.textContent = `Showing ${list.length} of ${ALL_PRODUCTS.length} quality products`;
      grid.classList.remove("switching");
    }, 180);
  };

  triggerRender = render;

  (window as any).resetProductSearch = () => {
    currentFilter = "All";
    if (search) search.value = "";
    pills?.querySelectorAll("button").forEach(x => x.classList.toggle("active", x.dataset.f === "All"));
    render();
  };

  pills?.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    pills.querySelectorAll("button").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    currentFilter = b.dataset.f || "All";
    render();
  }));

  search?.addEventListener("input", render);
  render();

  // Horizontal rails
  const rail = (id: string, prev: string, next: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    document.getElementById(prev)?.addEventListener("click", () => el.scrollBy({ left: -480, behavior: "smooth" }));
    document.getElementById(next)?.addEventListener("click", () => el.scrollBy({ left: 480, behavior: "smooth" }));
  };
  rail("featRow", "featPrev", "featNext");
  rail("ecoRow", "ecoPrev", "ecoNext");

  // Ecosystem clicks connect directly to finder filters
  document.querySelectorAll(".eco-panel").forEach(panel => {
    panel.addEventListener("click", () => {
      const heading = panel.querySelector("h3")?.textContent?.trim();
      if (heading) {
        setCategoryFilter(heading.charAt(0) + heading.slice(1).toLowerCase());
      }
    });
  });
}

let activeDivisionIndex = 0;

export function initDivisions() {
  const btns = document.getElementById("divBtns");
  const img = document.getElementById("divImg") as HTMLImageElement | null;
  const tag = document.getElementById("divTag");
  const name = document.getElementById("divName");
  const desc = document.getElementById("divDesc");
  const pts = document.getElementById("divPts");
  const exploreBtn = document.querySelector('a[href="#finder"][class*="EXPLORE DIVISION"]');

  if (!btns) return;
  btns.innerHTML = DIVISIONS.map((d, i) =>
    `<button data-i="${i}" class="div-btn w-full text-left px-4 py-3 rounded-r-lg flex items-center gap-3 ${i===0?"active bg-white text-black":"text-neutral-400"}">
      <span class="div-dot w-2 h-2 rounded-full bg-neutral-700"></span>
      <span class="font-display font-extrabold text-sm tracking-wide">${d.name}</span></button>`).join("");

  const show = (i: number) => {
    activeDivisionIndex = i;
    const d = DIVISIONS[i];
    btns.querySelectorAll("button").forEach((b, j) => {
      b.classList.toggle("active", j === i);
      b.classList.toggle("bg-white", j === i);
      b.classList.toggle("text-black", j === i);
      b.classList.toggle("text-neutral-400", j !== i);
    });
    if (img) {
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = d.img;
        img.onload = () => (img.style.opacity = "1");
      }, 160);
    }
    if (tag) tag.textContent = d.tag;
    if (name) name.textContent = d.name;
    if (desc) desc.textContent = d.desc;
    if (pts) pts.innerHTML = d.points.map(p => `<li class="flex items-center gap-2 text-sm text-neutral-300"><span class="w-1.5 h-1.5 bg-treger rounded-full"></span>${p}</li>`).join("");
  };

  btns.querySelectorAll("button").forEach(b => b.addEventListener("click", () => show(Number(b.dataset.i))));
  show(0);

  // Hook up Explore Division button to filter by that division in finder
  exploreBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const div = DIVISIONS[activeDivisionIndex];
    if (div) {
      // Find matching filter tag or search
      const tagMatch = div.points[0] || div.name;
      setCategoryFilter(div.name.split(" ")[0]);
    }
  });
}
