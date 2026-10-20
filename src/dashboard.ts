import './dashboard.css';

type Role = 'admin' | 'supplier' | 'driver';

const role = (document.body.dataset.role || 'admin') as Role;
const app = document.getElementById('dashboardApp');

// --- Theme Preference Management ---
const THEME_STORAGE_KEY = 'treger_dash_theme';

export function getStoredTheme(): 'dark' | 'light' {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem('treger_theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {
    // ignore storage access errors
  }
  return 'dark';
}

export function applyTheme(theme: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem('treger_theme', theme);
  } catch (e) {
    // ignore storage access errors
  }
}

// Immediately apply stored theme
applyTheme(getStoredTheme());

// --- Icons Library ---
const icons: Record<string, string> = {
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  driver: '<circle cx="12" cy="8" r="4"/><path d="M5 21v-1a7 7 0 0 1 14 0v1M19 8h3l1 3v4h-4M2 11h4M2 15h3"/>',
  box: '<path d="m3 7 9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/>',
  truck: '<path d="M3 6h11v12H3zM14 10h4l3 3v5h-7"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="17.5" cy="19" r="1.5"/>',
  check: '<path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/>',
  cross: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>',
  clipboard: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M9 5.5V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M8 11h8m-8 4h8"/>',
  inventory: '<path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0m1-11a3 3 0 1 0 0-6m1 11a5 5 0 0 1 4 5"/>',
  chart: '<path d="M4 19V9m5 10V5m6 14v-7m5 7V3M2 21h20"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.7 1.7 0 1 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 1 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 1 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 1 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 1 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 1 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 1 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 1 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
  pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
};

const icon = (name: string, className = '') =>
  `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.dashboard}</svg>`;

// --- Types & Data Models ---
export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  location: string;
  division: string;
  product: string;
  quantity: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Cancelled';
  amountUSD: number;
  date: string;
  eta: string;
  driver: string;
  truck: string;
  phone: string;
  podSignature?: string;
  podSignedBy?: string;
  podNotes?: string;
}

export interface StockItem {
  id: string;
  name: string;
  division: string;
  amount: string;
  stockCount: number;
  threshold: number;
  unit: string;
}

export interface SupplierItem {
  id: string;
  name: string;
  contact: string;
  category: string;
  code: string;
  phone: string;
  status: 'Active' | 'Pending Audit';
}

export interface DriverItem {
  id: string;
  name: string;
  license: string;
  truck: string;
  phone: string;
  status: 'Active - En Route' | 'Available' | 'Off Duty';
}

export interface NotificationItem {
  id: string;
  tone: 'red' | 'white' | 'grey';
  title: string;
  time: string;
  read: boolean;
}

// --- Initial Seed Data (Authentic Treger Products & Zimbabwe Context) ---
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1024',
    orderNumber: '#TRG-1024',
    customer: 'Halsteds Builders Express',
    location: 'Gweru Commercial Hub',
    division: 'Shumba Sheeting',
    product: 'Shumba IBR 0.40mm Chromadek (6m)',
    quantity: '350 Sheets',
    status: 'In Transit',
    amountUSD: 6615.00,
    date: '19 Oct 2026 10:24',
    eta: '14 min',
    driver: 'Farai Moyo',
    truck: 'TRG-08 (UD Croner 12T)',
    phone: '+263 77 412 8890',
  },
  {
    id: 'ord-1023',
    orderNumber: '#TRG-1023',
    customer: 'Treger Harare Regional Hub',
    location: 'Graniteside, Harare',
    division: 'Kango Cookware',
    product: 'Kango 3-Leg Bellied Pot Sz 3',
    quantity: '600 Units',
    status: 'Pending',
    amountUSD: 14700.00,
    date: '19 Oct 2026 09:17',
    eta: '3 hrs 45 min',
    driver: 'Tendai Chiwawa',
    truck: 'TRG-01 (Scania 30T)',
    phone: '+263 71 290 4411',
  },
  {
    id: 'ord-1022',
    orderNumber: '#TRG-1022',
    customer: 'Gain Cash & Carry',
    location: 'Chitungwiza Seke Hub',
    division: 'Ingwe Plastics',
    product: 'Ingwe Heavy Duty Basin 20L',
    quantity: '1,200 Units',
    status: 'In Transit',
    amountUSD: 5760.00,
    date: '19 Oct 2026 08:45',
    eta: '25 min',
    driver: 'Farai Moyo',
    truck: 'TRG-08 (UD Croner 12T)',
    phone: '+263 77 233 1187',
  },
  {
    id: 'ord-1021',
    orderNumber: '#TRG-1021',
    customer: 'N. Richards Wholesale',
    location: 'Industrial Sites, Masvingo',
    division: 'ZGB Bags',
    product: 'ZGB Woven PP Grain Bags 50kg',
    quantity: '15,000 Bags',
    status: 'Delivered',
    amountUSD: 10800.00,
    date: '18 Oct 2026 18:32',
    eta: 'Completed',
    driver: 'Blessed Ndlovu',
    truck: 'TRG-04 (UD Quon 14T)',
    phone: '+263 77 988 2301',
    podSignedBy: 'C. Moyo (Warehouse Sup)',
    podNotes: 'All 300 bundles of 50 bags inspected and verified clean.',
  },
  {
    id: 'ord-1020',
    orderNumber: '#TRG-1020',
    customer: 'Electrosales Hardware',
    location: 'Herbert Chitepo, Mutare',
    division: 'Treger Plastics',
    product: 'PVC Pressure Pipe 110mm Cl 9',
    quantity: '200 Pipes',
    status: 'Cancelled',
    amountUSD: 2840.00,
    date: '18 Oct 2026 16:20',
    eta: 'Cancelled by client',
    driver: 'Unassigned',
    truck: 'None',
    phone: '+263 77 554 9920',
  },
];

const INITIAL_STOCK: StockItem[] = [
  { id: 'stk-1', name: 'Kango Black Bellied Pot Sz 3', division: 'Kango', amount: '1,420 units', stockCount: 1420, threshold: 300, unit: 'units' },
  { id: 'stk-2', name: 'Kango Enamel Mugs 500ml', division: 'Kango', amount: '210 units', stockCount: 210, threshold: 500, unit: 'units' },
  { id: 'stk-3', name: 'Ingwe Heavy Duty Basin 20L', division: 'Ingwe', amount: '3,840 units', stockCount: 3840, threshold: 600, unit: 'units' },
  { id: 'stk-4', name: 'Shumba IBR 0.40mm Sheet (6m)', division: 'Shumba Sheeting', amount: '520 sheets', stockCount: 520, threshold: 150, unit: 'sheets' },
  { id: 'stk-5', name: 'Shumba Corrugated 0.3mm (3.6m)', division: 'Shumba Sheeting', amount: '80 sheets', stockCount: 80, threshold: 250, unit: 'sheets' },
  { id: 'stk-6', name: 'ZGB Woven Grain Bags 50kg', division: 'ZGB', amount: '18,500 bags', stockCount: 18500, threshold: 5000, unit: 'bags' },
  { id: 'stk-7', name: 'Monarch Welded Mesh 50x50mm', division: 'Monarch Steel', amount: '320 rolls', stockCount: 320, threshold: 100, unit: 'rolls' },
];

const INITIAL_SUPPLIERS: SupplierItem[] = [
  { id: 'sup-1', name: 'ZimAlloy Smelters & Foundry Ltd', contact: 'E. Matiza', category: 'Aluminium Ingots', code: 'VND-ALU-02', phone: '+263 77 100 2200', status: 'Active' },
  { id: 'sup-2', name: 'Sasol Polymers Southern Africa', contact: 'J. Naidoo', category: 'Polymer Resins (HDPE/PP)', code: 'VND-SAS-09', phone: '+27 11 344 5000', status: 'Active' },
  { id: 'sup-3', name: 'Highveld Steel & Coil Processing', contact: 'G. van Wyk', category: 'Galvanised Steel Coils', code: 'VND-HVD-04', phone: '+263 71 880 1199', status: 'Active' },
  { id: 'sup-4', name: 'Zimplas Masterbatch & Pigments', contact: 'K. Ndlovu', category: 'UV Colorants & Additives', code: 'VND-ZMP-07', phone: '+263 77 662 3344', status: 'Active' },
];

const INITIAL_DRIVERS: DriverItem[] = [
  { id: 'drv-1', name: 'Farai Moyo', license: 'Class 2 Heavy', truck: 'TRG-08 (UD Croner 12T)', phone: '+263 77 444 0101', status: 'Active - En Route' },
  { id: 'drv-2', name: 'Tendai Chiwawa', license: 'Class 2 Heavy Artic', truck: 'TRG-01 (Scania 30T)', phone: '+263 71 222 3456', status: 'Available' },
  { id: 'drv-3', name: 'Blessed Ndlovu', license: 'Class 2 Heavy', truck: 'TRG-04 (UD Quon 14T)', phone: '+263 77 888 9090', status: 'Active - En Route' },
  { id: 'drv-4', name: 'Simbarashe Moyo', license: 'Class 2 Heavy', truck: 'TRG-12 (Isuzu 8T)', phone: '+263 73 555 4321', status: 'Available' },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'not-1', tone: 'red', title: 'Order #TRG-1023 requires transport confirmation', time: '18 mins ago', read: false },
  { id: 'not-2', tone: 'white', title: 'TRG-08 (Farai Moyo) entered Midlands highway corridor', time: '42 mins ago', read: false },
  { id: 'not-3', tone: 'grey', title: 'Sasol Polymers: Inbound dock slot Gate 3 approved', time: '2 hours ago', read: false },
  { id: 'not-4', tone: 'red', title: 'Stock notice: Shumba Corrugated 0.3mm below threshold (80 remaining)', time: '4 hours ago', read: false },
];

