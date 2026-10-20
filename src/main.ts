import "./style.css";
import { initNav, initReveals, initCounters } from "./ui";
import { initShop, initDivisions } from "./shop";

// --- Initialize Foundation Modules ---
initNav();
initReveals();
initCounters();
initShop();
initDivisions();

const hero = document.querySelector(".hero-zoom");
requestAnimationFrame(() => requestAnimationFrame(() => hero?.classList.add("loaded")));

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// --- Site Toast Notification ---
let siteToastTimer = 0;
export function showSiteToast(msg: string) {
  const toast = document.getElementById("siteToast");
  const toastMsg = document.getElementById("siteToastMsg");
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.remove("translate-y-8", "opacity-0", "pointer-events-none");
  window.clearTimeout(siteToastTimer);
  siteToastTimer = window.setTimeout(() => {
    toast.classList.add("translate-y-8", "opacity-0", "pointer-events-none");
  }, 3200);
}

// --- Store & Distribution Outlets Database ---
export interface StoreLocation {
  city: string;
  name: string;
  type: 'Factory Shop / HQ' | 'Regional Hub' | 'Authorized Retail Chain';
  address: string;
  phone: string;
  hours: string;
  mapQuery: string;
}

const STORES: StoreLocation[] = [
  // Bulawayo
  { city: 'Bulawayo', name: 'Treger Khami Road Factory Shop (HQ)', type: 'Factory Shop / HQ', address: 'Khami Road, Bulawayo Industrial Sites', phone: '+263 29 278000', hours: 'Mon - Fri: 08:00 - 17:00 | Sat: 08:00 - 13:00', mapQuery: 'Khami+Road+Bulawayo' },
  { city: 'Bulawayo', name: 'Treger Plumtree Road Depot', type: 'Regional Hub', address: 'Belmont Industrial, Plumtree Rd, Bulawayo', phone: '+263 29 247123', hours: 'Mon - Fri: 08:00 - 17:00', mapQuery: 'Plumtree+Road+Belmont+Bulawayo' },
  { city: 'Bulawayo', name: 'Halsteds Bulawayo Express', type: 'Authorized Retail Chain', address: '112 Fife Street, Bulawayo CBD', phone: '+263 29 261890', hours: 'Mon - Sat: 08:00 - 17:00', mapQuery: 'Halsteds+Fife+Street+Bulawayo' },
  { city: 'Bulawayo', name: 'N. Richards Belmont Wholesale', type: 'Authorized Retail Chain', address: '23 Falcon St, Belmont, Bulawayo', phone: '+263 29 288334', hours: 'Mon - Fri: 08:00 - 16:30', mapQuery: 'N+Richards+Belmont+Bulawayo' },

  // Harare
  { city: 'Harare', name: 'Treger Harare Regional Distribution Hub', type: 'Regional Hub', address: 'Stand 409 Kelvin North Rd, Graniteside, Harare', phone: '+263 24 2754890', hours: 'Mon - Fri: 08:00 - 17:00', mapQuery: 'Kelvin+North+Graniteside+Harare' },
  { city: 'Harare', name: 'Halsteds Msasa Builders Express', type: 'Authorized Retail Chain', address: 'Mutare Road, Msasa Commercial Centre, Harare', phone: '+263 24 2486711', hours: 'Mon - Sat: 07:30 - 17:00', mapQuery: 'Halsteds+Msasa+Harare' },
  { city: 'Harare', name: 'Gain Cash & Carry Chitungwiza', type: 'Authorized Retail Chain', address: 'Seke Commercial Centre, Stand 102, Chitungwiza', phone: '+263 24 2331187', hours: 'Mon - Sun: 08:00 - 17:30', mapQuery: 'Chitungwiza+Town+Centre' },
  { city: 'Harare', name: 'Electrosales Harare Central', type: 'Authorized Retail Chain', address: '55 Cameron Street, Harare CBD', phone: '+263 24 2772010', hours: 'Mon - Sat: 08:00 - 17:00', mapQuery: 'Cameron+Street+Harare' },

  // Gweru
  { city: 'Gweru', name: 'Halsteds Gweru Builders Express', type: 'Authorized Retail Chain', address: 'Lot 14 Main Street, Commercial Hub, Gweru', phone: '+263 54 2228890', hours: 'Mon - Sat: 08:00 - 17:00', mapQuery: 'Main+Street+Gweru' },
  { city: 'Gweru', name: 'Treger Midlands Logistics Depot', type: 'Regional Hub', address: 'Coventry Road, Heavy Industrial Sites, Gweru', phone: '+263 54 2214455', hours: 'Mon - Fri: 08:00 - 17:00', mapQuery: 'Coventry+Road+Gweru' },
  { city: 'Gweru', name: 'Gain Cash & Carry Gweru', type: 'Authorized Retail Chain', address: '6th Street & Lobengula Ave, Gweru', phone: '+263 54 2230190', hours: 'Mon - Sat: 08:00 - 17:00', mapQuery: '6th+Street+Gweru' },

  // Mutare
  { city: 'Mutare', name: 'Electrosales Hardware Mutare', type: 'Authorized Retail Chain', address: '2nd Avenue & Herbert Chitepo St, Mutare', phone: '+263 20 645590', hours: 'Mon - Sat: 08:00 - 17:00', mapQuery: 'Herbert+Chitepo+Street+Mutare' },
  { city: 'Mutare', name: 'Treger Eastern Highlands Depot', type: 'Regional Hub', address: 'Riverside Drive, Mutare Industrial Hub', phone: '+263 20 621144', hours: 'Mon - Fri: 08:00 - 17:00', mapQuery: 'Riverside+Drive+Mutare' },

  // Masvingo
  { city: 'Masvingo', name: 'N. Richards Wholesale Masvingo', type: 'Authorized Retail Chain', address: 'Robert Mugabe Way, Industrial Area, Masvingo', phone: '+263 39 2262900', hours: 'Mon - Fri: 08:00 - 17:00', mapQuery: 'Robert+Mugabe+Way+Masvingo' },
  { city: 'Masvingo', name: 'Farmers World Masvingo', type: 'Authorized Retail Chain', address: 'Stand 12 Greenfield St, Masvingo', phone: '+263 39 2264880', hours: 'Mon - Sat: 08:00 - 16:30', mapQuery: 'Greenfield+Street+Masvingo' }
];

