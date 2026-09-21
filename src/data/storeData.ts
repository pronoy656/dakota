export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  dimensions?: string;
  sku?: string;
  inStock?: boolean;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  shortDescription?: string;
  category: 'gang-sheet' | 'ready-to-press' | 'apparel';
  categoryTitle: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestseller?: boolean;
  badge?: string;
  images: string[];
  variants: ProductVariant[];
  tags: string[];
  fabricGuide?: string[];
  pressSettings?: {
    temp: string;
    pressure: string;
    time: string;
    peel: string;
  };
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  location: string;
  province?: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  productTitle?: string;
  productHandle?: string;
  category?: 'gang-sheet' | 'ready-to-press' | 'apparel' | 'durability' | 'shipping' | string;
  likes?: number;
  badge?: string;
  avatarColor?: string;
}

export const STORE_INFO = {
  name: "HDtees&tops",
  logo: "https://hdteesandtops.com/cdn/shop/files/embroidered_sewing_logo_patch_design_308dpi_2.png?v=1787372555&width=600",
  bannerImage: "https://cdn.shopify.com/s/files/1/0636/4685/9315/files/Banner_image.png?v=1785575547",
  tagline: "Custom DTF Transfers & Gang Sheets in Canada",
  subheading: "Premium Ready-to-Press Direct-to-Film Transfers with Ultra-Vibrant Colors and Superior Durability.",
  phone: "(548) 388-5228",
  phoneClean: "5483885228",
  email: "teesandtops@outlook.com",
  address: "113 Bodkin Road, Southwold, ON N0L 2G0, Canada",
  hours: "Mon – Fri: 9:00 AM – 6:00 PM | Sat: 10:00 AM – 4:00 PM | Sun: Closed",
  freeShippingThreshold: 150.0,
  currency: "CAD",
  currencySymbol: "$",
};

