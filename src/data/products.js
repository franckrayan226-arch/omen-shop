const products = [
  // ─── MODE ───────────────────────────────────────
  {
    id: 1,
    slug: 'nike-air-force-1',
    name: 'Nike Air Force 1',
    brand: 'Nike',
    section: 'mode',
    category: 'Sneakers',
    gender: 'Homme',
    price: '65 000 FCFA',
    oldPrice: '75 000 FCFA',
    isNew: false,
    image: '/products/air-max.png',
    meta: '40-45',
    description: '"Sail" sneakers — classique intemporel.',
    colors: [
      { name: 'Rouge Signal', hex: '#FF3B1F', image: '' },
      { name: 'Noir', hex: '#0A0A0A', image: '' },
      { name: 'Blanc', hex: '#FFFFFF', image: '' },
    ],
    sizes: [
      { size: 40, available: true },
      { size: 41, available: true },
      { size: 42, available: true },
      { size: 43, available: false },
      { size: 44, available: true },
      { size: 45, available: true },
    ],
  },
  {
    id: 2,
    slug: 'adidas-ultra-boost',
    name: 'Adidas Ultra Boost',
    brand: 'Adidas',
    section: 'mode',
    category: 'Running',
    gender: 'Homme',
    price: '60 000 FCFA',
    oldPrice: '70 000 FCFA',
    isNew: false,
    image: '/products/ultra-boost.png',
    meta: '39-44',
    description: '"Triple Black" running sneakers.',
    colors: [
      { name: 'Noir', hex: '#0A0A0A', image: '' },
      { name: 'Gris', hex: '#8C8C8C', image: '' },
      { name: 'Bleu Nuit', hex: '#1E3A5F', image: '' },
    ],
    sizes: [
      { size: 39, available: true },
      { size: 40, available: true },
      { size: 41, available: true },
      { size: 42, available: true },
      { size: 43, available: false },
      { size: 44, available: true },
    ],
  },
  {
    id: 3,
    slug: 'air-force-1-07',
    name: "Air Force 1 '07 Low",
    brand: 'Nike',
    section: 'mode',
    category: 'Sneakers',
    gender: 'Unisexe',
    price: '75 000 FCFA',
    oldPrice: null,
    isNew: true,
    image: 'https://res.cloudinary.com/ihflbjcg/image/upload/v1787673944/jordan-3.png',
    meta: '39-45',
    description: '"3D Swoosh" sneakers.',
    colors: [
      { name: 'Blanc Cassé', hex: '#F5F5F5', image: '' },
      { name: 'Noir', hex: '#0A0A0A', image: '' },
      { name: 'Rouge', hex: '#FF3B1F', image: '' },
    ],
    sizes: [
      { size: 39, available: true },
      { size: 40, available: true },
      { size: 41, available: true },
      { size: 42, available: true },
      { size: 43, available: true },
      { size: 44, available: true },
      { size: 45, available: true },
    ],
  },
  {
    id: 4,
    slug: 'new-balance-990',
    name: 'New Balance 990',
    brand: 'New Balance',
    section: 'mode',
    category: 'Lifestyle',
    gender: 'Homme',
    price: '68 000 FCFA',
    oldPrice: null,
    isNew: false,
    image: '/products/nb-990.png',
    meta: '41-47',
    description: '"Grey" lifestyle sneakers.',
    colors: [
      { name: 'Gris', hex: '#9E9E9E', image: '' },
      { name: 'Beige', hex: '#D6C6A5', image: '' },
      { name: 'Marine', hex: '#23365C', image: '' },
    ],
    sizes: [
      { size: 41, available: true },
      { size: 42, available: true },
      { size: 43, available: true },
      { size: 44, available: false },
      { size: 45, available: true },
      { size: 46, available: true },
      { size: 47, available: true },
    ],
  },

  // ─── ÉLECTRONIQUE ───────────────────────────────
  {
    id: 5,
    slug: 'casque-pro-x',
    name: 'Casque Pro X',
    brand: 'Sony',
    section: 'electronique',
    category: 'Audio',
    gender: 'Unisexe',
    price: '150 000 FCFA',
    oldPrice: '175 000 FCFA',
    isNew: false,
    image: '/products/casque.jpg',
    meta: 'Hi-Res Audio',
    description: 'Casque sans fil hi-fi, réduction de bruit active et son studio immersif.',
    colors: [
      { name: 'Noir', hex: '#0A0A0A', image: '' },
      { name: 'Blanc', hex: '#F5F5F5', image: '' },
    ],
    sizes: [
      { size: 128, available: true },
      { size: 256, available: true },
      { size: 512, available: false },
      { size: 1024, available: true },
    ],
  },
  {
    id: 6,
    slug: 'clavier-mech',
    name: 'Clavier Mech',
    brand: 'Logitech',
    section: 'electronique',
    category: 'Périphérique',
    gender: 'Unisexe',
    price: '95 000 FCFA',
    oldPrice: null,
    isNew: true,
    image: '/products/keyboard.jpg',
    meta: 'RGB Custom',
    description: 'Switchs mécaniques, rétroéclairage RGB custom et frame aluminium.',
    colors: [
      { name: 'Noir', hex: '#0A0A0A', image: '' },
      { name: 'Graphite', hex: '#3A3A3A', image: '' },
      { name: 'Argent', hex: '#C0C0C0', image: '' },
    ],
    sizes: [
      { size: 87, available: true },
      { size: 96, available: true },
      { size: 100, available: true },
    ],
  },
  {
    id: 7,
    slug: 'smart-watch',
    name: 'Smart Watch',
    brand: 'Apple',
    section: 'electronique',
    category: 'Connecté',
    gender: 'Unisexe',
    price: '175 000 FCFA',
    oldPrice: null,
    isNew: false,
    image: '/products/smartwatch.jpg',
    meta: 'Health+Sport',
    description: 'Suivi santé complet, GPS intégré et autonomie longue durée.',
    colors: [
      { name: 'Noir', hex: '#0A0A0A', image: '' },
      { name: 'Acier', hex: '#8C8C8C', image: '' },
      { name: 'Sable', hex: '#D6C6A5', image: '' },
    ],
    sizes: [
      { size: 40, available: true },
      { size: 42, available: true },
      { size: 44, available: true },
      { size: 46, available: false },
    ],
  },
  {
    id: 8,
    slug: 'cam-4k-pro',
    name: 'Cam 4K Pro',
    brand: 'Canon',
    section: 'electronique',
    category: 'Capture',
    gender: 'Unisexe',
    price: '300 000 FCFA',
    oldPrice: null,
    isNew: false,
    image: '/products/camera.jpg',
    meta: 'Pro Lens',
    description: 'Capteur 4K pro, stabilisation optique et objectif interchangeable.',
    colors: [
      { name: 'Noir', hex: '#0A0A0A', image: '' },
      { name: 'Graphite', hex: '#3A3A3A', image: '' },
    ],
    sizes: [
      { size: 128, available: true },
      { size: 256, available: true },
      { size: 512, available: true },
      { size: 1024, available: false },
    ],
  },

  // ─── BIEN-ÊTRE ──────────────────────────────────
  {
    id: 9,
    slug: 'minoxidil-5',
    name: 'Minoxidil 5%',
    brand: 'Rogaine',
    section: 'bienetre',
    category: 'Capillaire',
    gender: 'Homme',
    price: '15 000 FCFA',
    oldPrice: null,
    isNew: false,
    image: '/products/minoxidil.jpg',
    meta: '60 ml',
    description: 'Solution capillaire clinique qui stimule la pousse, densifie visiblement et s\'intègre à n\'importe quelle routine.',
    colors: [
      { name: 'Standard', hex: '#4C5B3C', image: '' },
    ],
    sizes: [
      { size: 30, available: true },
      { size: 60, available: true },
      { size: 90, available: false },
    ],
  },
  {
    id: 10,
    slug: 'dermaroller-05',
    name: 'Derma Roller 0.5mm',
    brand: 'Derma',
    section: 'bienetre',
    category: 'Outil',
    gender: 'Unisexe',
    price: '12 000 FCFA',
    oldPrice: null,
    isNew: false,
    image: '/products/dermaroller.jpg',
    meta: 'Titane — 540 aiguilles',
    description: 'Micro-aiguilles titane pour stimuler le cuir chevelu et maximiser l\'absorption des sérums et du minoxidil.',
    colors: [
      { name: 'Titane', hex: '#8C8C8C', image: '' },
    ],
    sizes: [
      { size: 1, available: true },
    ],
  },
  {
    id: 11,
    slug: 'huile-a-barbe',
    name: 'Huile à Barbe',
    brand: 'Beard',
    section: 'bienetre',
    category: 'Barbe',
    gender: 'Homme',
    price: '10 000 FCFA',
    oldPrice: null,
    isNew: true,
    image: '/products/huile-barbe.jpg',
    meta: '30 ml',
    description: 'Huile nourrissante non grasse qui adoucit le poil, apaise la peau et laisse un finish net.',
    colors: [
      { name: 'Naturel', hex: '#C98A3D', image: '' },
    ],
    sizes: [
      { size: 30, available: true },
    ],
  },
  {
    id: 12,
    slug: 'shampooing-fortifiant',
    name: 'Shampooing Fortifiant',
    brand: 'Kérastase',
    section: 'bienetre',
    category: 'Capillaire',
    gender: 'Unisexe',
    price: '12 500 FCFA',
    oldPrice: '15 000 FCFA',
    isNew: false,
    image: '/products/shampooing.png',
    meta: '300 ml',
    description: 'Biotine + kératine pour renforcer la fibre, limiter la chute et garder un cuir chevelu sain.',
    colors: [
      { name: 'Standard', hex: '#4C5B3C', image: '' },
    ],
    sizes: [
      { size: 300, available: true },
    ],
  },
];