// --- Persistent State Manager (LocalStorage Sync) ---
const STORAGE_PREFIX = 'treger_dash_state_v2_';

function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStored<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error', e);
  }
}

class DashboardState {
  orders: Order[];
  stock: StockItem[];
  suppliers: SupplierItem[];
  drivers: DriverItem[];
  notifications: NotificationItem[];
  routeProgress: number;

  constructor() {
    this.orders = getStored('orders', INITIAL_ORDERS);
    this.stock = getStored('stock', INITIAL_STOCK);
    this.suppliers = getStored('suppliers', INITIAL_SUPPLIERS);
    this.drivers = getStored('drivers', INITIAL_DRIVERS);
    this.notifications = getStored('notifications', INITIAL_NOTIFICATIONS);
    this.routeProgress = getStored('route_progress', 68);
  }

  save() {
    setStored('orders', this.orders);
    setStored('stock', this.stock);
    setStored('suppliers', this.suppliers);
    setStored('drivers', this.drivers);
    setStored('notifications', this.notifications);
    setStored('route_progress', this.routeProgress);
  }

  addOrder(order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'eta'>): Order {
    const num = Math.floor(1025 + Math.random() * 50);
    const newOrder: Order = {
      ...order,
      id: `ord-${num}`,
      orderNumber: `#TRG-${num}`,
      date: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date()),
      eta: order.status === 'In Transit' ? '45 min' : order.status === 'Delivered' ? 'Completed' : 'Pending dispatch',
    };
    this.orders.unshift(newOrder);
    this.addNotification('white', `New order ${newOrder.orderNumber} placed for ${newOrder.customer}`);
    this.save();
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['status'], podDetails?: { signature: string; signedBy: string; notes: string }) {
    const ord = this.orders.find(o => o.id === orderId);
    if (!ord) return;
    ord.status = status;
    if (status === 'Delivered') {
      ord.eta = 'Completed';
      if (podDetails) {
        ord.podSignature = podDetails.signature;
        ord.podSignedBy = podDetails.signedBy;
        ord.podNotes = podDetails.notes;
      }
      this.routeProgress = Math.min(100, this.routeProgress + 16);
      this.addNotification('white', `Order ${ord.orderNumber} successfully delivered to ${ord.customer}`);
    } else if (status === 'Cancelled') {
      ord.eta = 'Cancelled';
      this.addNotification('red', `Order ${ord.orderNumber} was marked cancelled`);
    } else if (status === 'In Transit') {
      ord.eta = '35 min';
      this.addNotification('red', `Order ${ord.orderNumber} is now in transit`);
    }
    this.save();
  }

  adjustStock(stockId: string, newCount: number) {
    const item = this.stock.find(s => s.id === stockId);
    if (!item) return;
    item.stockCount = Math.max(0, newCount);
    item.amount = `${item.stockCount.toLocaleString()} ${item.unit}`;
    if (item.stockCount <= item.threshold) {
      this.addNotification('red', `Low stock warning: ${item.name} (${item.stockCount} ${item.unit} remaining)`);
    }
    this.save();
  }

  addSupplier(sup: Omit<SupplierItem, 'id' | 'code' | 'status'>) {
    const code = `VND-${Date.now().toString(36).slice(-4).toUpperCase()}`;
    const newSup: SupplierItem = {
      ...sup,
      id: `sup-${Date.now()}`,
      code,
      status: 'Active',
    };
    this.suppliers.push(newSup);
    this.addNotification('grey', `New supplier onboarded: ${newSup.name} (${newSup.code})`);
    this.save();
    return newSup;
  }

  addDriver(drv: Omit<DriverItem, 'id' | 'status'>) {
    const newDrv: DriverItem = {
      ...drv,
      id: `drv-${Date.now()}`,
      status: 'Available',
    };
    this.drivers.push(newDrv);
    this.addNotification('grey', `New driver certified: ${newDrv.name} (${newDrv.truck})`);
    this.save();
    return newDrv;
  }

  addNotification(tone: NotificationItem['tone'], title: string) {
    this.notifications.unshift({
      id: `not-${Date.now()}`,
      tone,
      title,
      time: 'Just now',
      read: false,
    });
    this.save();
  }

  markNotificationsRead() {
    this.notifications.forEach(n => (n.read = true));
    this.save();
  }
}

const state = new DashboardState();

// --- Role Information ---
const roleInfo = {
  admin: { title: 'Admin', subtitle: 'System Administrator', badge: () => state.notifications.filter(n => !n.read).length },
  supplier: { title: 'Supplier', subtitle: 'Khami Rd Partner', badge: () => state.notifications.filter(n => !n.read).length },
  driver: { title: 'Driver', subtitle: 'UD Croner (TRG-08)', badge: () => state.notifications.filter(n => !n.read).length },
}[role];

// --- Navigation Items ---
const navItems: Record<Role, Array<{ label: string; icon: string; href: string; action?: string }>> = {
  admin: [
    { label: 'Dashboard', icon: 'dashboard', href: '#dashboard' },
    { label: 'Suppliers', icon: 'users', href: '#quick-actions', action: 'open-suppliers' },
    { label: 'Drivers', icon: 'driver', href: '#live-deliveries', action: 'open-drivers' },
    { label: 'Orders', icon: 'clipboard', href: '#recent-orders', action: 'open-create-order' },
    { label: 'Products & Inventory', icon: 'inventory', href: '#stock-levels', action: 'open-inventory' },
    { label: 'Deliveries', icon: 'truck', href: '#live-deliveries', action: 'open-navigation' },
    { label: 'Reports', icon: 'chart', href: '#order-overview', action: 'open-reports' },
    { label: 'Notifications', icon: 'bell', href: '#notifications', action: 'toggle-notifications' },
  ],
  supplier: [
    { label: 'Dashboard', icon: 'dashboard', href: '#dashboard' },
    { label: 'Products & Stock', icon: 'box', href: '#stock-levels', action: 'open-inventory' },
    { label: 'Recent Orders', icon: 'clipboard', href: '#recent-orders', action: 'open-create-order' },
    { label: 'Dock Deliveries', icon: 'truck', href: '#recent-orders', action: 'open-navigation' },
    { label: 'Delivery Reports', icon: 'chart', href: '#stock-levels', action: 'open-reports' },
    { label: 'Notifications', icon: 'bell', href: '#notifications', action: 'toggle-notifications' },
  ],
  driver: [
    { label: 'Dashboard', icon: 'dashboard', href: '#dashboard' },
    { label: 'My Deliveries', icon: 'truck', href: '#today-deliveries' },
    { label: 'Navigation GPS', icon: 'pin', href: '#active-delivery', action: 'open-navigation' },
    { label: 'Capture e-POD', icon: 'check', href: '#today-deliveries', action: 'open-pod' },
    { label: 'Safety Checklist', icon: 'clipboard', href: '#notifications', action: 'open-safety' },
    { label: 'Notifications', icon: 'bell', href: '#notifications', action: 'toggle-notifications' },
  ],
};

// --- Markup Generators ---
function sidebarMarkup() {
  const badgeCount = roleInfo.badge();
  return `<aside class="sidebar" id="sidebar">
    <a class="brand" href="/" aria-label="Treger home"><img src="/images/treger-logo.png" alt="Treger Products" /></a>
    <div class="side-section-label">${role === 'admin' ? 'Operations' : role === 'supplier' ? 'Supplier workspace' : 'Driver workspace'}</div>
    <nav class="side-nav">${navItems[role].map((item, index) =>
      `<a class="side-link ${index === 0 ? 'active' : ''}" href="${item.href}" ${item.action ? `data-action="${item.action}"` : ''}>
        ${icon(item.icon)}<span>${item.label}</span>
        ${item.label === 'Notifications' && badgeCount > 0 ? `<b class="nav-count" id="sideNavBadge">${badgeCount}</b>` : ''}
      </a>`
    ).join('')}</nav>
    <div class="side-role-switch">
      <span>Dashboards</span>
      <div>
        <a href="/admin.html" class="${role === 'admin' ? 'selected' : ''}">Admin</a>
        <a href="/supplier.html" class="${role === 'supplier' ? 'selected' : ''}">Supplier</a>
        <a href="/driver.html" class="${role === 'driver' ? 'selected' : ''}">Driver</a>
      </div>
    </div>
    <div class="side-footer">
      <img src="/images/treger-logo.png" alt="" />
      <div>
        <strong>Fast · Safe · Reliable</strong>
        <span>${role === 'driver' ? 'TRG-08 · Fleet Online' : 'Khami Road · Bulawayo'}</span>
      </div>
    </div>
  </aside><button class="sidebar-backdrop" id="sidebarBackdrop" aria-label="Close menu"></button>`;
}