export const GANG_SHEET_SIZES = [
  { size: '22" x 12"', width: 22, height: 12, price: 7.50 },
  { size: '22" x 24"', width: 22, height: 24, price: 15.00 },
  { size: '22" x 36"', width: 22, height: 36, price: 22.50 },
  { size: '22" x 48"', width: 22, height: 48, price: 30.00 },
  { size: '22" x 60"', width: 22, height: 60, price: 37.50 },
  { size: '22" x 72"', width: 22, height: 72, price: 45.00 },
  { size: '22" x 84"', width: 22, height: 84, price: 52.50 },
  { size: '22" x 96"', width: 22, height: 96, price: 60.00 },
  { size: '22" x 108"', width: 22, height: 108, price: 67.50 },
  { size: '22" x 120"', width: 22, height: 120, price: 75.00 },
  { size: '22" x 144"', width: 22, height: 144, price: 90.00 },
  { size: '22" x 180"', width: 22, height: 180, price: 112.50 },
  { size: '22" x 240"', width: 22, height: 240, price: 150.00 },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "gang-sheet-builders",
    title: "Gang Sheet Builders",
    handle: "gang-sheet-builders",
    description: "Design or upload custom DTF gang sheets with live auto-nesting, zero waste, and automated 300 DPI validation.",
    image: "https://hdteesandtops.com/cdn/shop/files/E007AA72-51AE-499D-94CC-11D76D148DF1.png?v=1782618013&width=600",
    itemCount: 3,
  },
  {
    id: "dtf-transfers",
    title: "DTF Transfers",
    handle: "dtf-transfers",
    description: "Premium high-definition direct-to-film transfers ready to heat press onto any textile with zero weeding.",
    image: "https://hdteesandtops.com/cdn/shop/files/watermark_9f72b822-3bb7-4f6b-ba68-f5e62f950450.png?v=1783398580&width=600",
    itemCount: 10,
  },
  {
    id: "camping",
    title: "DTF Ready To Press Design",
    handle: "camping",
    description: "Trending outdoor, adventure, camping, and leopard-print pre-made heat transfers ready to press in 12s.",
    image: "https://hdteesandtops.com/cdn/shop/files/watermark_61f7c58d-39d3-4e64-9b71-f294636daa1a.png?v=1783398555&width=600",
    itemCount: 7,
  },
  {
    id: "custom-t-shirt",
    title: "Custom Apparel & Blanks",
    handle: "custom-t-shirt",
    description: "Premium heavy cotton t-shirts and fleece hoodies printed with crisp custom DTF graphics.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    itemCount: 2,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "7869635854387",
    title: "Build Your Custom DTF Gang Sheet",
    handle: "gang-sheet-builder",
    description: `Build your custom DTF gang sheet with our interactive visual builder tool! Combine multiple designs, logos, and artwork onto a single continuous roll to maximize cost efficiency. No weeding, no messy pretreatment, and vibrant full-color printing on any fabric.

### Key Features:
- **Interactive Visual Canvas**: Drag, drop, scale, rotate, and auto-nest your artwork.
- **Automated DPI & Quality Validation**: Ensures every graphic is sharp 300 DPI for pristine print output.
- **Zero Minimum Order Quantity**: Order from a small 22"x12" sheet up to a massive 22"x240" roll.
- **Commercial Grade Durability**: Tested for 50+ wash cycles without cracking or fading.`,
    shortDescription: "Interactive 2D canvas gang sheet builder. Upload multiple designs, auto-nest, and save up to 60%.",
    category: "gang-sheet",
    categoryTitle: "Gang Sheet Builders",
    price: 7.50,
    compareAtPrice: 9.99,
    rating: 5.0,
    reviewCount: 38,
    featured: true,
    bestseller: true,
    badge: "Most Popular",
    images: [
      "https://hdteesandtops.com/cdn/shop/files/E007AA72-51AE-499D-94CC-11D76D148DF1.png?v=1782618013&width=800",
      "https://hdteesandtops.com/cdn/shop/files/IMG-3443.png?v=1782852295&width=800"
    ],
    tags: ["Gang Sheet", "Custom DTF", "Builder", "Best Seller"],
    variants: GANG_SHEET_SIZES.map((g, idx) => ({
      id: `gs-builder-${idx}`,
      title: g.size,
      price: g.price,
      dimensions: g.size,
      sku: `GS-BLD-${g.width}x${g.height}`,
      inStock: true
    })),
    fabricGuide: ["100% Cotton", "100% Polyester", "Cotton/Poly Blends", "Denim & Canvas", "Tri-Blends", "Nylon & Spandex"],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm (60 PSI)",
      time: "10–15 Seconds",
      peel: "Cold Peel (Wait 20-30s before peeling)",
    }
  },
  {
    id: "7907253682227",
    title: "Upload Your Custom DTF Gang Sheet",
    handle: "upload-your-custom-dtf-gang-sheet",
    description: `Already have your gang sheet ready in Photoshop, Illustrator, or Canva? Simply upload your print-ready PNG/PDF file and we will print it with exceptional color accuracy and fast Ontario turnaround.

### Artwork Preparation:
- Submit transparent background PNG or PDF at 300 DPI.
- RGB color space is recommended.
- Ensure artwork is sized exactly to your selected sheet dimension (22" wide).`,
    shortDescription: "Upload your completed print-ready gang sheet file (300 DPI transparent PNG/PDF).",
    category: "gang-sheet",
    categoryTitle: "Gang Sheet Builders",
    price: 7.50,
    compareAtPrice: 9.99,
    rating: 4.9,
    reviewCount: 29,
    featured: true,
    badge: "Fast Upload",
    images: [
      "https://hdteesandtops.com/cdn/shop/files/E007AA72-51AE-499D-94CC-11D76D148DF1.png?v=1782618013&width=800",
      "https://hdteesandtops.com/cdn/shop/files/IMG-3443.png?v=1782852295&width=800"
    ],
    tags: ["Gang Sheet", "Upload Ready", "Custom DTF"],
    variants: GANG_SHEET_SIZES.map((g, idx) => ({
      id: `gs-upload-${idx}`,
      title: g.size,
      price: g.price,
      dimensions: g.size,
      sku: `GS-UPL-${g.width}x${g.height}`,
      inStock: true
    })),
    fabricGuide: ["100% Cotton", "100% Polyester", "Cotton/Poly Blends", "Denim & Canvas", "Tri-Blends", "Nylon & Spandex"],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm (60 PSI)",
      time: "10–15 Seconds",
      peel: "Cold Peel",
    }
  },
  {
    id: "7871161729075",
    title: "Rolling Gang Sheet Builder",
    handle: "rolling-gang-sheet-builder",
    description: `Need an extra-long or custom length continuous DTF roll? Our Rolling Gang Sheet Builder allows you to specify exact roll lengths with dynamic tiered discounts up to 300 inches long! Perfect for high-volume apparel brands, corporate merchandising, and event print runs.`,
    shortDescription: "Continuous rolling DTF gang sheets with live inch-by-inch custom length and bulk tiers.",
    category: "gang-sheet",
    categoryTitle: "Gang Sheet Builders",
    price: 15.00,
    rating: 5.0,
    reviewCount: 17,
    featured: true,
    badge: "Continuous Roll",
    images: [
      "https://hdteesandtops.com/cdn/shop/files/IMG-3443.png?v=1782852295&width=800",
      "https://hdteesandtops.com/cdn/shop/files/E007AA72-51AE-499D-94CC-11D76D148DF1.png?v=1782618013&width=800"
    ],
    tags: ["Rolling Gang Sheet", "Commercial", "Bulk DTF"],
    variants: [
      { id: "roll-24", title: '22" x 24" Roll', price: 15.00, inStock: true },
      { id: "roll-48", title: '22" x 48" Roll', price: 30.00, inStock: true },
      { id: "roll-120", title: '22" x 120" Roll', price: 75.00, inStock: true },
      { id: "roll-240", title: '22" x 240" Roll', price: 150.00, inStock: true },
      { id: "roll-360", title: '22" x 360" Master Roll', price: 220.00, inStock: true },
    ],
    fabricGuide: ["100% Cotton", "100% Polyester", "Cotton/Poly Blends", "Denim & Canvas", "Tri-Blends", "Nylon & Spandex"],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm",
      time: "10–15 Seconds",
      peel: "Cold Peel",
    }
  },
  {
    id: "7877387255859",
    title: "Streetwear Spooky Ghost Crew Sticker",
    handle: "streetwear-spooky-ghost-crew-sticker",
    description: `Ready-to-press DTF transfer featuring an edgy streetwear ghost with sunglasses and a beanie. Perfect for high-contrast dark apparel and modern street fashion.`,
    shortDescription: "Vibrant neon ghost streetwear sticker ready to press onto shirts and hoodies.",
    category: "ready-to-press",
    categoryTitle: "DTF Ready To Press Design",
    price: 1.16,
    compareAtPrice: 2.50,
    rating: 4.9,
    reviewCount: 14,
    featured: true,
    bestseller: true,
    badge: "Trending",
    images: [
      "/stickers/ghost.jpg"
    ],
    tags: ["Camping", "Ready to Press", "Leopard Print", "Adventure"],
    variants: [
      { id: "cl-pocket", title: 'Pocket Size (4" x 4")', price: 1.16, inStock: true },
      { id: "cl-youth", title: 'Youth Size (7.5" x 7.5")', price: 2.80, inStock: true },
      { id: "cl-adult", title: 'Adult Size (11" x 11")', price: 4.50, inStock: true },
      { id: "cl-plus", title: 'Adult Plus (12.5" x 12.5")', price: 5.80, inStock: true },
    ],
    fabricGuide: ["100% Cotton", "100% Polyester", "Cotton/Poly Blends", "Denim & Canvas"],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm",
      time: "12 Seconds",
      peel: "Cold Peel",
    }
  },
  {
    id: "7877387223091",
    title: "Neon Riot Skeleton Skater Sticker",
    handle: "neon-riot-skeleton-skater-sticker",
    description: `Rad neon skeleton doing a kickflip. High-fidelity DTF transfer with insane color pop designed for skate culture and alternative fashion brands.`,
    shortDescription: "Skater skeleton graphic with neon graffiti accents, ready to press.",
    category: "ready-to-press",
    categoryTitle: "DTF Ready To Press Design",
    price: 1.01,
    compareAtPrice: 2.20,
    rating: 4.8,
    reviewCount: 11,
    featured: true,
    images: [
      "/stickers/skeleton.jpg"
    ],
    tags: ["Camping", "Queen", "Floral", "Pink Leopard"],
    variants: [
      { id: "cq-pocket", title: 'Pocket Size (4" x 4")', price: 1.01, inStock: true },
      { id: "cq-youth", title: 'Youth Size (7.5" x 7.5")', price: 2.65, inStock: true },
      { id: "cq-adult", title: 'Adult Size (11" x 11")', price: 4.35, inStock: true },
    ],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm",
      time: "12 Seconds",
      peel: "Cold Peel",
    }
  },
  {
    id: "7877387190323",
    title: "Gothic Rose Knife & Scythe Sticker",
    handle: "gothic-rose-knife-scythe-sticker",
    description: `Intricate gothic streetwear aesthetic featuring a crossed tactical knife and grim reaper scythe surrounded by dark crimson roses.`,
    shortDescription: "Gothic knife and scythe with dark roses, perfect for alt fashion.",
    category: "ready-to-press",
    categoryTitle: "DTF Ready To Press Design",
    price: 1.23,
    compareAtPrice: 2.50,
    rating: 5.0,
    reviewCount: 9,
    featured: false,
    images: [
      "/stickers/knife_scythe.jpg"
    ],
    tags: ["Camping", "Campfire", "Pink Leopard"],
    variants: [
      { id: "cqc-pocket", title: 'Pocket Size (4" x 4")', price: 1.23, inStock: true },
      { id: "cqc-youth", title: 'Youth Size (7.5" x 7.5")', price: 2.90, inStock: true },
      { id: "cqc-adult", title: 'Adult Size (11" x 11")', price: 4.60, inStock: true },
    ],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm",
      time: "12 Seconds",
      peel: "Cold Peel",
    }
  },
  {
    id: "7877387092019",
    title: "Life Is Better In The Mountains Scenic Wilderness Badge",
    handle: "life-is-better-in-the-mountains-scenic-wilderness-badge",
    description: `Bold circular wilderness badge emblem featuring alpine pine trees, mountain silhouettes, and starry sky. High opacity white backing makes it look spectacular on both dark and light fabrics.`,
    shortDescription: "Circular wilderness badge DTF transfer with mountain silhouettes and pine trees.",
    category: "ready-to-press",
    categoryTitle: "DTF Ready To Press Design",
    price: 1.05,
    compareAtPrice: 2.30,
    rating: 4.9,
    reviewCount: 22,
    featured: true,
    bestseller: true,
    badge: "Staff Pick",
    images: [
      "https://hdteesandtops.com/cdn/shop/files/watermark_c85f8eb1-02c0-42c0-a4df-d92799c2cb5b.png?v=1783398445&width=800"
    ],
    tags: ["Mountains", "Wilderness", "Badge", "Nature"],
    variants: [
      { id: "mtn-pocket", title: 'Pocket Size (4" x 4")', price: 1.05, inStock: true },
      { id: "mtn-youth", title: 'Youth Size (7.5" x 7.5")', price: 2.75, inStock: true },
      { id: "mtn-adult", title: 'Adult Size (11" x 11")', price: 4.45, inStock: true },
    ],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm",
      time: "12 Seconds",
      peel: "Cold Peel",
    }
  },
  {
    id: "7877387026483",
    title: "Camping Life Watercolor Bear Double Exposure Forest Scene",
    handle: "camping-life-watercolor-bear-double-exposure-forest-scene",
    description: `Artistic watercolor double-exposure bear graphic with pine forest landscape and sunset hues inside the bear silhouette. Printed with high fidelity gradient rendering.`,
    shortDescription: "Artistic watercolor double exposure bear with forest landscape silhouette.",
    category: "ready-to-press",
    categoryTitle: "DTF Ready To Press Design",
    price: 1.06,
    compareAtPrice: 2.40,
    rating: 5.0,
    reviewCount: 18,
    featured: true,
    images: [
      "https://cdn.shopify.com/s/files/1/0636/4685/9315/files/watermark_bbbe5263-a4fd-4c0c-8125-66535c308055.png?v=1783398422"
    ],
    tags: ["Bear", "Watercolor", "Forest", "Wildlife"],
    variants: [
      { id: "bear-pocket", title: 'Pocket Size (4" x 4")', price: 1.06, inStock: true },
      { id: "bear-youth", title: 'Youth Size (7.5" x 7.5")', price: 2.80, inStock: true },
      { id: "bear-adult", title: 'Adult Size (11" x 11")', price: 4.50, inStock: true },
    ],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm",
      time: "12 Seconds",
      peel: "Cold Peel",
    }
  },
  {
    id: "7877386895411",
    title: "Camp Life Leopard Serape Campfire Marshmallow Roasting Design",
    handle: "camp-life-leopard-serape-campfire-marshmallow-roasting-design",
    description: `Western serape pattern infused with leopard textures, roaring campfire, and golden toasted marshmallows on sticks.`,
    shortDescription: "Western serape texture and leopard pattern campfire roasting transfer.",
    category: "ready-to-press",
    categoryTitle: "DTF Ready To Press Design",
    price: 0.65,
    compareAtPrice: 1.80,
    rating: 4.7,
    reviewCount: 8,
    images: [
      "https://cdn.shopify.com/s/files/1/0636/4685/9315/files/watermark_b4f41960-231f-45d6-a3da-7ff7e9da25c2.png?v=1783398376"
    ],
    tags: ["Camp Life", "Serape", "Marshmallow"],
    variants: [
      { id: "serape-pocket", title: 'Pocket Size (4" x 4")', price: 0.65, inStock: true },
      { id: "serape-youth", title: 'Youth Size (7.5" x 7.5")', price: 2.20, inStock: true },
      { id: "serape-adult", title: 'Adult Size (11" x 11")', price: 3.90, inStock: true },
    ],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm",
      time: "12 Seconds",
      peel: "Cold Peel",
    }
  },
  {
    id: "7877385388083",
    title: "CAMPING Vintage Retro Typography & Tent Design",
    handle: "camping",
    description: `Retro vintage 70s sunset striped camping typography with A-frame tent silhouette and mountain pines.`,
    shortDescription: "Retro 70s striped camping typography with A-frame tent emblem.",
    category: "ready-to-press",
    categoryTitle: "DTF Ready To Press Design",
    price: 1.37,
    compareAtPrice: 2.80,
    rating: 4.9,
    reviewCount: 16,
    images: [
      "https://cdn.shopify.com/s/files/1/0636/4685/9315/files/watermark_f749f6fc-f81a-4cb8-9e1e-76600f6fa41e.png?v=1783398140"
    ],
    tags: ["Retro Camping", "Vintage", "Typography"],
    variants: [
      { id: "camp-pocket", title: 'Pocket Size (4" x 4")', price: 1.37, inStock: true },
      { id: "camp-youth", title: 'Youth Size (7.5" x 7.5")', price: 2.95, inStock: true },
      { id: "camp-adult", title: 'Adult Size (11" x 11")', price: 4.75, inStock: true },
    ],
    pressSettings: {
      temp: "300°F (150°C)",
      pressure: "Medium to Firm",
      time: "12 Seconds",
      peel: "Cold Peel",
    }
  },
  {
    id: "apparel-tshirt-custom",
    title: "Custom Heavy Cotton Crewneck T-Shirt with DTF Print",
    handle: "custom-heavy-cotton-tshirt",
    description: `Premium 100% ring-spun heavy cotton t-shirt customized with your high-definition DTF print placement. Available in multiple modern colorways.`,
    shortDescription: "Ultra-comfortable 100% ring-spun cotton tee with high-definition custom DTF printing.",
    category: "apparel",
    categoryTitle: "Custom T-shirt",
    price: 18.50,
    compareAtPrice: 24.00,
    rating: 5.0,
    reviewCount: 31,
    featured: true,
    badge: "Custom Apparel",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Apparel", "T-Shirt", "Cotton", "Custom Print"],
    variants: [
      { id: "tee-s", title: "Small (S)", price: 18.50, inStock: true },
      { id: "tee-m", title: "Medium (M)", price: 18.50, inStock: true },
      { id: "tee-l", title: "Large (L)", price: 18.50, inStock: true },
      { id: "tee-xl", title: "Extra Large (XL)", price: 18.50, inStock: true },
      { id: "tee-2xl", title: "2X-Large (2XL)", price: 21.00, inStock: true },
    ]
  },
  {
    id: "apparel-hoodie-custom",
    title: "Custom Fleece Pullover Hoodie with DTF Print",
    handle: "custom-fleece-pullover-hoodie",
    description: `Cozy 8.5 oz cotton/poly fleece hoodie with double-lined hood and matching drawcords. Customized with your custom front or back DTF print.`,
    shortDescription: "Plush cotton-poly fleece pullover hoodie printed with crisp custom DTF artwork.",
    category: "apparel",
    categoryTitle: "Hoodies",
    price: 34.00,
    compareAtPrice: 42.00,
    rating: 4.9,
    reviewCount: 26,
    featured: true,
    badge: "Winter Warmth",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Hoodie", "Fleece", "Apparel", "Warm"],
    variants: [
      { id: "hd-s", title: "Small (S)", price: 34.00, inStock: true },
      { id: "hd-m", title: "Medium (M)", price: 34.00, inStock: true },
      { id: "hd-l", title: "Large (L)", price: 34.00, inStock: true },
      { id: "hd-xl", title: "Extra Large (XL)", price: 34.00, inStock: true },
      { id: "hd-2xl", title: "2X-Large (2XL)", price: 38.00, inStock: true },
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Jessica M.",
    role: "Screen Shop Owner",
    location: "Toronto, ON",
    province: "ON",
    rating: 5,
    date: "2 days ago",
    title: "Best DTF Gang Sheets in Ontario — Crisp details & insane stretch!",
    body: "The online gang sheet builder saved us hours of manual vector nesting. We ordered a 22\"x120\" roll for a 200-piece marathon runner jersey order. Every neon gradient printed razor sharp, zero bleed, and pressed like a dream at 300°F. Shipped from Southwold to Toronto in under 48 hours!",
    verified: true,
    productTitle: "Build Your Custom DTF Gang Sheet",
    productHandle: "gang-sheet-builder",
    category: "gang-sheet",
    likes: 38,
    badge: "200+ Shirts Pressed",
    avatarColor: "from-blue-600 to-indigo-600"
  },
  {
    id: "rev-2",
    author: "David R.",
    role: "Streetwear Brand Founder",
    location: "London, ON",
    province: "ON",
    rating: 5,
    date: "1 week ago",
    title: "Game changer for heavy fleece hoodies — 100% opaque white underbase",
    body: "We produce 450 GSM heavyweight streetwear hoodies in black and espresso brown. Traditional vinyl felt like cardboard and screen printing small batches wasn't viable. HDtees&tops DTF transfers have an ultra-soft hand feel with an ultra-solid white underbase that never cracks. Tested 40+ wash cycles with zero peeling.",
    verified: true,
    productTitle: "Rolling Gang Sheet Builder",
    productHandle: "rolling-gang-sheet-builder",
    category: "gang-sheet",
    likes: 45,
    badge: "Streetwear Pro",
    avatarColor: "from-red-600 to-amber-600"
  },
  {
    id: "rev-3",
    author: "Sophie T.",
    role: "Etsy Creator & Merch Decorator",
    location: "Calgary, AB",
    province: "AB",
    rating: 5,
    date: "2 weeks ago",
    title: "Ready-to-Press camping transfers are our top seller this season!",
    body: "Ordered 60 ready-to-press Camp Life and Mountain designs for our regional craft markets. The leopard print textures and double-exposure watercolor gradients are flawless. Pressed in 12 seconds with clean cold peel. Sold out our entire batch in one weekend!",
    verified: true,
    productTitle: "Camp Life Leopard Print Camper Mountain Sunset",
    productHandle: "camp-life-leopard-print-camper-mountain-sunset",
    category: "ready-to-press",
    likes: 29,
    badge: "Top Seller",
    avatarColor: "from-emerald-600 to-teal-600"
  },
  {
    id: "rev-4",
    author: "Marcus L.",
    role: "Commercial DTG & Print Studio",
    location: "Vancouver, BC",
    province: "BC",
    rating: 5,
    date: "3 weeks ago",
    title: "High-density Japanese ink quality that beats local competitors",
    body: "We uploaded our own print-ready gang sheet with fine 0.5pt typography and intricate halftone blends. Everything printed with 100% fidelity and zero ink banding. The TPU adhesive powder melts uniformly without rubbery halo borders. Highly recommend HDtees&tops to any Canadian apparel professional.",
    verified: true,
    productTitle: "Upload Your Custom DTF Gang Sheet",
    productHandle: "upload-your-custom-dtf-gang-sheet",
    category: "gang-sheet",
    likes: 52,
    badge: "Print Shop Verified",
    avatarColor: "from-purple-600 to-pink-600"
  },
  {
    id: "rev-5",
    author: "Chloe & Liam K.",
    role: "Boutique Fashion Startup",
    location: "Montreal, QC",
    province: "QC",
    rating: 5,
    date: "3 weeks ago",
    title: "Fastest Canadian turnaround and flawless color calibration",
    body: "Customer service helped us verify our ICC color profiles before printing. Our pastel and metallic-look shades came out vibrant on both 100% ring-spun cotton and nylon blends. Reordering our third 240-inch roll this week!",
    verified: true,
    productTitle: "Rolling Gang Sheet Builder",
    productHandle: "rolling-gang-sheet-builder",
    category: "gang-sheet",
    likes: 21,
    badge: "Verified Re-order",
    avatarColor: "from-cyan-600 to-blue-600"
  },
  {
    id: "rev-6",
    author: "Alexandre G.",
    role: "Sports Team & Activewear Decorator",
    location: "Hamilton, ON",
    province: "ON",
    rating: 5,
    date: "1 month ago",
    title: "Zero dye migration on 100% polyester athletic jerseys",
    body: "Polyester sublimation dye migration used to ruin our white team numbers on red jerseys. HDtees&tops transfers have a built-in block-out backing that keeps our graphics pure bright white with zero pink bleed after 50+ matches. 10/10 recommended!",
    verified: true,
    productTitle: "Build Your Custom DTF Gang Sheet",
    productHandle: "gang-sheet-builder",
    category: "durability",
    likes: 34,
    badge: "Activewear Tested",
    avatarColor: "from-amber-600 to-orange-600"
  },
  {
    id: "rev-7",
    author: "Nathalie B.",
    role: "Apparel Brand Owner",
    location: "Mississauga, ON",
    province: "ON",
    rating: 5,
    date: "1 month ago",
    title: "Direct pickup & lightning fast shipping across Southwestern Ontario",
    body: "Having a dedicated facility right in Southwold, Ontario means our rush apparel orders are printed and dispatched the exact same day. Free shipping on $150+ CAD orders is a huge bonus for our growing margins.",
    verified: true,
    productTitle: "Custom Heavy Cotton Crewneck T-Shirt",
    productHandle: "custom-heavy-cotton-tshirt",
    category: "shipping",
    likes: 19,
    badge: "Ontario Local",
    avatarColor: "from-rose-600 to-red-600"
  },
  {
    id: "rev-8",
    author: "Kendra W.",
    role: "Outdoor Merch Crafter",
    location: "Windsor, ON",
    province: "ON",
    rating: 5,
    date: "1 month ago",
    title: "Presses seamlessly onto canvas tote bags and denim jackets",
    body: "Tested the Life Is Better In The Mountains badge on heavy 14oz canvas tote bags and vintage denim jackets. It adhered with zero peeling at the corners and feels integrated right into the fabric. My customers rave about the quality!",
    verified: true,
    productTitle: "Life Is Better In The Mountains Scenic Wilderness Badge",
    productHandle: "life-is-better-in-the-mountains-scenic-wilderness-badge",
    category: "ready-to-press",
    likes: 27,
    badge: "Canvas & Denim",
    avatarColor: "from-violet-600 to-indigo-600"
  }
];