function renderStoreResults(cityQuery: string) {
  const out = document.getElementById("storeOut");
  if (!out) return;

  const q = cityQuery.trim().toLowerCase();
  const matched = STORES.filter(s => s.city.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q));

  if (matched.length === 0) {
    out.innerHTML = `
      <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-neutral-300 text-sm">
        <p>No dedicated Treger branches found directly matching "<strong>${cityQuery}</strong>".</p>
        <p class="text-xs text-neutral-400 mt-2">Treger Products distributes through 300+ partner hardware chains nationwide. Contact our Khami Road HQ for your nearest wholesale stockist.</p>
        <button onclick="window.searchCity('Bulawayo')" class="mt-3 px-4 py-2 bg-treger text-white rounded-full text-xs font-bold hover:bg-white hover:text-black transition">View Bulawayo HQ & Factory Outlets</button>
      </div>
    `;
    return;
  }

  out.innerHTML = `
    <div class="space-y-3 mt-4">
      <div class="flex items-center justify-between text-xs text-neutral-400">
        <span>Found <strong>${matched.length}</strong> official locations in or near <strong>${cityQuery}</strong></span>
        <span class="text-emerald-400 font-bold">✓ Verified Stockists</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        ${matched.map(s => `
          <div class="store-card text-left space-y-2">
            <div class="flex items-start justify-between gap-2">
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                s.type.includes('HQ') ? 'bg-treger text-white' : s.type.includes('Regional') ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-300'
              }">${s.type}</span>
              <span class="text-[11px] text-neutral-400 font-semibold">${s.city}</span>
            </div>
            <div>
              <h4 class="font-display font-extrabold text-sm text-white leading-snug">${s.name}</h4>
              <p class="text-[11px] text-neutral-400 mt-0.5">${s.address}</p>
            </div>
            <div class="text-[10px] text-neutral-500 pt-1 border-t border-white/10">
              🕒 ${s.hours}
            </div>
            <div class="flex items-center gap-2 pt-1">
              <a href="tel:${s.phone.replace(/\s+/g, '')}" class="flex-1 py-1.5 px-3 bg-white/10 hover:bg-treger rounded-lg text-[11px] font-bold text-center text-white transition">
                📞 ${s.phone}
              </a>
              <a href="https://maps.google.com/?q=${s.mapQuery}" target="_blank" rel="noopener" class="py-1.5 px-3 bg-white/5 hover:bg-white hover:text-black rounded-lg text-[11px] font-bold text-neutral-300 transition">
                Directions ↗
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