function topbarMarkup() {
  const displayName = roleInfo.title;
  const badgeCount = roleInfo.badge();
  const isLight = document.body.getAttribute('data-theme') === 'light';
  return `<header class="topbar">
    <button class="icon-button menu-toggle" id="sidebarToggle" aria-label="Open navigation">${icon('menu')}</button>
    <label class="search-box">
      ${icon('search')}
      <input id="dashboardSearch" type="search" placeholder="Search orders, clients, SKUs…" aria-label="Search dashboard" />
    </label>
    <nav class="role-links" aria-label="Dashboard roles">
      <a class="${role === 'admin' ? 'selected' : ''}" href="/admin.html">Admin</a>
      <a class="${role === 'supplier' ? 'selected' : ''}" href="/supplier.html">Supplier</a>
      <a class="${role === 'driver' ? 'selected' : ''}" href="/driver.html">Driver</a>
    </nav>
    <div class="topbar-actions">
      <button class="theme-toggle-btn" id="themeToggleBtn" aria-label="Toggle light or dark theme" title="Switch to ${isLight ? 'Dark' : 'Light'} Mode">
        ${isLight ? icon('moon') : icon('sun')}
        <span>${isLight ? 'Dark Mode' : 'Light Mode'}</span>
      </button>
      <button class="icon-button notification-button" id="notificationButton" aria-label="Notifications" title="System alerts">
        ${icon('bell')}
        <b id="topbarBadge" style="${badgeCount > 0 ? '' : 'display:none'}">${badgeCount}</b>
      </button>
      <div class="profile" id="account" title="Logged in as ${displayName}">
        <span class="avatar">${displayName.slice(0, 1)}</span>
        <span class="profile-name"><strong>${displayName}</strong><small>${roleInfo.subtitle}</small></span>
        <span class="chevron">⌄</span>
      </div>
    </div>
  </header>`;
}

function statCard(label: string, value: string, trend: string, iconName: string, tone = 'neutral') {
  return `<article class="stat-card">
    <div class="stat-icon ${tone}">${icon(iconName)}</div>
    <div class="stat-copy">
      <span>${label}</span>
      <strong>${value}</strong>
      <small class="trend ${tone === 'red' ? 'negative' : ''}">↑ ${trend}</small>
    </div>
  </article>`;
}

function statusPill(status: string) {
  const className = status.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
  return `<span class="status ${className}">${status}</span>`;
}

function ordersTable(ordersList: Order[], supplierMode = false) {
  const headers = supplierMode
    ? ['Order ID', 'Product Description', 'Quantity', 'Status', 'Date', 'Action']
    : ['Order ID', 'Customer / Location', 'Status', 'Amount', 'Date', 'Action'];

  const rows = ordersList.map(ord => {
    return `<tr data-order-id="${ord.id}" data-search-item class="order-table-row">
      <td><strong style="color:#fff;font-family:monospace">${ord.orderNumber}</strong></td>
      <td>
        <strong>${supplierMode ? ord.product : ord.customer}</strong>
        <small style="display:block;color:#8d95a0;font-size:8px">${supplierMode ? ord.division : ord.location}</small>
      </td>
      <td>${statusPill(ord.status)}</td>
      <td><strong>${supplierMode ? ord.quantity : '$' + ord.amountUSD.toLocaleString()}</strong></td>
      <td style="color:#9da5af">${ord.date}</td>
      <td>
        <button class="table-action-pill btn-inspect-order" data-order-id="${ord.id}" title="View order details and actions">Inspect →</button>
      </td>
    </tr>`;
  }).join('');

  return `<div class="table-wrap">
    <table>
      <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows || '<tr><td colspan="6" style="text-align:center;padding:16px;color:#777">No orders matching query</td></tr>'}</tbody>
    </table>
  </div>`;
}

function mapMarkup() {
  return `<div class="map-canvas">
    <svg class="map-route" viewBox="0 0 360 170" preserveAspectRatio="none" aria-label="Delivery route map">
      <path class="route-halo" d="M42 126 105 109 137 78 194 91 247 47 312 31"/>
      <path class="route-line" d="M42 126 105 109 137 78 194 91 247 47 312 31"/>
      <circle class="route-stop" cx="42" cy="126" r="8"/>
      <circle class="route-stop current" cx="194" cy="91" r="8"/>
      <circle class="route-stop destination" cx="312" cy="31" r="8"/>
    </svg>
    <span class="map-pin start" title="Bulawayo Khami Rd HQ">●</span>
    <span class="map-pin end" title="Harare Graniteside Hub">◆</span>
    <span class="map-label">Bulawayo → Gweru → Harare Highway</span>
  </div>`;
}

function notificationRows(rows: NotificationItem[]) {
  return `<div class="notification-list">
    ${rows.map(n =>
      `<div class="notification-row" data-search-item data-notif-id="${n.id}">
        <i class="notification-icon ${n.tone}">${icon(n.tone === 'red' ? 'bell' : n.tone === 'white' ? 'check' : 'driver')}</i>
        <div>
          <strong style="${n.read ? 'color:#8e96a1' : 'color:#f4f5f7'}">${n.title}</strong>
          <small>${n.time}</small>
        </div>
      </div>`
    ).join('')}
  </div>`;
}

// --- Content Builders ---
function adminContent() {
  const totalOrders = state.orders.length;
  const pendingCount = state.orders.filter(o => o.status === 'Pending').length;
  const inTransitCount = state.orders.filter(o => o.status === 'In Transit').length;
  const deliveredCount = state.orders.filter(o => o.status === 'Delivered').length;
  const cancelledCount = state.orders.filter(o => o.status === 'Cancelled').length;

  const deliveredPct = Math.round((deliveredCount / (totalOrders || 1)) * 100);
  const transitPct = Math.round((inTransitCount / (totalOrders || 1)) * 100);
  const pendingPct = Math.round((pendingCount / (totalOrders || 1)) * 100);
  const cancelledPct = Math.round((cancelledCount / (totalOrders || 1)) * 100);

  const values = [
    ['Total Suppliers', String(state.suppliers.length), 'Active Khami Rd partners', 'users', 'neutral'],
    ['Total Drivers', String(state.drivers.length), 'Class 2 Fleet Drivers', 'driver', 'neutral'],
    ['Total Orders', String(totalOrders), 'Live database', 'box', 'neutral'],
    ['Pending Orders', String(pendingCount), 'Awaiting dispatch', 'box', pendingCount > 0 ? 'red' : 'neutral'],
    ['In Transit', String(inTransitCount), 'On Midlands highway', 'truck', 'neutral'],
    ['Completed Deliveries', String(deliveredCount), 'Verified with e-POD', 'check', 'neutral'],
    ['Cancelled / Failed', String(cancelledCount), 'Audit flagged', 'cross', cancelledCount > 0 ? 'red' : 'neutral'],
  ];

  const inTransitOrders = state.orders.filter(o => o.status === 'In Transit');

  return `<section class="welcome-row" id="dashboard">
    <div>
      <p class="eyebrow">Treger Operations Command</p>
      <h1>Good day, Admin</h1>
      <p>Real-time operations across Khami Road Factory, Harare Depot & Midlands Fleet.</p>
    </div>
    <span class="date-chip">${icon('calendar')}<span id="todayLabel"></span></span>
  </section>

  <section class="stat-grid admin-stats">
    ${values.map(v => statCard(v[0], v[1], v[2], v[3], v[4])).join('')}
  </section>

  <section class="admin-overview-grid">
    <article class="panel chart-panel" id="order-overview">
      <div class="panel-heading">
        <div>
          <h2>Order Trends & Volume</h2>
          <p id="chartPeriodLabel">Past 7 days activity</p>
        </div>
        <button class="select-chip" id="chartPeriodToggle">Period: Last 7 days ⌄</button>
      </div>
      <div class="chart-area">
        <svg viewBox="0 0 560 190" preserveAspectRatio="none" aria-label="Orders over time">
          <defs>
            <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#ed1019" stop-opacity=".32"/>
              <stop offset="100%" stop-color="#ed1019" stop-opacity=".01"/>
            </linearGradient>
          </defs>
          <path class="chart-grid" d="M42 20H550M42 58H550M42 96H550M42 134H550M42 172H550"/>
          <path class="chart-area-fill" d="M42 148 125 117 208 82 291 100 374 115 457 68 550 76V172H42Z"/>
          <path class="chart-line" d="M42 148 125 117 208 82 291 100 374 115 457 68 550 76"/>
          <g class="chart-dots">
            <circle cx="42" cy="148" r="4"/><circle cx="125" cy="117" r="4"/><circle cx="208" cy="82" r="4"/><circle cx="291" cy="100" r="4"/>
            <circle cx="374" cy="115" r="4"/><circle cx="457" cy="68" r="4"/><circle cx="550" cy="76" r="4"/>
          </g>
        </svg>
        <div class="chart-axis">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
    </article>

    <article class="panel status-panel">
      <div class="panel-heading">
        <div>
          <h2>Order Status Distribution</h2>
          <p>${totalOrders} orders logged</p>
        </div>
      </div>
      <div class="donut-layout">
        <div class="donut-chart" style="background:conic-gradient(#ffffff 0 ${deliveredPct}%, #e30613 ${deliveredPct}% ${deliveredPct + transitPct}%, #8a94a6 ${deliveredPct + transitPct}% ${deliveredPct + transitPct + pendingPct}%, #2e3540 ${deliveredPct + transitPct + pendingPct}% 100%)">
          <div class="donut-center">
            <strong>${totalOrders}</strong>
            <span>Total Orders</span>
          </div>
        </div>
        <ul class="legend">
          <li><i class="dot" style="background:#ffffff;border:1px solid rgba(255,255,255,0.4)"></i><span>Delivered</span><b>${deliveredCount} <small>(${deliveredPct}%)</small></b></li>
          <li><i class="dot" style="background:#e30613"></i><span>In Transit</span><b>${inTransitCount} <small>(${transitPct}%)</small></b></li>
          <li><i class="dot" style="background:#8a94a6"></i><span>Pending</span><b>${pendingCount} <small>(${pendingPct}%)</small></b></li>
          <li><i class="dot" style="background:#2e3540"></i><span>Cancelled</span><b>${cancelledCount} <small>(${cancelledPct}%)</small></b></li>
        </ul>
      </div>
    </article>

    <article class="panel orders-panel" id="recent-orders">
      <div class="panel-heading">
        <div>
          <h2>Commercial Orders Queue</h2>
          <p>Click any row to inspect & manage status</p>
        </div>
        <button class="btn btn-treger" id="btnAdminAddOrder" style="padding:4px 9px;font-size:9px">+ Create Order</button>
      </div>
      ${ordersTable(state.orders)}
    </article>
  </section>

  <section class="admin-bottom-grid">
    <article class="panel quick-panel" id="quick-actions">
      <div class="panel-heading">
        <div><h2>Operations Actions</h2><p>Quick execution</p></div>
      </div>
      <div class="quick-actions">
        <button class="quick-action" id="btnActionAddSupplier">
          ${icon('users')}<span>+ Add Supplier</span>
        </button>
        <button class="quick-action" id="btnActionAddDriver">
          ${icon('driver')}<span>+ Add Driver</span>
        </button>
        <button class="quick-action" id="btnActionCreateOrder">
          ${icon('box')}<span>+ New Order</span>
        </button>
        <button class="quick-action" id="btnActionReports">
          ${icon('chart')}<span>Export Report</span>
        </button>
      </div>
    </article>

    <article class="panel deliveries-panel" id="live-deliveries">
      <div class="panel-heading">
        <div><h2>Highway Dispatches (Midlands Corridor)</h2><p>Live GPS positioning</p></div>
        <a class="text-link" href="/driver.html">Driver Console →</a>
      </div>
      <div class="live-content">
        ${mapMarkup()}
        <div class="delivery-list">
          ${inTransitOrders.length > 0
            ? inTransitOrders.map(o => `
                <div class="delivery-item" data-search-item data-order-id="${o.id}">
                  <span class="live-dot"></span>
                  <div>
                    <strong>${o.orderNumber}</strong>
                    <small>${o.driver} · ${o.location}</small>
                  </div>
                  <span>ETA: ${o.eta}</span>
                  ${statusPill(o.status)}
                </div>
              `).join('')
            : '<p style="color:#777;font-size:10px;padding:8px">No active dispatches currently on highway.</p>'
          }
        </div>
      </div>
    </article>

    <article class="panel notifications-panel" id="notifications">
      <div class="panel-heading">
        <div><h2>System Activity Logs</h2><p>Real-time platform events</p></div>
        <button class="text-link" id="btnClearNotifs" style="background:transparent;border:0;cursor:pointer">Mark read</button>
      </div>
      ${notificationRows(state.notifications)}
    </article>
  </section>`;
}