export const FAQS = [
  {
    category: "DTF Printing",
    q: "What is DTF (Direct-to-Film) Printing?",
    a: "DTF (Direct-to-Film) printing is a digital textile printing breakthrough where ultra-vibrant water-based inks are printed directly onto specialized PET release film. A solid white ink underbase and hot-melt TPU adhesive powder are applied and heat-cured. You simply heat press the film onto any garment for 12 seconds with zero weeding and soft hand-feel."
  },
  {
    category: "Orders & Pricing",
    q: "Is there a minimum order quantity (MOQ)?",
    a: "No! There are zero minimum order requirements at HDtees&tops. You can order a single 22\"x12\" gang sheet or pocket transfer, or hundreds of feet of rolling gang sheets with automatic volume tier discounts."
  },
  {
    category: "Artwork & Files",
    q: "What file formats and DPI resolution are recommended?",
    a: "We recommend PNG files with a transparent background at 300 DPI. We also support vector PDF, AI, PSD, and SVG files. Our online builder automatically checks resolution and flags low-res images to guarantee maximum print clarity."
  },
  {
    category: "Fabric Compatibility",
    q: "What fabrics can DTF transfers be applied to?",
    a: "Our DTF transfers work flawlessly on 100% Cotton, 100% Polyester, Cotton/Poly Blends, Heavy Canvas, Denim, Tri-Blends, Spandex, Leather, and Performance Activewear."
  },
  {
    category: "Heat Pressing",
    q: "What heat press temperature and time should I use?",
    a: "Press at 300°F (150°C) with medium to firm pressure (60 PSI) for 10–15 seconds. Allow the film to cool down completely (Cold Peel), gently peel the carrier sheet, and finish with a 5-second post-press with parchment or Teflon paper."
  },
  {
    category: "Shipping & Turnaround",
    q: "How fast is order processing and shipping across Canada?",
    a: "Standard production turnaround is 1–2 business days from our Southwold, Ontario facility. Standard shipping across Canada typically takes 2–4 business days, and Express 1–2 days. Orders over $150 CAD receive Free Standard Shipping."
  }
];