(window as any).searchCity = (city: string) => {
  const inp = document.getElementById("storeInput") as HTMLInputElement | null;
  if (inp) inp.value = city;
  renderStoreResults(city);
};

const storeBtn = document.getElementById("storeBtn");
storeBtn?.addEventListener("click", () => {
  const v = (document.getElementById("storeInput") as HTMLInputElement)?.value || "Bulawayo";
  renderStoreResults(v);
});

// City Quick Filter Pills in Store Finder
document.querySelectorAll("#stores button[onclick*='storeInput']").forEach(btn => {
  btn.removeAttribute("onclick");
  btn.addEventListener("click", () => {
    const city = btn.textContent?.trim() || "Bulawayo";
    (window as any).searchCity(city);
  });
});

// Initial store render
renderStoreResults("Bulawayo");

// --- Modal Helper Functions ---
function closeAllSiteModals() {
  document.querySelectorAll(".site-modal-overlay").forEach(m => m.classList.remove("open"));
}

document.querySelectorAll("[data-close-site-modal]").forEach(btn => {
  btn.addEventListener("click", closeAllSiteModals);
});

document.querySelectorAll(".site-modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeAllSiteModals();
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllSiteModals();
});

// --- Request a Quote Modal Interactivity ---
export function openQuoteModal(initialDivision = "Shumba Sheeting", initialProduct = "") {
  closeAllSiteModals();
  const modal = document.getElementById("quoteModal");
  const divSelect = document.getElementById("qInputDivision") as HTMLSelectElement | null;
  const detailsArea = document.getElementById("qInputDetails") as HTMLTextAreaElement | null;

  if (divSelect) {
    for (let i = 0; i < divSelect.options.length; i++) {
      if (divSelect.options[i].value.toLowerCase().includes(initialDivision.toLowerCase())) {
        divSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (detailsArea && initialProduct) {
    detailsArea.value = `Enquiry for: ${initialProduct}\nQuantity required: \nDelivery schedule: `;
  }

  modal?.classList.add("open");
}

(window as any).openQuoteModalWithProduct = (productName: string, division: string) => {
  openQuoteModal(division, productName);
};

// Intercept Quote / Contact Buttons
document.querySelectorAll('a[href*="tregerproducts.com"]').forEach(link => {
  const txt = link.textContent?.trim().toUpperCase() || "";
  if (txt.includes("REQUEST A QUOTE") || txt.includes("DISCUSS YOUR PROJECT") || txt.includes("CONTACT US")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openQuoteModal();
    });
  }
});

document.querySelector('a[href="#contact"][class*="DISCUSS YOUR PROJECT"]')?.addEventListener("click", (e) => {
  e.preventDefault();
  openQuoteModal("iBuild Aluminium", "iBuild Aluminium Sliding Doors and Windows");
});

// Form: Request a Quote Submission
document.getElementById("quoteForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = (document.getElementById("qInputName") as HTMLInputElement).value;
  const company = (document.getElementById("qInputCompany") as HTMLInputElement).value;
  const div = (document.getElementById("qInputDivision") as HTMLSelectElement).value;
  const city = (document.getElementById("qInputCity") as HTMLSelectElement).value;
  const refCode = `TRG-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;

  closeAllSiteModals();
  showSiteToast(`✓ Quote enquiry #${refCode} submitted for ${company}! A sales engineer will contact you shortly.`);
  alert(`TREGER FACTORY ENQUIRY CONFIRMATION\n\nReference: ${refCode}\nClient: ${name} (${company})\nDivision: ${div}\nDestination: ${city}\n\nYour commercial RFQ has been logged with Khami Road Commercial Sales. A formal proforma quotation will be dispatched within 4 working hours.`);
  (document.getElementById("quoteForm") as HTMLFormElement).reset();
});

