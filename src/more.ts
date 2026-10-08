import type { Product } from "./products";
const U = (id: string, w = 800) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
export const PRODUCTS2: Product[] = [
  { id:"tank", name:"POLY WATER TANK 5000L", division:"Treger Plastics", category:"Pipes", tags:["Agriculture","Buildersware","Plastics"], spec:"UV stabilised", img:U("photo-1581094794329-c8112a89af12") },
  { id:"shrink", name:"SHRINK FILM ROLL", division:"Treger Plastics", category:"Packaging", tags:["Packaging","Plastics"], spec:"Food-grade PE", img:U("photo-1587293852726-70cdb56c2866") },
  { id:"bread-bag", name:"BREAD BAGS 1000PK", division:"Treger Plastics", category:"Packaging", tags:["Packaging","Plastics"], spec:"Printed • ventilated", img:U("photo-1509440159596-0249088772ff") },
  { id:"grain-bag", name:"ZGB GRAIN BAG 50KG", division:"ZGB", category:"Packaging", tags:["Packaging","Agriculture"], spec:"Woven PP • UV", img:U("photo-1625246333195-78d9c38ad449") },
  { id:"roof-ibr", name:"SHUMBA IBR SHEET", division:"Shumba Sheeting", category:"Roofing", tags:["Buildersware","Steel","Roofing"], spec:"0.4mm • Chromadek", img:U("photo-1632759145351-1d592919f522") },
  { id:"roof-corr", name:"SHUMBA CORRUGATED", division:"Shumba Sheeting", category:"Roofing", tags:["Buildersware","Steel","Roofing"], spec:"0.3mm • galvanised", img:U("photo-1504307651254-35680f356dfd") },
  { id:"wire-mesh", name:"MONARCH WIRE MESH", division:"Monarch Steel", category:"Steel", tags:["Buildersware","Steel","Agriculture"], spec:"50x50 • 1.8m roll", img:U("photo-1531834685032-c34bf0d84c77") },
  { id:"garage", name:"MONARCH GARAGE DOOR", division:"Monarch Steel", category:"Steel", tags:["Buildersware","Steel"], spec:"Roller • 2.4m", img:U("photo-1558036117-15d82a90b9b1") },
  { id:"window", name:"IBUILD SLIDING WINDOW", division:"iBuild Aluminium", category:"Aluminium", tags:["Buildersware","Aluminium"], spec:"Custom • powdercoat", img:U("photo-1600585154340-be6161a56a0c") },
  { id:"door", name:"IBUILD SLIDING DOOR", division:"iBuild Aluminium", category:"Aluminium", tags:["Buildersware","Aluminium"], spec:"3-panel • secure", img:U("photo-1600607687939-ce8a6c25118c") },
  { id:"kitchen", name:"MONARCH KITCHEN UNIT", division:"Monarch Kitchens", category:"Kitchen", tags:["Homeware","Kitchen","Steel"], spec:"Steel carcass • 2.4m", img:U("photo-1556911220-bff31c812dba") },
  { id:"cabinet", name:"STEEL PANTRY CABINET", division:"Monarch Kitchens", category:"Kitchen", tags:["Homeware","Kitchen","Steel"], spec:"Termite-proof", img:U("photo-1595428774223-ef52624120d2") },
];
export type Division = { id:string; name:string; tag:string; desc:string; points:string[]; img:string };
export const DIVISIONS: Division[] = [
  { id:"kango", name:"KANGO", tag:"Cookware • Since 1953", desc:"Zimbabwe's iconic hollowware — pots, mugs, plates and black-bellied pots made in Bulawayo.", points:["Black bellied pots","Enamel mugs & plates","Kettles & teapots"], img:U("photo-1584990347449-a2d4c2c7d3c4",1200) },
  { id:"ingwe", name:"INGWE", tag:"Plasticware • Home", desc:"Everyday plasticware — dishes, buckets, basins and household essentials.", points:["Food dishes","Buckets & basins","Chairs"], img:U("photo-1584589167171-541ce45f1eea",1200) },
  { id:"monarch-steel", name:"MONARCH STEEL", tag:"Steel • Building", desc:"Steel building solutions — mesh, garage doors and construction products.", points:["Wire mesh","Garage doors","Building steel"], img:U("photo-1504307651254-35680f356dfd",1200) },
  { id:"monarch-kitchens", name:"MONARCH KITCHENS", tag:"Pressed steel kitchens", desc:"Pressed-steel kitchens — durable, termite-resistant, easy to clean.", points:["Steel carcasses","Pantry units","Storage"], img:U("photo-1556911220-bff31c812dba",1200) },
  { id:"shumba", name:"SHUMBA SHEETING", tag:"Roofing", desc:"Roofing — IBR, corrugated and accessories for homes and industry.", points:["IBR sheets","Corrugated","Flashings"], img:U("photo-1632759145351-1d592919f522",1200) },
  { id:"plastics", name:"TREGER PLASTICS", tag:"Packaging • Pipes", desc:"PE packaging, PVC piping and moulding for food, water and industry.", points:["PVC pipes","Bread bags","Shrink film"], img:U("photo-1587293852726-70cdb56c2866",1200) },
  { id:"zgb", name:"ZGB", tag:"Grain & industrial bags", desc:"Grain and industrial packaging — woven PP bags for agriculture.", points:["Grain bags 50kg","Industrial sacks","Woven PP"], img:U("photo-1625246333195-78d9c38ad449",1200) },
  { id:"ibuild", name:"iBUILD ALUMINIUM", tag:"Doors • Windows", desc:"Custom aluminium doors and windows, made to plan across Zimbabwe.", points:["Sliding doors","Windows","Shopfronts"], img:U("photo-1600585154340-be6161a56a0c",1200) },
];
