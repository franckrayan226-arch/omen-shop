const products = {
  mode: [
    {
      id: 1,
      slug: 'nike-air-max',
      image: '/products/air-max.png',
      name: 'Nike Air Force 1',
      brand: 'Nike',
      price: '65 000 FCFA',
      oldPrice: '75 000 FCFA',
      category: 'Sneakers',
      meta: '40-45',
      description: '"Sail" sneakers',
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
      image: '/products/ultra-boost.png',
      name: 'Adidas Ultra Boost',
      brand: 'Adidas',
      price: '60 000 FCFA',
      oldPrice: '70 000 FCFA',
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
      image: '/products/jordan-3.png',
      name: 'Air Jordan 3 Retro',
      brand: 'Jordan',
      price: '75 000 FCFA',
      isNew: true,
      category: 'Sneakers',
      meta: '39-45',
      description: '"White Cement" sneakers',
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
      image: '/products/nb-990.png',
      name: 'New Balance 990',
      brand: 'New Balance',
      price: '68 000 FCFA',
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
      image: '/products/casque.jpg',
      name: 'Casque Pro X',
      brand: 'OMEN Audio',
      price: '150 000 FCFA',
      oldPrice: '175 000 FCFA',
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
      image: '/products/keyboard.jpg',
      name: 'Clavier Mech',
      brand: 'OMEN Gear',
      price: '95 000 FCFA',
      isNew: true,
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
      image: '/products/smartwatch.jpg',
      name: 'Smart Watch',
      brand: 'OMEN Wear',
      price: '175 000 FCFA',
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
      image: '/products/camera.jpg',
      name: 'Cam 4K Pro',
      brand: 'OMEN Vision',
      price: '300 000 FCFA',
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
      slug: 'minoxidil-5',
      image: '/products/minoxidil.jpg',
      name: 'Minoxidil 5%',
      brand: 'OMEN Care',
      price: '15 000 FCFA',
      category: 'Capillaire',
      meta: '60 ml',
      description:
        'Solution capillaire clinique qui stimule la pousse, densifie visiblement et s’intègre à n’importe quelle routine.',
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
      id: 2,
      slug: 'dermaroller-05',
      image: '/products/dermaroller.jpg',
      name: 'Derma Roller 0.5mm',
      brand: 'OMEN Care',
      price: '12 000 FCFA',
      category: 'Outil',
      meta: 'Titane — 540 aiguilles',
      description:
        'Micro-aiguilles titane pour stimuler le cuir chevelu et maximiser l’absorption des sérums et du minoxidil.',
      colors: [
        { name: 'Titane', hex: '#8C8C8C', image: '' },
      ],
      sizes: [
        { size: 1, available: true },
      ],
    },
    {
      id: 3,
      slug: 'huile-a-barbe',
      image: '/products/huile-barbe.jpg',
      name: 'Huile à Barbe',
      brand: 'OMEN Care',
      price: '10 000 FCFA',
      isNew: true,
      category: 'Barbe',
      meta: '30 ml',
      description:
        'Huile nourrissante non grasse qui adoucit le poil, apaise la peau et laisse un finish net.',
      colors: [
        { name: 'Naturel', hex: '#C98A3D', image: '' },
      ],
      sizes: [
        { size: 30, available: true },
      ],
    },
    {
      id: 4,
      slug: 'shampooing-fortifiant',
      image: '/products/shampooing.png',
      name: 'Shampooing Fortifiant',
      brand: 'OMEN Care',
      price: '12 500 FCFA',
      oldPrice: '15 000 FCFA',
      category: 'Capillaire',
      meta: '300 ml',
      description:
        'Biotine + kératine pour renforcer la fibre, limiter la chute et garder un cuir chevelu sain.',
      colors: [
        { name: 'Standard', hex: '#4C5B3C', image: '' },
      ],
      sizes: [
        { size: 300, available: true },
      ],
    },
  ],
};

export const getProductsBySection = (section) => products[section] || [];

export const getProductBySlug = (section, slug) =>
  products[section]?.find((p) => p.slug === slug) || null;

export default products;
