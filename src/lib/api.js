import localProducts from '../data/products';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

let cached = null;

const flattenLocal = () => {
  const all = [];
  for (const section of ['mode', 'bienetre', 'electronique']) {
    (localProducts[section] || []).forEach((p) => all.push({ ...p, section }));
  }
  return all;
};

const normalizeProduct = (p) => {
  const fix = (u) => (u && u.startsWith('/uploads/') ? `${API_BASE}${u}` : u);
  return {
    ...p,
    image: fix(p.image),
    colors: (p.colors || []).map((c) => ({ ...c, image: fix(c.image) }))
  };
};

export async function loadProducts() {
  if (cached) return cached;
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        cached = data.products.map(normalizeProduct);
        return cached;
      }
    }
  } catch {
    // backend indisponible → fallback local
  }
  cached = flattenLocal();
  return cached;
}

export async function getProductsForSection(section) {
  const all = await loadProducts();
  return all.filter((p) => p.section === section);
}

export async function getProductBySlug(section, slug) {
  const all = await loadProducts();
  return all.find((p) => p.section === section && p.slug === slug) || null;
}

export async function trackVisit(path) {
  try {
    await fetch(`${API_BASE}/api/visits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path })
    });
  } catch {
    // silencieux
  }
}

export async function placeOrder({ productId, size, qty = 1, method = '' }) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, size, qty, method })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Commande impossible');
  return data;
}

export default API_BASE;