// --- Digital Catalogues Viewer & PDF Simulator ---
const CATALOGUES_DATA: Record<string, { title: string; subtitle: string; specs: string[]; filename: string }> = {
  "Homeware": {
    title: "Treger Homeware & Cookware Catalogue",
    subtitle: "Kango Hollowware, Cookware, Teapots, Mugs & Household Essentials",
    specs: [
      "• Kango 3-Leg Bellied Cast Aluminium Pots (Sizes 1, 2, 3, 4, 6, 8, 10, 14, 25)",
      "• Enamel Steel Hollowware: 500ml / 750ml Mugs, 26cm Plates, 3L Basins",
      "• Heavy Duty Pressed Aluminium Frying Pans (20cm, 24cm, 28cm non-stick & mirror finish)",
      "• Whistling Bakelite-handle Stainless & Enamel Kettles (1.8L to 3.5L capacity)",
      "• SABS 1342 Certified Cookware Standards • Heat-resistant vitreous enamel coating"
    ],
    filename: "Treger_Homeware_Cookware_Catalogue_2026.pdf"
  },
  "Buildersware": {
    title: "Treger Buildersware & Construction Solutions",
    subtitle: "Shumba Sheeting, Monarch Steel Mesh, Garage Doors & iBuild Aluminium",
    specs: [
      "• Shumba IBR & Corrugated 0.30mm, 0.40mm, 0.50mm Chromadek & Galvanised Sheeting",
      "• Monarch Welded Wire Mesh 50x50mm, 100x100mm Brickforce 75mm/150mm & Razor Wire",
      "• Monarch Heavy Duty Roll-Up Industrial & Domestic Garage Doors with safety locks",
      "• iBuild Architectural Aluminium Patio Sliding Doors & Top-Hung Windows",
      "• Structural steel conformity to SANS 3575 / IS 277 specifications"
    ],
    filename: "Treger_Buildersware_Catalogue_2026.pdf"
  },
  "Agriculture": {
    title: "Treger Agricultural & Irrigation Solutions",
    subtitle: "ZGB Woven PP Grain Bags, Heavy Duty Basins & PVC Pressure Piping",
    specs: [
      "• ZGB 50kg Heavy Duty Woven Polypropylene Grain & Fertilizer Sacks (UV Stabilised)",
      "• Treger PVC High Pressure Irrigation Piping (40mm to 160mm Class 6, 9, 12, 16)",
      "• LDPE Agricultural Drip Irrigation Tubing & Borehole Poly Pipes (Class 3 to 10)",
      "• Ingwe Heavy Duty Cattle/Livestock Troughs, 20L Heavy Duty Farm Buckets",
      "• Food Safety and Agricultural Standards compliant"
    ],
    filename: "Treger_Agriculture_Catalogue_2026.pdf"
  },
  "Packaging": {
    title: "Treger Plastics & Industrial Packaging",
    subtitle: "Polyethylene Extrusion, Shrink Film Rolls, Printed Bread Bags",
    specs: [
      "• 100% Virgin Food-Grade LDPE & HDPE Shrink Wrap Rolls for beverage canning",
      "• Micro-Perforated & Ventilated Printed Bakery Bread Bags (500g & 800g loaves)",
      "• Industrial Heavy-Duty Liners, Agricultural Mulch Film & Builder's Sheeting 250um",
      "• In-house closed-loop recycling blend options for sustainable packaging",
      "• ISO 9001:2015 Manufacturing Plant Quality Assurance"
    ],
    filename: "Treger_Packaging_Catalogue_2026.pdf"
  },
  "Treger Plastics": {
    title: "Treger Plastics Technical Product Spec Sheet",
    subtitle: "PVC Pressure Pipes, Sewer Drainage, Conduit & Moulded Products",
    specs: [
      "• SABS 966 Part 1 & 2 Approved PVC-U Pressure Pipes with rubber ring socket joints",
      "• Solid Wall Underground Sewer & Drain Pipes 110mm & 160mm (Class 34)",
      "• Electrical Cable Conduits with expanding couplings",
      "• Borehole Casing & Screen Pipes with precision slotting",
      "• Maximum working pressures tested up to 25 Bar"
    ],
    filename: "Treger_Plastics_Piping_SpecSheet_2026.pdf"
  },
  "Kango": {
    title: "Iconic Kango Cookware Heritage Catalogue",
    subtitle: "Made in Bulawayo Since 1953 • Lifetime Cast Hollowware",
    specs: [
      "• Original Traditional Black Bellied Cast Aluminium 3-Leg Fire Pots",
      "• Vitreous Enamel Coated Casseroles and Round Roaster Pots with self-basting lids",
      "• High-Purity Die-Cast Aluminium Saucepan Sets (3-piece with heat-resistant knobs)",
      "• Heritage Traditional Teapots with Bakelite handles & anti-drip spouts",
      "• Manufactured at Khami Road Foundry, Bulawayo, Zimbabwe"
    ],
    filename: "Kango_Heritage_Cookware_Catalogue_2026.pdf"
  }
};

