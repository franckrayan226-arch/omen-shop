const products = {
  mode: [
    {
      id: 1,
      slug: 'nike-air-max',
      image: '/products/vans.png',
      name: 'Nike Air Max',
      brand: 'Nike',
      price: '189€',
      category: 'Sneakers',
      meta: '40-45',
      description: '"White Cement" sneakers',
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
      image: '/products/football-boots.png',
      name: 'Adidas Ultra Boost',
      brand: 'Adidas',
      price: '175€',
      category: 'Running',
      meta: '39-44',
      description: '"Triple Black" running sneakers',
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
      slug: 'jordan-3-retro',
      image: '/products/vans.png',
      name: 'Air Jordan 3 Retro',
      brand: 'Jordan',
      price: '220€',
      category: 'Sneakers',
      meta: '39-45',
      description: '"Pink Cement" sneakers',
      colors: [
        { name: 'Pink Cement', hex: '#F1CCCC', image: '' },
        { name: 'Noir', hex: '#0A0A0A', image: '' },
        { name: 'Blanc', hex: '#FFFFFF', image: '' },
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
      image: '/products/football-boots.png',
      name: 'New Balance 990',
      brand: 'New Balance',
      price: '195€',
      category: 'Lifestyle',
      meta: '41-47',
      description: '"Grey" lifestyle sneakers',
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
  ],

  electronique: [
    {
      id: 1,
      slug: 'casque-pro-x',
      image: '/products/headphones.png',
      name: 'Casque Pro X',
      brand: 'OMEN Audio',
      price: '299€',
      category: 'Audio',
      meta: 'Hi-Res Audio',
      description:
        'Casque sans fil hi-fi, réduction de bruit active et son studio immersif.',
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
      id: 2,
      slug: 'clavier-mech',
      image: '/products/keyboard.png',
      name: 'Clavier Mech',
      brand: 'OMEN Gear',
      price: '189€',
      category: 'Périphérique',
      meta: 'RGB Custom',
      description:
        'Switchs mécaniques, rétroéclairage RGB custom et frame aluminium.',
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
      id: 3,
      slug: 'smart-watch',
      image: '/products/apple-watch.png',
      name: 'Smart Watch',
      brand: 'OMEN Wear',
      price: '349€',
      category: 'Connecté',
      meta: 'Health+Sport',
      description:
        'Suivi santé complet, GPS intégré et autonomie longue durée.',
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
      id: 4,
      slug: 'cam-4k-pro',
      image: '/products/camera.png',
      name: 'Cam 4K Pro',
      brand: 'OMEN Vision',
      price: '599€',
      category: 'Capture',
      meta: 'Pro Lens',
      description:
        'Capteur 4K pro, stabilisation optique et objectif interchangeable.',
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
  ],

  bienetre: [
    {
      id: 1,
      slug: 'huile-precieuse',
      image: '/products/bottle.png',
      name: 'Huile Précieuse',
      brand: 'OMEN Care',
      price: '45€',
      category: 'Soin',
      meta: 'Sérénité absolue',
      description:
        'Huile végétale précieuse aux actifs nourrissants, rituel de douceur quotidien.',
      colors: [
        { name: 'Ambre', hex: '#C98A3D', image: '' },
        { name: 'Ivoire', hex: '#F5F1EA', image: '' },
      ],
      sizes: [
        { size: 30, available: true },
        { size: 50, available: true },
        { size: 100, available: false },
        { size: 150, available: true },
      ],
    },
    {
      id: 2,
      slug: 'creme-regard',
      image: '/products/bottle.png',
      name: 'Crème Regard',
      brand: 'OMEN Care',
      price: '65€',
      category: 'Soin',
      meta: 'Éclat naturel',
      description:
        'Crème contour des yeux à l’éclat naturel, texture fondante et fraîche.',
      colors: [
        { name: 'Ivoire', hex: '#F5F1EA', image: '' },
        { name: 'Sauge', hex: '#7A8B5C', image: '' },
      ],
      sizes: [
        { size: 30, available: true },
        { size: 50, available: true },
        { size: 75, available: true },
      ],
    },
    {
      id: 3,
      slug: 'eau-de-soin',
      image: '/products/bottle.png',
      name: 'Eau de Soin',
      brand: 'OMEN Care',
      price: '38€',
      category: 'Grooming',
      meta: 'Pureté délicate',
      description:
        'Eau micellaire délicate, purifie sans dessécher, sensorialité apaisante.',
      colors: [
        { name: 'Verre', hex: '#C9D4C5', image: '' },
        { name: 'Sauge', hex: '#7A8B5C', image: '' },
      ],
      sizes: [
        { size: 50, available: true },
        { size: 100, available: true },
        { size: 150, available: false },
      ],
    },
    {
      id: 4,
      slug: 'masque-dore',
      image: '/products/bottle.png',
      name: 'Masque Doré',
      brand: 'OMEN Care',
      price: '85€',
      category: 'Soin',
      meta: 'Rituel royal',
      description:
        'Masque enrichi en or colloïdal, rituel d’exception pour une peau lumineuse.',
      colors: [
        { name: 'Or', hex: '#C9A227', image: '' },
        { name: 'Ivoire', hex: '#F5F1EA', image: '' },
      ],
      sizes: [
        { size: 50, available: true },
        { size: 100, available: true },
      ],
    },
  ],
};

export const getProductsBySection = (section) => products[section] || [];

export const getProductBySlug = (section, slug) =>
  products[section]?.find((p) => p.slug === slug) || null;

export default products;
