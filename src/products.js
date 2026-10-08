export const FILTERS = ["All", "Homeware", "Buildersware", "Agriculture", "Packaging", "Kitchen", "Aluminium", "Steel", "Plastics", "Roofing", "Pipes", "Cookware"];
const U = (id, w = 800) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
export const PRODUCTS = [
    { id: "kango-pot", name: "KANGO BLACK BELLIED POT", division: "Kango", category: "Cookware", tags: ["Homeware", "Kitchen", "Cookware", "Aluminium"], spec: "Cast aluminium • 3-leg", img: U("photo-1584990347449-a2d4c2c7d3c4") },
    { id: "kango-mug", name: "KANGO ENAMEL MUG", division: "Kango", category: "Cookware", tags: ["Homeware", "Kitchen", "Cookware"], spec: "Enamel steel • 500ml", img: U("photo-1514228742587-6b1558fcca3d") },
    { id: "frying-pan", name: "ALUMINIUM FRYING PAN", division: "Kango", category: "Cookware", tags: ["Homeware", "Kitchen", "Cookware", "Aluminium"], spec: "Pressed aluminium • 28cm", img: U("photo-1590794056226-79ef3a8147e1") },
    { id: "stew-pan", name: "KANGO STEW PAN SET", division: "Kango", category: "Cookware", tags: ["Homeware", "Kitchen", "Cookware", "Aluminium"], spec: "3-piece • lids incl.", img: U("photo-1583778176476-4a8d0e0ff6f0") },
    { id: "kettle", name: "KANGO KETTLE 2.5L", division: "Kango", category: "Cookware", tags: ["Homeware", "Kitchen", "Cookware"], spec: "Whistling • Bakelite", img: U("photo-1594213114663-d94db9b17125") },
    { id: "teapot", name: "KANGO TEAPOT", division: "Kango", category: "Cookware", tags: ["Homeware", "Kitchen", "Cookware"], spec: "Enamel • 1.1L", img: U("photo-1561336313-0bd5e0b27ec8") },
    { id: "plates", name: "ENAMEL PLATES 4-PACK", division: "Kango", category: "Kitchen", tags: ["Homeware", "Kitchen"], spec: "26cm • chip resistant", img: U("photo-1603199506016-b9a594b593c0") },
    { id: "food-dish", name: "INGWE FOOD DISH", division: "Ingwe", category: "Plastics", tags: ["Homeware", "Plastics", "Kitchen"], spec: "Food-grade • 2L", img: U("photo-1584589167171-541ce45f1eea") },
    { id: "veg-dish", name: "INGWE VEG DISH 5L", division: "Ingwe", category: "Plastics", tags: ["Homeware", "Plastics", "Kitchen"], spec: "BPA-free • lid", img: U("photo-1610701596007-11502861dcfa") },
    { id: "bucket", name: "INGWE BUCKET 20L", division: "Ingwe", category: "Plastics", tags: ["Homeware", "Plastics", "Agriculture"], spec: "Heavy duty", img: U("photo-1581622558663-b2e33377dfb2") },
    { id: "chair", name: "MONARCH PLASTIC CHAIR", division: "Ingwe", category: "Plastics", tags: ["Homeware", "Plastics"], spec: "120kg rated", img: U("photo-1503602642458-232111445657") },
    { id: "pipe", name: "TREGER PVC PIPE 110MM", division: "Treger Plastics", category: "Pipes", tags: ["Buildersware", "Plastics", "Pipes", "Agriculture"], spec: "6m • SABS grade", img: U("photo-1585704032915-c3400ca199e7") },
];