let activeCatalogueKey = "Homeware";

function openCatalogueModal(catKey: string) {
  closeAllSiteModals();
  activeCatalogueKey = catKey;
  const data = CATALOGUES_DATA[catKey] || CATALOGUES_DATA["Homeware"];
  const modal = document.getElementById("catalogueModal");
  const title = document.getElementById("catModalTitle");
  const sub = document.getElementById("catModalSubtitle");
  const content = document.getElementById("catModalContent");

  if (title) title.textContent = data.title;
  if (sub) sub.textContent = data.subtitle;
  if (content) {
    content.innerHTML = `
      <div class="space-y-2 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
        <h5 class="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">Included Specifications & Standards:</h5>
        <ul class="space-y-1.5 text-neutral-600 text-xs">
          ${data.specs.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      <p class="text-neutral-500 text-[11px] pt-1">Document Format: Certified PDF Datasheet • Verified by Treger Technical Engineering • Size: ~3.4 MB</p>
    `;
  }

  modal?.classList.add("open");
}

// Download PDF button handler
document.getElementById("catModalDownloadBtn")?.addEventListener("click", () => {
  const data = CATALOGUES_DATA[activeCatalogueKey] || CATALOGUES_DATA["Homeware"];
  const fileContent = `=====================================================
TREGER PRODUCTS (PVT) LTD — BULAWAYO, ZIMBABWE
OFFICIAL PRODUCT CATALOGUE & SPECIFICATION DATASHEET
=====================================================

TITLE: ${data.title}
SUBTITLE: ${data.subtitle}
DATE: 2026 / 2027 Edition
HEADQUARTERS: Khami Road, Bulawayo, Zimbabwe
WEBSITE: https://tregerproducts.com

TECHNICAL PRODUCT SPECIFICATIONS:
${data.specs.join('\n')}

MANUFACTURING STANDARDS:
- SABS / ISO 9001:2015 Manufacturing Assurance
- 100+ Years Zimbabwean Industrial Heritage
- 5 Dedicated Production Sites Across Zimbabwe
- 300+ Authorized Distribution Stores Nationwide

FOR BULK WHOLESALE & FACTORY ORDERS:
Email: sales@tregerproducts.com
Phone: +263 29 278000 / +263 24 2754890
Bulawayo HQ • Khami Road
Harare Hub • Stand 409 Kelvin North Rd, Graniteside
=====================================================`;

  const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = data.filename.replace('.pdf', '_datasheet.txt');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showSiteToast(`📥 Download started for ${data.filename}!`);
});

// Intercept Catalogue card buttons
document.querySelectorAll("#catalogues article").forEach(card => {
  const heading = card.querySelector("b")?.textContent?.trim() || "";
  const catKey = Object.keys(CATALOGUES_DATA).find(k => heading.toLowerCase().includes(k.toLowerCase())) || "Homeware";

  const viewBtn = card.querySelector('a:first-of-type');
  const dlBtn = card.querySelector('a:last-of-type');

  viewBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openCatalogueModal(catKey);
  });

  dlBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openCatalogueModal(catKey);
  });
});