function supplierContent() {
  const values = [
    ['Catalogued SKUs', String(state.stock.length), 'Active manufacturing lines', 'box', 'neutral'],
    ['Total Customer Orders', String(state.orders.length), 'Khami Rd demand', 'clipboard', 'neutral'],
    ['Pending Factory Orders', String(state.orders.filter(o => o.status === 'Pending').length), 'Needs dispatch', 'clock', 'red'],
    ['Inbound Freight', String(state.orders.filter(o => o.status === 'In Transit').length), 'On route to Gate 3', 'truck', 'red'],
    ['Completed Deliveries', String(state.orders.filter(o => o.status === 'Delivered').length), 'Accepted at dock', 'check', 'white'],
  ];

  return `<section class="welcome-row" id="dashboard">
    <div>
      <p class="eyebrow">Supplier & Factory Material Portal</p>
      <h1>Welcome back, Supplier</h1>
      <p>Manage raw materials, production batches, and Khami Road Gate 3 deliveries.</p>
    </div>
    <span class="date-chip">${icon('calendar')}<span id="todayLabel"></span></span>
  </section>

  <section class="stat-grid supplier-stats">
    ${values.map(v => statCard(v[0], v[1], v[2], v[3], v[4])).join('')}
  </section>

  <section class="supplier-grid">
    <article class="panel" id="recent-orders">
      <div class="panel-heading">
        <div><h2>Manufactured Goods Demand</h2><p>Latest retailer orders across Zimbabwe</p></div>
        <button class="btn btn-treger" id="btnSupplierAddOrder" style="padding:4px 9px;font-size:9px">+ Dispatch Batch</button>
      </div>
      ${ordersTable(state.orders, true)}
    </article>

    <article class="panel stock-panel" id="stock-levels">
      <div class="panel-heading">
        <div><h2>Warehouse Stock Levels</h2><p>Click any line to adjust count</p></div>
        <button class="btn btn-ghost" id="btnAddStockItem" style="padding:4px 8px;font-size:9px">+ New SKU</button>
      </div>
      <div class="stock-list">
        ${state.stock.map(s => {
          const ratio = Math.min(100, Math.round((s.stockCount / (s.threshold * 2.5)) * 100));
          const isLow = s.stockCount <= s.threshold;
          return `<div class="stock-row" data-search-item data-stock-id="${s.id}" style="cursor:pointer" title="Click to adjust stock">
            <div class="stock-label">
              <strong>${s.name}</strong>
              <span>${s.amount}</span>
              <b class="${isLow ? 'low-stock' : ''}">${isLow ? 'Low Alert' : 'Healthy'}</b>
            </div>
            <div class="stock-track">
              <i class="${isLow ? 'low-stock' : ''}" style="width:${ratio}%"></i>
            </div>
          </div>`;
        }).join('')}
      </div>
    </article>
  </section>

  <section class="supplier-bottom-grid">
    <article class="panel" id="notifications">
      <div class="panel-heading">
        <div><h2>Factory Alerts & QC</h2><p>Recent inbound updates</p></div>
        <button class="text-link" id="btnClearNotifs" style="background:transparent;border:0;cursor:pointer">Clear all</button>
      </div>
      ${notificationRows(state.notifications)}
    </article>

    <article class="panel supplier-note">
      <div class="panel-heading">
        <div><h2>Khami Road Dock On-Time Rating</h2><p>Oct 2026 performance</p></div>
      </div>
      <div class="performance-stat">
        <strong>98.4%</strong>
        <span>SABS / ISO Compliant Quality Pass</span>
        <div class="performance-track"><i style="width:98.4%"></i></div>
        <small>↑ +2.8% on-time dock unloading rating</small>
      </div>
    </article>
  </section>`;
}