export const FABRICS_LIST = [
  { 
    name: "100% Cotton", 
    tag: "T-Shirts, Totes & Hoodies",
    temp: "300°F (150°C)",
    time: "12–15s",
    pressure: "Medium-Firm (45–55 PSI)",
    prePress: "5s moisture evacuation press",
    postPress: "5s seal press with parchment sheet",
    peel: "Cold Peel (15–20s cool)",
    washRating: "60+ Industrial Washes",
    stretchRating: "High Elastic Recovery",
    handFeel: "Ultra-Soft & Seamless",
    idealBlanks: "Bella+Canvas 3001, Comfort Colors 1717, AS Colour",
    desc: "Bonds deeply into natural cotton fibers with ultra-soft hand feel, zero bleeding, and deep rich blacks." 
  },
  { 
    name: "100% Polyester", 
    tag: "Jerseys & Activewear",
    temp: "280°F (140°C)",
    time: "10–12s",
    pressure: "Medium (40 PSI)",
    prePress: "3s moisture evacuation",
    postPress: "3s finish press with silicone barrier",
    peel: "Cold Peel (20s cool)",
    washRating: "50+ Athletic Washes",
    stretchRating: "4-Way High Elastic Flex",
    handFeel: "Breathable & Non-Restrictive",
    idealBlanks: "Sport-Tek ST350, A4 N3142, Augusta Sportswear",
    desc: "Zero dye migration with our proprietary block-out adhesive layer. Stays vibrant without scorching." 
  },
  { 
    name: "Cotton / Poly Blends", 
    tag: "Everyday Sweats & Tees",
    temp: "300°F (150°C)",
    time: "12s",
    pressure: "Medium-Firm (50 PSI)",
    prePress: "4s pre-press",
    postPress: "5s parchment matte finish",
    peel: "Cold Peel (15s cool)",
    washRating: "60+ Machine Washes",
    stretchRating: "Superior Flexibility",
    handFeel: "Plush Fleece & Smooth Finish",
    idealBlanks: "Next Level 6210, Gildan 18500, Bella 3413",
    desc: "Maximum flexibility and stretch recovery on everyday 50/50 and poly-blend fleece garment blanks." 
  },
  { 
    name: "Denim & Heavy Canvas", 
    tag: "Jackets, Aprons & Bags",
    temp: "310°F (155°C)",
    time: "15s",
    pressure: "Heavy (60+ PSI)",
    prePress: "8s to flatten thick weave & seams",
    postPress: "5s high-pressure lock press",
    peel: "Cold Peel (30s cool)",
    washRating: "75+ Heavy-Duty Cycles",
    stretchRating: "Reinforced Abrasion Shield",
    handFeel: "Rugged Commercial Grade",
    idealBlanks: "Carhartt Duck, Port Authority Canvas, Heavy Tote Bags",
    desc: "Penetrates coarse canvas weaves with extreme peel adhesion that resists abrasion and rough wear." 
  },
  { 
    name: "Tri-Blends & Modal", 
    tag: "Ultra-Lightweight Blanks",
    temp: "290°F (145°C)",
    time: "10s",
    pressure: "Light-Medium (35–40 PSI)",
    prePress: "3s light iron pre-press",
    postPress: "3s parchment finish",
    peel: "Cold Peel (15s cool)",
    washRating: "50+ Gentle Washes",
    stretchRating: "Ultra Drape & Flex",
    handFeel: "Vintage Barely-There Feel",
    idealBlanks: "Bella 3413 Tri-Blend, Next Level 6010, District Made",
    desc: "Featherlight, breathable texture that moves naturally with soft vintage-feel apparel." 
  },
  { 
    name: "Nylon & Spandex", 
    tag: "Swimsuits & Leggings",
    temp: "275°F (135°C)",
    time: "10s",
    pressure: "Medium (40 PSI)",
    prePress: "2s low-heat pre-press",
    postPress: "4s matte barrier press",
    peel: "Cold Peel (25s cool)",
    washRating: "45+ Sport Washes",
    stretchRating: "4-Way 100% Elastic Flex",
    handFeel: "Second-Skin Smoothness",
    idealBlanks: "Augusta Performance, Independent Spandex, Compression Gear",
    desc: "Superior elasticity and stretch recovery that won't crack or tear when pulled in all directions." 
  },
];