// ── Normalisation ──────────────────────────────────
// " Nike  ", "nike", "NIKE" → "Nike"
// Ignore les différences de casse, espaces en trop
export const normalizeString = (str) => {
  if (!str) return '';
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
};

// Retourne le nom affichable (première occurrence telle quelle)
const brandDisplayMap = new Map();
const genderDisplayMap = new Map();

const buildDisplayMaps = () => {
  brandDisplayMap.clear();
  genderDisplayMap.clear();
  for (const p of products) {
    const norm = normalizeString(p.brand);
    if (norm && !brandDisplayMap.has(norm)) {
      brandDisplayMap.set(norm, p.brand.trim());
    }
    const gNorm = normalizeString(p.gender);
    if (gNorm && !genderDisplayMap.has(gNorm)) {
      genderDisplayMap.set(gNorm, p.gender.trim());
    }
  }
};
buildDisplayMaps();

// ── Helpers ────────────────────────────────────────
export const SECTIONS = [
  { id: 'mode', label: 'Mode', description: 'Sneakers & streetwear' },
  { id: 'bienetre', label: 'Bien-être', description: 'Grooming & soin' },
  { id: 'electronique', label: 'Électro', description: 'Audio · Wearables · Optique' },
];

export const getProductsBySection = (section) =>
  products.filter((p) => p.section === section);

export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug) || null;

// Marques uniques (normalisées) avec comptage
export const getBrands = (section) => {
  const filtered = section ? products.filter((p) => p.section === section) : products;
  const counts = new Map();
  for (const p of filtered) {
    const norm = normalizeString(p.brand);
    if (!norm) continue;
    counts.set(norm, (counts.get(norm) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([norm, count]) => ({
      id: norm,
      label: brandDisplayMap.get(norm) || norm,
      count,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

// Genres uniques (dynamiques depuis les produits)
export const getGenders = (section) => {
  const filtered = section ? products.filter((p) => p.section === section) : products;
  const counts = new Map();
  for (const p of filtered) {
    const norm = normalizeString(p.gender);
    if (!norm) continue;
    counts.set(norm, (counts.get(norm) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([norm, count]) => ({
      id: norm,
      label: genderDisplayMap.get(norm) || norm,
      count,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

export const getCategories = (section) => {
  const filtered = section ? products.filter((p) => p.section === section) : products;
  return [...new Set(filtered.map((p) => p.category))].sort();
};

export default products;