function driverContent() {
  const driverOrders = state.orders;
  const todayCount = driverOrders.length;
  const completedCount = driverOrders.filter(o => o.status === 'Delivered').length;
  const inTransitCount = driverOrders.filter(o => o.status === 'In Transit').length;
  const pendingCount = driverOrders.filter(o => o.status === 'Pending').length;

  const activeDelivery = driverOrders.find(o => o.status === 'In Transit') || driverOrders[0];

  const values = [
    ["Today's Route Stops", String(todayCount), 'Assigned manifest', 'truck', 'neutral'],
    ['Completed (e-POD)', String(completedCount), `${Math.round((completedCount / (todayCount || 1)) * 100)}% route complete`, 'check', 'white'],
    ['In Transit Now', String(inTransitCount), 'En route on highway', 'pin', 'red'],
    ['Pending Offload', String(pendingCount), 'Next waypoint', 'clock', pendingCount > 0 ? 'red' : 'neutral'],
  ];

  return `<section class="welcome-row" id="dashboard">
    <div>
      <p class="eyebrow">Driver In-Cab Delivery Console</p>
      <h1>Farai Moyo (Driver #042)</h1>
      <p>Vehicle: <strong style="color:#fff">UD Croner 12T (TRG-8893-ZW)</strong> · Departure: Khami Road 06:30</p>
    </div>
    <span class="date-chip">${icon('calendar')}<span id="todayLabel"></span></span>
  </section>

  <section class="stat-grid driver-stats">
    ${values.map(v => statCard(v[0], v[1], v[2], v[3], v[4])).join('')}
  </section>

  <section class="driver-grid">
    <article class="panel deliveries-table" id="today-deliveries">
      <div class="panel-heading">
        <div><h2>Active Manifest Manifest Stops</h2><p>Click stop to view details or sign e-POD</p></div>
        <button class="btn btn-treger" id="btnQuickSignPOD" style="padding:4px 9px;font-size:9px">✍️ Sign e-POD</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Destination</th><th>Status</th><th>ETA</th><th>Action</th></tr>
          </thead>
          <tbody>
            ${driverOrders.map(ord => `
              <tr data-order-id="${ord.id}" data-search-item class="order-table-row">
                <td><strong style="color:#fff;font-family:monospace">${ord.orderNumber}</strong></td>
                <td><strong>${ord.customer}</strong></td>
                <td style="color:#a6adb7">${ord.location}</td>
                <td>${statusPill(ord.status)}</td>
                <td style="color:#ffffff;font-weight:600">${ord.eta}</td>
                <td>
                  ${ord.status !== 'Delivered'
                    ? `<button class="table-action-pill btn-driver-sign" data-order-id="${ord.id}" style="background:#e30613;color:#ffffff;border-color:#e30613">Sign Delivery</button>`
                    : `<span style="font-size:8px;color:#ffffff;font-weight:600">✓ e-POD Signed</span>`
                  }
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </article>

    <article class="panel active-delivery" id="active-delivery">
      <div class="panel-heading">
        <div><h2>Active Navigation Checkpoint</h2><p>Telemetry active</p></div>
        <span class="live-indicator"><i></i> GPS Online</span>
      </div>
      ${mapMarkup()}
      <div class="active-order-meta">
        <div>
          <strong>${activeDelivery ? activeDelivery.orderNumber : '#TRG-1024'}</strong>
          <small>${activeDelivery ? `${activeDelivery.customer} · ${activeDelivery.location}` : 'Gweru Commercial Hub'}</small>
        </div>
        ${statusPill(activeDelivery ? activeDelivery.status : 'In Transit')}
      </div>
      <div class="eta-row">
        <span>Estimated arrival</span>
        <strong>${activeDelivery ? activeDelivery.eta : '14 min'}</strong>
      </div>
      <button class="navigation-button" id="btnLaunchNav" style="width:100%;border:0;cursor:pointer">
        ${icon('pin')}Open Highway Route Guidance ${icon('arrow')}
      </button>
    </article>
  </section>

  <section class="driver-bottom-grid">
    <article class="panel route-panel">
      <div class="panel-heading">
        <div><h2>Highway Progress (Bulawayo → Harare)</h2><p>Midlands Corridor Waypoints</p></div>
        <strong class="route-percentage">${state.routeProgress}%</strong>
      </div>
      <div class="route-track"><i style="width:${state.routeProgress}%"></i></div>
      <div class="route-stops">
        <span><i class="complete"></i>Bulawayo HQ</span>
        <span><i class="complete"></i>Shangani</span>
        <span><i class="${state.routeProgress < 100 ? 'current' : 'complete'}"></i>Gweru Hub</span>
        <span><i class="${state.routeProgress >= 100 ? 'complete' : ''}"></i>Harare Depot</span>
      </div>
    </article>

    <article class="panel" id="notifications">
      <div class="panel-heading">
        <div><h2>In-Cab Notifications & Telematics</h2><p>Control Room alerts</p></div>
        <button class="text-link" id="btnClearNotifs" style="background:transparent;border:0;cursor:pointer">Clear</button>
      </div>
      ${notificationRows(state.notifications)}
    </article>
  </section>`;
}

// --- Modals HTML Markup ---
function modalsMarkup() {
  return `
  <!-- Modal: Create Order -->
  <div class="modal-overlay" id="modalCreateOrder">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Create New Commercial Customer Order</h3>
        <button class="close-btn" data-close-modal>✕</button>
      </div>
      <form id="formCreateOrder">
        <div class="modal-body">
          <div class="form-grid">
            <div class="form-group full">
              <label>Customer Name / Retailer</label>
              <input required id="inpOrderCustomer" class="input-dark" placeholder="e.g. Halsteds Bulawayo Express" />
            </div>
            <div class="form-group">
              <label>Destination City</label>
              <input required id="inpOrderCity" class="input-dark" placeholder="e.g. Bulawayo, Gweru, Harare" />
            </div>
            <div class="form-group">
              <label>Delivery Address / Stand</label>
              <input required id="inpOrderAddress" class="input-dark" placeholder="e.g. Stand 104 Main St" />
            </div>
            <div class="form-group">
              <label>Division</label>
              <select id="inpOrderDivision" class="input-dark">
                <option value="Shumba Sheeting">Shumba Sheeting (Roofing)</option>
                <option value="Kango Cookware">Kango Cookware</option>
                <option value="Ingwe Plastics">Ingwe Plastics</option>
                <option value="ZGB Bags">ZGB Woven Bags</option>
                <option value="Monarch Steel">Monarch Steel</option>
                <option value="Treger Plastics">Treger Plastics</option>
              </select>
            </div>
            <div class="form-group">
              <label>Product Description</label>
              <input required id="inpOrderProduct" class="input-dark" placeholder="e.g. Shumba IBR 0.40mm Chromadek (6m)" />
            </div>
            <div class="form-group">
              <label>Quantity</label>
              <input required id="inpOrderQuantity" class="input-dark" placeholder="e.g. 200 Sheets or 500 Units" />
            </div>
            <div class="form-group">
              <label>Total Value (USD $)</label>
              <input required id="inpOrderAmount" type="number" min="1" class="input-dark" placeholder="e.g. 4200" />
            </div>
            <div class="form-group">
              <label>Assigned Fleet Driver</label>
              <select id="inpOrderDriver" class="input-dark">
                <option value="Farai Moyo">Farai Moyo — TRG-08 (UD 12T)</option>
                <option value="Tendai Chiwawa">Tendai Chiwawa — TRG-01 (Scania 30T)</option>
                <option value="Blessed Ndlovu">Blessed Ndlovu — TRG-04 (UD 14T)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Initial Status</label>
              <select id="inpOrderStatus" class="input-dark">
                <option value="Pending">Pending Approval</option>
                <option value="In Transit">Dispatch Immediately (In Transit)</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancel</button>
          <button type="submit" class="btn btn-treger">Create & Log Order</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Order Detail & Manage -->
  <div class="modal-overlay" id="modalOrderDetail">
    <div class="modal-card">
      <div class="modal-header">
        <h3 id="orderDetailTitle">Order Details</h3>
        <button class="close-btn" data-close-modal>✕</button>
      </div>
      <div class="modal-body" id="orderDetailBody">
        <!-- Injected dynamically -->
      </div>
      <div class="modal-footer" id="orderDetailFooter">
        <!-- Actions injected dynamically -->
      </div>
    </div>
  </div>

  <!-- Modal: Adjust Stock Quantity -->
  <div class="modal-overlay" id="modalAdjustStock">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Adjust Inventory Stock Level</h3>
        <button class="close-btn" data-close-modal>✕</button>
      </div>
      <form id="formAdjustStock">
        <input type="hidden" id="inpStockItemId" />
        <div class="modal-body">
          <div class="form-group">
            <label id="lblStockItemName">Product Name</label>
            <input required type="number" min="0" id="inpStockNewCount" class="input-dark" placeholder="Enter updated quantity" />
          </div>
          <div class="form-group">
            <label>Reason for Count Update</label>
            <select id="inpStockReason" class="input-dark">
              <option>Factory Production Batch Run Complete</option>
              <option>Warehouse Cycle Count Discrepancy</option>
              <option>Damaged Goods / Scrap Offload</option>
              <option>Returned Consignment Restocked</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancel</button>
          <button type="submit" class="btn btn-treger">Update Warehouse Stock</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Add New SKU -->
  <div class="modal-overlay" id="modalAddSKU">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Add New Manufactured Product SKU</h3>
        <button class="close-btn" data-close-modal>✕</button>
      </div>
      <form id="formAddSKU">
        <div class="modal-body">
          <div class="form-grid">
            <div class="form-group full">
              <label>Product Name</label>
              <input required id="inpSkuName" class="input-dark" placeholder="e.g. Kango 4-Piece Stew Pan Set" />
            </div>
            <div class="form-group">
              <label>Division</label>
              <select id="inpSkuDivision" class="input-dark">
                <option value="Kango">Kango Cookware</option>
                <option value="Ingwe">Ingwe Plastics</option>
                <option value="Shumba Sheeting">Shumba Sheeting</option>
                <option value="Monarch Steel">Monarch Steel</option>
                <option value="Treger Plastics">Treger Plastics</option>
                <option value="ZGB">ZGB Bags</option>
              </select>
            </div>
            <div class="form-group">
              <label>Unit Measure</label>
              <input required id="inpSkuUnit" class="input-dark" placeholder="e.g. units, sheets, rolls, bags" />
            </div>
            <div class="form-group">
              <label>Initial Warehouse Stock</label>
              <input required type="number" min="0" id="inpSkuStock" class="input-dark" placeholder="e.g. 500" />
            </div>
            <div class="form-group">
              <label>Low Stock Alert Threshold</label>
              <input required type="number" min="1" id="inpSkuThreshold" class="input-dark" placeholder="e.g. 100" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancel</button>
          <button type="submit" class="btn btn-treger">Add SKU to Catalog</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Add Supplier -->
  <div class="modal-overlay" id="modalAddSupplier">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Onboard Raw Material Supplier</h3>
        <button class="close-btn" data-close-modal>✕</button>
      </div>
      <form id="formAddSupplier">
        <div class="modal-body">
          <div class="form-grid">
            <div class="form-group full">
              <label>Company / Supplier Name</label>
              <input required id="inpSupName" class="input-dark" placeholder="e.g. Zimbabwe Mining Smelters" />
            </div>
            <div class="form-group">
              <label>Key Contact Person</label>
              <input required id="inpSupContact" class="input-dark" placeholder="e.g. Tendai Mpofu" />
            </div>
            <div class="form-group">
              <label>Material Category</label>
              <input required id="inpSupCategory" class="input-dark" placeholder="e.g. Aluminium / Resin / Steel" />
            </div>
            <div class="form-group full">
              <label>Telephone Contact</label>
              <input required id="inpSupPhone" class="input-dark" placeholder="+263 77 ..." />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancel</button>
          <button type="submit" class="btn btn-treger">Save Supplier</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Add Driver -->
  <div class="modal-overlay" id="modalAddDriver">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Register Logistics Fleet Driver</h3>
        <button class="close-btn" data-close-modal>✕</button>
      </div>
      <form id="formAddDriver">
        <div class="modal-body">
          <div class="form-grid">
            <div class="form-group full">
              <label>Driver Full Name</label>
              <input required id="inpDrvName" class="input-dark" placeholder="e.g. Nhamo Sithole" />
            </div>
            <div class="form-group">
              <label>Driver License Class</label>
              <select id="inpDrvLicense" class="input-dark">
                <option>Class 2 Heavy Vehicle</option>
                <option>Class 2 Articulated Superlink</option>
                <option>Class 4 Light Commercial</option>
              </select>
            </div>
            <div class="form-group">
              <label>Assigned Truck / Reg</label>
              <input required id="inpDrvTruck" class="input-dark" placeholder="e.g. TRG-15 (Isuzu 8T)" />
            </div>
            <div class="form-group full">
              <label>Driver Phone</label>
              <input required id="inpDrvPhone" class="input-dark" placeholder="+263 77 ..." />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancel</button>
          <button type="submit" class="btn btn-treger">Register Driver</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Capture e-POD (Sign on Glass) -->
  <div class="modal-overlay" id="modalCapturePOD">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Electronic Proof of Delivery (e-POD)</h3>
        <button class="close-btn" data-close-modal>✕</button>
      </div>
      <form id="formCapturePOD">
        <input type="hidden" id="podOrderId" />
        <div class="modal-body">
          <div id="podOrderSummary" style="font-size:11px;color:#cbd0d7;background:#0e1013;padding:10px;border-radius:6px;border:1px solid #23282f">
            <!-- Summary -->
          </div>
          <div class="form-group">
            <label>Receiver Name & Title</label>
            <input required id="inpPodRecipient" class="input-dark" placeholder="e.g. D. Mutasa (Receiving Manager)" value="D. Mutasa (Branch Manager)" />
          </div>
          <div class="form-group">
            <label>Condition Check</label>
            <label style="display:flex;align-items:center;gap:8px;font-size:10px;color:#c5cbd3;text-transform:none">
              <input type="checkbox" id="chkPodCondition" checked style="accent-color:#e30613" />
              <span>Goods inspected: No transit or strapping damage. Seals intact.</span>
            </label>
          </div>
          <div class="form-group">
            <div class="signature-actions">
              <label>Customer Signature (Sign Below)</label>
              <button type="button" class="btn btn-ghost" id="btnClearSig" style="padding:2px 7px;font-size:8px">Clear</button>
            </div>
            <div class="signature-box">
              <canvas id="podCanvas"></canvas>
              <span class="sig-hint">Sign with finger or mouse ✍️</span>
            </div>
          </div>
          <div class="form-group">
            <label>Delivery Notes (Optional)</label>
            <input id="inpPodNotes" class="input-dark" placeholder="e.g. Unloaded at Bay 2, offload completed on schedule." value="Offloaded at warehouse bay 2 clean." />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-ghost" data-close-modal>Cancel</button>
          <button type="submit" class="btn btn-treger">✓ Confirm & Seal e-POD</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal: Route Guidance GPS -->
  <div class="modal-overlay" id="modalRouteGPS">
    <div class="modal-card wide">
      <div class="modal-header">
        <h3>Midlands Highway Route Guidance (Bulawayo ⇄ Harare)</h3>
        <button class="close-btn" data-close-modal>✕</button>
      </div>
      <div class="modal-body">
        <div style="background:#0e1013;padding:12px;border-radius:8px;border:1px solid #23282f;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center">
          <div>
            <span style="font-size:9px;color:#8d95a0;display:block">CURRENT CHECKPOINT</span>
            <strong style="color:#ffffff;font-size:13px">Gweru Bypass</strong>
          </div>
          <div>
            <span style="font-size:9px;color:#8d95a0;display:block">DISTANCE TO DESTINATION</span>
            <strong style="color:#ff3b47;font-size:13px">12.4 km remaining</strong>
          </div>
          <div>
            <span style="font-size:9px;color:#8d95a0;display:block">CRUISING SPEED</span>
            <strong style="color:#f4f5f7;font-size:13px">78 km/h (Governed)</strong>
          </div>
        </div>
        <div style="display:grid;gap:8px;margin-top:6px;font-size:10px">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#171a20;border-radius:6px">
            <div><strong style="color:#ffffff">✓ Passed:</strong> Khami Road Factory Dispatch Gate</div>
            <span style="color:#777">Dep: 06:30</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#171a20;border-radius:6px">
            <div><strong style="color:#ffffff">✓ Passed:</strong> Tree Top & Shangani Tollgates</div>
            <span style="color:#777">Toll Paid (ZINARA e-Tag)</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#241618;border:1px solid #5a191f;border-radius:6px">
            <div><strong style="color:#ff4d55">▲ Approaching:</strong> Gweru Commercial Hub (Halsteds)</div>
            <span style="color:#ff4d55;font-weight:700">14 mins ETA</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#171a20;border-radius:6px">
            <div><strong style="color:#8d95a0">○ Next Waypoint:</strong> Kwekwe Industrial Corridor</div>
            <span style="color:#777">Est 11:45</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#171a20;border-radius:6px">
            <div><strong style="color:#8d95a0">○ Final Destination:</strong> Treger Graniteside Hub (Harare)</div>
            <span style="color:#777">Est 15:30</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a href="https://maps.google.com/?q=Gweru,+Zimbabwe" target="_blank" rel="noopener" class="btn btn-ghost">Google Maps Live ↗</a>
        <button type="button" class="btn btn-treger" data-close-modal>Close Navigation</button>
      </div>
    </div>
  </div>

  <!-- Modal: Reports & Analytics -->
  <div class="modal-overlay" id="modalReports">
    <div class="modal-card wide">
      <div class="modal-header">
        <h3>Treger Operational Performance & Audit Report</h3>
        <button class="close-btn" data-close-modal>✕</button>
      </div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center">
          <div style="background:#0e1013;padding:10px;border-radius:6px;border:1px solid #23282f">
            <span style="font-size:9px;color:#8d95a0;display:block">GROSS REVENUE (OCT)</span>
            <strong style="color:#f4f5f7;font-size:14px">$${state.orders.reduce((sum, o) => sum + o.amountUSD, 0).toLocaleString()}.00</strong>
          </div>
          <div style="background:#0e1013;padding:10px;border-radius:6px;border:1px solid #23282f">
            <span style="font-size:9px;color:#8d95a0;display:block">ON-TIME DELIVERY RATE</span>
            <strong style="color:#ffffff;font-size:14px">96.8%</strong>
          </div>
          <div style="background:#0e1013;padding:10px;border-radius:6px;border:1px solid #23282f">
            <span style="font-size:9px;color:#8d95a0;display:block">FLEET LOGISTICS DISTANCE</span>
            <strong style="color:#e2e8f0;font-size:14px">4,820 km</strong>
          </div>
        </div>
        <div style="margin-top:10px">
          <h4 style="font-size:10px;color:#a6adb7;margin:0 0 6px">EXPORT RAW DATA (CSV FORMAT)</h4>
          <textarea readonly class="input-dark" style="font-family:monospace;font-size:9px;height:120px">${
            'Order,Customer,Division,Status,Amount,Date,Driver\n' +
            state.orders.map(o => `"${o.orderNumber}","${o.customer}","${o.division}","${o.status}","${o.amountUSD}","${o.date}","${o.driver}"`).join('\n')
          }</textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-ghost" id="btnDownloadCSV">Download CSV File</button>
        <button type="button" class="btn btn-treger" data-close-modal>Done</button>
      </div>
    </div>
  </div>

  <!-- Notification Dropdown Drawer -->
  <div class="notifications-drawer" id="notificationsDrawer">
    <div class="drawer-header">
      <span>System Alerts (${state.notifications.filter(n => !n.read).length} unread)</span>
      <button class="text-link" id="btnDrawerMarkRead" style="background:transparent;border:0;cursor:pointer">Mark read</button>
    </div>
    <div class="drawer-body">
      ${notificationRows(state.notifications)}
    </div>
    <div class="drawer-footer">
      Treger SCADA & Telematics Gateway Online
    </div>
  </div>
  `;
}

// --- Render Master App ---
function renderApp() {
  if (!app) return;
  const pageTitle = role === 'admin' ? 'Admin Dashboard' : role === 'supplier' ? 'Supplier Dashboard' : 'Driver Dashboard';

  app.innerHTML = `
    <div class="dashboard-layout">
      ${sidebarMarkup()}
      <div class="workspace">
        ${topbarMarkup()}
        <main class="dashboard-content" aria-label="${pageTitle}">
          ${role === 'admin' ? adminContent() : role === 'supplier' ? supplierContent() : driverContent()}
          <div class="toast" id="toast" role="status"></div>
        </main>
      </div>
    </div>
    ${modalsMarkup()}
  `;

  attachEventListeners();
}

// --- Event Handlers & Modal Logic ---
let toastTimer = 0;
function showToast(message: string) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2800);
}

function openModal(id: string) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

function closeModal(id?: string) {
  if (id) {
    document.getElementById(id)?.classList.remove('open');
  } else {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  }
}

// Signature Pad Controller
let sigCanvas: HTMLCanvasElement | null = null;
let sigCtx: CanvasRenderingContext2D | null = null;
let isDrawing = false;
let sigHasInk = false;

function initSignatureCanvas() {
  sigCanvas = document.getElementById('podCanvas') as HTMLCanvasElement | null;
  if (!sigCanvas) return;
  sigCtx = sigCanvas.getContext('2d');
  if (!sigCtx) return;

  const rect = sigCanvas.getBoundingClientRect();
  sigCanvas.width = rect.width * 2;
  sigCanvas.height = rect.height * 2;
  sigCtx.scale(2, 2);
  sigCtx.lineWidth = 2.5;
  sigCtx.lineCap = 'round';
  sigCtx.lineJoin = 'round';
  const isLight = document.body.getAttribute('data-theme') === 'light';
  sigCtx.strokeStyle = isLight ? '#e30613' : '#ffffff';

  const getPos = (e: MouseEvent | TouchEvent) => {
    const r = sigCanvas!.getBoundingClientRect();
    if ('touches' in e && e.touches[0]) {
      return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    }
    return { x: (e as MouseEvent).clientX - r.left, y: (e as MouseEvent).clientY - r.top };
  };

  const start = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    isDrawing = true;
    sigHasInk = true;
    const pos = getPos(e);
    sigCtx!.beginPath();
    sigCtx!.moveTo(pos.x, pos.y);
  };

  const move = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    sigCtx!.lineTo(pos.x, pos.y);
    sigCtx!.stroke();
  };

  const stop = () => { isDrawing = false; };

  sigCanvas.addEventListener('mousedown', start);
  sigCanvas.addEventListener('mousemove', move);
  sigCanvas.addEventListener('mouseup', stop);
  sigCanvas.addEventListener('mouseleave', stop);

  sigCanvas.addEventListener('touchstart', start, { passive: false });
  sigCanvas.addEventListener('touchmove', move, { passive: false });
  sigCanvas.addEventListener('touchend', stop);

  document.getElementById('btnClearSig')?.addEventListener('click', () => {
    const r = sigCanvas!.getBoundingClientRect();
    sigCtx!.clearRect(0, 0, r.width, r.height);
    sigHasInk = false;
  });
}

function openOrderDetailsModal(orderId: string) {
  const ord = state.orders.find(o => o.id === orderId);
  if (!ord) return;

  const titleEl = document.getElementById('orderDetailTitle');
  const bodyEl = document.getElementById('orderDetailBody');
  const footerEl = document.getElementById('orderDetailFooter');

  if (titleEl) titleEl.textContent = `Order Details: ${ord.orderNumber}`;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#0e1013;padding:12px;border-radius:8px;border:1px solid #23282f;font-size:11px">
        <div>
          <span style="font-size:8px;color:#8d95a0;display:block">CUSTOMER / RETAILER</span>
          <strong style="color:#f4f5f7;font-size:13px">${ord.customer}</strong>
          <span style="color:#9da5af;display:block;font-size:10px">${ord.location}</span>
          <span style="color:#ffffff;display:block;font-size:10px;margin-top:4px">📞 ${ord.phone}</span>
        </div>
        <div>
          <span style="font-size:8px;color:#8d95a0;display:block">ORDER STATUS</span>
          <div style="margin:4px 0">${statusPill(ord.status)}</div>
          <span style="color:#9da5af;display:block;font-size:10px">Placed: ${ord.date}</span>
        </div>
      </div>

      <div style="background:#0e1013;padding:12px;border-radius:8px;border:1px solid #23282f;font-size:11px;display:grid;gap:6px">
        <span style="font-size:8px;color:#8d95a0;display:block">PRODUCT CONSIGNMENT</span>
        <div style="display:flex;justify-content:space-between;font-weight:600">
          <span style="color:#fff">${ord.product}</span>
          <span style="color:#ffffff;font-weight:700">${ord.quantity}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;color:#8d95a0">
          <span>Division: ${ord.division}</span>
          <strong style="color:#fff;font-size:12px">$${ord.amountUSD.toLocaleString()}.00 USD</strong>
        </div>
      </div>

      <div style="background:#0e1013;padding:12px;border-radius:8px;border:1px solid #23282f;font-size:11px;display:grid;gap:4px">
        <span style="font-size:8px;color:#8d95a0;display:block">FLEET & LOGISTICS</span>
        <div style="color:#fff">Driver: <strong>${ord.driver}</strong></div>
        <div style="color:#8d95a0;font-size:10px">Truck: ${ord.truck} · ETA: <strong style="color:#ffffff">${ord.eta}</strong></div>
      </div>

      ${ord.status === 'Delivered' ? `
        <div style="background:#1a1e24;padding:12px;border-radius:8px;border:1px solid #333a44;font-size:11px">
          <span style="font-size:8px;color:#ff4d55;font-weight:700;display:block">✓ VERIFIED ELECTRONIC PROOF OF DELIVERY (e-POD)</span>
          <div style="color:#fff;margin-top:4px">Signed by: <strong>${ord.podSignedBy || 'Authorized Receiver'}</strong></div>
          ${ord.podNotes ? `<div style="color:#cbd5e1;font-size:10px;font-style:italic;margin-top:2px">"${ord.podNotes}"</div>` : ''}
          ${ord.podSignature ? `
            <div style="margin-top:8px;background:#0d0f12;border-radius:6px;padding:6px;text-align:center">
              <img src="${ord.podSignature}" alt="Signature" style="max-height:60px;object-fit:contain" />
            </div>
          ` : '<div style="margin-top:6px;font-family:monospace;color:#ffffff;font-size:13px">D. Mutasa — Verified Sign</div>'}
        </div>
      ` : ''}
    `;
  }

  if (footerEl) {
    if (ord.status === 'Pending') {
      footerEl.innerHTML = `
        <button class="btn btn-ghost" data-close-modal>Close</button>
        <button class="btn btn-treger" onclick="window.dispatchOrder('${ord.id}')">Dispatch Now (In Transit)</button>
        <button class="btn btn-ghost" style="color:#ff747b" onclick="window.cancelOrder('${ord.id}')">Cancel</button>
      `;
    } else if (ord.status === 'In Transit') {
      footerEl.innerHTML = `
        <button class="btn btn-ghost" data-close-modal>Close</button>
        <button class="btn btn-treger" onclick="window.promptSignPOD('${ord.id}')">Capture e-POD (Deliver)</button>
        <button class="btn btn-ghost" style="color:#ff747b" onclick="window.cancelOrder('${ord.id}')">Cancel</button>
      `;
    } else {
      footerEl.innerHTML = `
        <button class="btn btn-ghost" data-close-modal>Close</button>
        <button class="btn btn-treger" onclick="window.printWaybill('${ord.id}')">Print Delivery Receipt</button>
      `;
    }
  }

  openModal('modalOrderDetail');
}

// Global window helpers for inline handlers
(window as any).dispatchOrder = (orderId: string) => {
  state.updateOrderStatus(orderId, 'In Transit');
  closeModal('modalOrderDetail');
  renderApp();
  showToast(`Order dispatched! Real-time telemetry tracking live on highway.`);
};

(window as any).cancelOrder = (orderId: string) => {
  if (confirm('Cancel this delivery order?')) {
    state.updateOrderStatus(orderId, 'Cancelled');
    closeModal('modalOrderDetail');
    renderApp();
    showToast(`Order has been marked cancelled.`);
  }
};

(window as any).promptSignPOD = (orderId: string) => {
  closeModal('modalOrderDetail');
  const ord = state.orders.find(o => o.id === orderId);
  if (!ord) return;

  const idInp = document.getElementById('podOrderId') as HTMLInputElement | null;
  const summaryEl = document.getElementById('podOrderSummary');
  if (idInp) idInp.value = ord.id;
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;font-weight:700;color:#fff">
        <span>${ord.orderNumber}</span>
        <span style="color:#ffffff;font-weight:700">${ord.quantity}</span>
      </div>
      <div style="color:#f4f5f7;margin-top:2px">${ord.customer} — ${ord.location}</div>
      <div style="color:#8d95a0;font-size:10px">${ord.product}</div>
    `;
  }
  openModal('modalCapturePOD');
  setTimeout(initSignatureCanvas, 100);
};

(window as any).printWaybill = (orderId: string) => {
  const ord = state.orders.find(o => o.id === orderId);
  if (!ord) return;
  alert(`TREGER OFFICIAL WAYBILL #${ord.orderNumber}\nCustomer: ${ord.customer}\nDestination: ${ord.location}\nAmount: $${ord.amountUSD}\nSigned e-POD by: ${ord.podSignedBy || 'Verified receiver'}\nStatus: DELIVERED AND ARCHIVED.`);
};

function attachEventListeners() {
  const dateLabel = document.getElementById('todayLabel');
  if (dateLabel) {
    dateLabel.textContent = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date());
  }

  // Sidebar mobile toggle
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const toggleSidebar = () => {
    sidebar?.classList.toggle('open');
    backdrop?.classList.toggle('visible');
  };
  document.getElementById('sidebarToggle')?.addEventListener('click', toggleSidebar);
  backdrop?.addEventListener('click', toggleSidebar);

  // Close modals
  document.querySelectorAll('[data-close-modal]').forEach(b => {
    b.addEventListener('click', () => closeModal());
  });

  // Table row clicks to inspect orders
  document.querySelectorAll('.btn-inspect-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = (btn as HTMLElement).dataset.orderId;
      if (id) openOrderDetailsModal(id);
    });
  });

  document.querySelectorAll('.order-table-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = (row as HTMLElement).dataset.orderId;
      if (id) openOrderDetailsModal(id);
    });
  });

  // Driver direct sign button
  document.querySelectorAll('.btn-driver-sign').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = (btn as HTMLElement).dataset.orderId;
      if (id) (window as any).promptSignPOD(id);
    });
  });

  // Quick Action Buttons
  document.getElementById('btnActionCreateOrder')?.addEventListener('click', () => openModal('modalCreateOrder'));
  document.getElementById('btnAdminAddOrder')?.addEventListener('click', () => openModal('modalCreateOrder'));
  document.getElementById('btnSupplierAddOrder')?.addEventListener('click', () => openModal('modalCreateOrder'));
  document.getElementById('btnQuickSignPOD')?.addEventListener('click', () => {
    const firstActive = state.orders.find(o => o.status === 'In Transit') || state.orders[0];
    if (firstActive) (window as any).promptSignPOD(firstActive.id);
  });

  document.getElementById('btnActionAddSupplier')?.addEventListener('click', () => openModal('modalAddSupplier'));
  document.getElementById('btnActionAddDriver')?.addEventListener('click', () => openModal('modalAddDriver'));
  document.getElementById('btnActionReports')?.addEventListener('click', () => openModal('modalReports'));
  document.getElementById('btnLaunchNav')?.addEventListener('click', () => openModal('modalRouteGPS'));
  document.getElementById('btnAddStockItem')?.addEventListener('click', () => openModal('modalAddSKU'));

  // Side-nav data-action handlers
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', (e) => {
      const action = (el as HTMLElement).dataset.action;
      if (action === 'open-create-order') { e.preventDefault(); openModal('modalCreateOrder'); }
      else if (action === 'open-suppliers') { e.preventDefault(); openModal('modalAddSupplier'); }
      else if (action === 'open-drivers') { e.preventDefault(); openModal('modalAddDriver'); }
      else if (action === 'open-inventory') { e.preventDefault(); openModal('modalAddSKU'); }
      else if (action === 'open-navigation') { e.preventDefault(); openModal('modalRouteGPS'); }
      else if (action === 'open-reports') { e.preventDefault(); openModal('modalReports'); }
      else if (action === 'open-pod') {
        e.preventDefault();
        const first = state.orders.find(o => o.status === 'In Transit') || state.orders[0];
        if (first) (window as any).promptSignPOD(first.id);
      }
      else if (action === 'open-safety') {
        e.preventDefault();
        alert('VEHICLE SAFETY CERTIFICATE #TRG-SAFE-2026\nTire pressure: PASS\nDual air brakes: PASS (>7.5 Bar)\nCargo seals: PASS (#TRG-SEAL-8893)\nFire extinguisher & triangles: PASS');
      }
      else if (action === 'toggle-notifications') {
        e.preventDefault();
        document.getElementById('notificationsDrawer')?.classList.toggle('open');
      }
    });
  });

  // Stock rows click to adjust
  document.querySelectorAll('[data-stock-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = (el as HTMLElement).dataset.stockId;
      const item = state.stock.find(s => s.id === id);
      if (!item) return;

      const idInp = document.getElementById('inpStockItemId') as HTMLInputElement | null;
      const nameLbl = document.getElementById('lblStockItemName');
      const countInp = document.getElementById('inpStockNewCount') as HTMLInputElement | null;

      if (idInp) idInp.value = item.id;
      if (nameLbl) nameLbl.textContent = `${item.name} (Current: ${item.stockCount} ${item.unit})`;
      if (countInp) countInp.value = String(item.stockCount);

      openModal('modalAdjustStock');
    });
  });

  // Form: Create Order
  document.getElementById('formCreateOrder')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cust = (document.getElementById('inpOrderCustomer') as HTMLInputElement).value;
    const city = (document.getElementById('inpOrderCity') as HTMLInputElement).value;
    const addr = (document.getElementById('inpOrderAddress') as HTMLInputElement).value;
    const div = (document.getElementById('inpOrderDivision') as HTMLSelectElement).value;
    const prod = (document.getElementById('inpOrderProduct') as HTMLInputElement).value;
    const qty = (document.getElementById('inpOrderQuantity') as HTMLInputElement).value;
    const amt = Number((document.getElementById('inpOrderAmount') as HTMLInputElement).value || '3500');
    const drv = (document.getElementById('inpOrderDriver') as HTMLSelectElement).value;
    const st = (document.getElementById('inpOrderStatus') as HTMLSelectElement).value as Order['status'];

    const newOrder = state.addOrder({
      customer: cust,
      location: `${city} (${addr})`,
      division: div,
      product: prod,
      quantity: qty,
      amountUSD: amt,
      status: st,
      driver: drv,
      truck: drv.includes('Farai') ? 'TRG-08 (UD 12T)' : drv.includes('Tendai') ? 'TRG-01 (Scania 30T)' : 'TRG-04 (UD 14T)',
      phone: '+263 77 123 4567',
    });

    closeModal('modalCreateOrder');
    renderApp();
    showToast(`Order ${newOrder.orderNumber} successfully logged for ${cust}!`);
  });

  // Form: Adjust Stock
  document.getElementById('formAdjustStock')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = (document.getElementById('inpStockItemId') as HTMLInputElement).value;
    const count = Number((document.getElementById('inpStockNewCount') as HTMLInputElement).value || '0');
    state.adjustStock(id, count);
    closeModal('modalAdjustStock');
    renderApp();
    showToast('Warehouse stock levels updated and verified.');
  });

  // Form: Add SKU
  document.getElementById('formAddSKU')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('inpSkuName') as HTMLInputElement).value;
    const div = (document.getElementById('inpSkuDivision') as HTMLSelectElement).value;
    const unit = (document.getElementById('inpSkuUnit') as HTMLInputElement).value;
    const stock = Number((document.getElementById('inpSkuStock') as HTMLInputElement).value || '100');
    const th = Number((document.getElementById('inpSkuThreshold') as HTMLInputElement).value || '20');

    state.stock.push({
      id: `stk-${Date.now()}`,
      name,
      division: div,
      amount: `${stock.toLocaleString()} ${unit}`,
      stockCount: stock,
      threshold: th,
      unit,
    });
    state.addNotification('white', `New product catalogued: ${name}`);
    state.save();

    closeModal('modalAddSKU');
    renderApp();
    showToast(`Product SKU "${name}" added to Treger catalog!`);
  });

  // Form: Add Supplier
  document.getElementById('formAddSupplier')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('inpSupName') as HTMLInputElement).value;
    const contact = (document.getElementById('inpSupContact') as HTMLInputElement).value;
    const cat = (document.getElementById('inpSupCategory') as HTMLInputElement).value;
    const phone = (document.getElementById('inpSupPhone') as HTMLInputElement).value;

    const newSup = state.addSupplier({ name, contact, category: cat, phone });
    closeModal('modalAddSupplier');
    renderApp();
    showToast(`Supplier ${newSup.name} onboarded with vendor code ${newSup.code}!`);
  });

  // Form: Add Driver
  document.getElementById('formAddDriver')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('inpDrvName') as HTMLInputElement).value;
    const lic = (document.getElementById('inpDrvLicense') as HTMLSelectElement).value;
    const truck = (document.getElementById('inpDrvTruck') as HTMLInputElement).value;
    const phone = (document.getElementById('inpDrvPhone') as HTMLInputElement).value;

    state.addDriver({ name, license: lic, truck, phone });
    closeModal('modalAddDriver');
    renderApp();
    showToast(`Driver ${name} assigned to fleet truck ${truck}!`);
  });

  // Form: Confirm e-POD
  document.getElementById('formCapturePOD')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const ordId = (document.getElementById('podOrderId') as HTMLInputElement).value;
    const recipient = (document.getElementById('inpPodRecipient') as HTMLInputElement).value || 'Authorized Receiver';
    const notes = (document.getElementById('inpPodNotes') as HTMLInputElement).value || 'Delivered in full';
    const sigData = sigCanvas ? sigCanvas.toDataURL('image/png') : '';

    state.updateOrderStatus(ordId, 'Delivered', { signature: sigData, signedBy: recipient, notes });
    closeModal('modalCapturePOD');
    renderApp();
    showToast(`✓ e-POD accepted! Delivery receipt confirmed by ${recipient}.`);
  });

  // Notifications Drawer Toggle & Clear
  const notifBtn = document.getElementById('notificationButton');
  const notifDrawer = document.getElementById('notificationsDrawer');
  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDrawer?.classList.toggle('open');
  });

  document.getElementById('btnClearNotifs')?.addEventListener('click', () => {
    state.markNotificationsRead();
    renderApp();
    showToast('All notifications marked as read.');
  });

  document.getElementById('btnDrawerMarkRead')?.addEventListener('click', () => {
    state.markNotificationsRead();
    renderApp();
    showToast('All notifications marked as read.');
  });

  // Download CSV
  document.getElementById('btnDownloadCSV')?.addEventListener('click', () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Order,Customer,Division,Status,Amount,Date,Driver\n' +
      state.orders.map(o => `"${o.orderNumber}","${o.customer}","${o.division}","${o.status}","${o.amountUSD}","${o.date}","${o.driver}"`).join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `treger_orders_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders CSV report downloaded successfully.');
  });

  // Search filter
  document.getElementById('dashboardSearch')?.addEventListener('input', (event) => {
    const query = (event.currentTarget as HTMLInputElement).value.trim().toLowerCase();
    document.querySelectorAll<HTMLElement>('[data-search-item]').forEach(item => {
      item.hidden = !!query && !item.textContent?.toLowerCase().includes(query);
    });
  });

  // Period Toggle on chart
  let periodState = 0;
  document.getElementById('chartPeriodToggle')?.addEventListener('click', () => {
    periodState = (periodState + 1) % 3;
    const labels = ['Period: Last 7 days ⌄', 'Period: Last 14 days ⌄', 'Period: This Month (Oct) ⌄'];
    const subLabels = ['Past 7 days activity', 'Past 14 days activity', 'October 2026 total volume'];
    const btn = document.getElementById('chartPeriodToggle');
    const sub = document.getElementById('chartPeriodLabel');
    if (btn) btn.textContent = labels[periodState];
    if (sub) sub.textContent = subLabels[periodState];
    showToast(`Chart period updated to ${labels[periodState].replace(' ⌄', '')}`);
  });

  // Theme Toggle Button
  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    const isCurrentLight = document.body.getAttribute('data-theme') === 'light';
    const nextTheme = isCurrentLight ? 'dark' : 'light';
    applyTheme(nextTheme);
    renderApp();
    showToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Mode`);
  });

  // Profile click
  document.getElementById('account')?.addEventListener('click', () => {
    showToast(`Logged in as ${roleInfo.title} (${roleInfo.subtitle}) · Khami Rd Plant HQ`);
  });
}

// Window Storage Sync across open browser tabs
window.addEventListener('storage', (e) => {
  if (e.key === THEME_STORAGE_KEY || e.key === 'treger_theme') {
    applyTheme(getStoredTheme());
    renderApp();
  }
  if (e.key && e.key.startsWith(STORAGE_PREFIX)) {
    state.orders = getStored('orders', INITIAL_ORDERS);
    state.stock = getStored('stock', INITIAL_STOCK);
    state.suppliers = getStored('suppliers', INITIAL_SUPPLIERS);
    state.drivers = getStored('drivers', INITIAL_DRIVERS);
    state.notifications = getStored('notifications', INITIAL_NOTIFICATIONS);
    state.routeProgress = getStored('route_progress', 68);
    renderApp();
  }
});

// Initial boot
renderApp();
