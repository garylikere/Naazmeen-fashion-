import { Product, BagCategory } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_luxury_bag_editorial_1791211786580.jpg';
export const ATELIER_IMAGE = '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg';
export const EDITORIAL_BANNER = '/src/assets/images/editorial_collection_banner_1791211827079.jpg';

export const CATEGORY_DATA: { name: BagCategory; count: number; image: string; description: string }[] = [
  {
    name: 'Handbags',
    count: 14,
    image: '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
    description: 'Sculptural silhouettes and top-handle icons crafted from Tuscan box-calf leather.'
  },
  {
    name: 'Shoulder Bags',
    count: 18,
    image: '/src/assets/images/bag_cognac_shoulder_1791211869256.jpg',
    description: 'Effortless grace designed to nestle under the arm with custom gold chain details.'
  },
  {
    name: 'Crossbody Bags',
    count: 12,
    image: '/src/assets/images/bag_crossbody_emerald_1791211881888.jpg',
    description: 'Hands-free luxury for metropolitan living and international travel.'
  },
  {
    name: 'Tote Bags',
    count: 9,
    image: '/src/assets/images/luxury_structured_tote_1791211813488.jpg',
    description: 'Generous architectural day bags with laptop compartments and suede lining.'
  },
  {
    name: 'Clutches',
    count: 11,
    image: '/src/assets/images/bag_clutch_cream_1791211893821.jpg',
    description: 'Evening envelopes and minaudières finished with brushed metal bezels.'
  },
  {
    name: 'Wallets',
    count: 15,
    image: '/src/assets/images/wallet_bifold_luxury_1791211918143.jpg',
    description: 'Slim continental wallets, zipped cardholders, and fine leather accessories.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'The Paloma Top Handle',
    slug: 'the-paloma-top-handle',
    tagline: 'Sculptural architectural top-handle bag in pristine box-calf leather.',
    description: 'An iconic silhouette defined by precise geometric balance and timeless poise. Crafted by master artisans in Florence from select full-grain box calfskin, The Paloma features a hand-burnished edge finish, a structured trapezoidal body, and a bespoke 24k brushed gold turnlock closure. An interior accordion compartment includes a zippered divider and slip pockets lined in buttery soft lambskin.',
    category: 'Handbags',
    price: 680,
    salePrice: 590,
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 38,
    sku: 'AUR-HB-01',
    stock: 22,
    material: '100% Full-Grain Tuscan Box Calfskin',
    dimensions: '26cm W x 19cm H x 11cm D (10.2" x 7.5" x 4.3")',
    hardware: '24k Brushed Gold Plated Brass',
    lining: 'Natural Italian Lambskin Leather',
    features: [
      'Removable & adjustable leather crossbody strap (48cm - 56cm drop)',
      'Dual interior compartments with central zippered divider',
      'Protective gold-finish brass base studs',
      'Hand-stitched reinforced rolled leather handle',
      'Accompanied by silk-cotton dust bag and certificate of authenticity'
    ],
    colors: [
      {
        id: 'paloma-noir',
        colorName: 'Noir Black',
        colorHex: '#141416',
        stock: 8,
        sku: 'AUR-HB-01-BLK',
        images: [
          '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
          '/src/assets/images/editorial_collection_banner_1791211827079.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      },
      {
        id: 'paloma-cognac',
        colorName: 'Cognac Tan',
        colorHex: '#8B5A2B',
        stock: 6,
        sku: 'AUR-HB-01-CGN',
        images: [
          '/src/assets/images/bag_cognac_shoulder_1791211869256.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg',
          '/src/assets/images/editorial_collection_banner_1791211827079.jpg'
        ]
      },
      {
        id: 'paloma-ivory',
        colorName: 'Alabaster Ivory',
        colorHex: '#F2EDE4',
        stock: 5,
        sku: 'AUR-HB-01-IVR',
        images: [
          '/src/assets/images/luxury_structured_tote_1791211813488.jpg',
          '/src/assets/images/bag_clutch_cream_1791211893821.jpg'
        ]
      },
      {
        id: 'paloma-merlot',
        colorName: 'Merlot Burgundy',
        colorHex: '#5A1827',
        stock: 3,
        sku: 'AUR-HB-01-MER',
        images: [
          '/src/assets/images/bag_merlot_burgundy_1791211907220.jpg',
          '/src/assets/images/editorial_collection_banner_1791211827079.jpg'
        ]
      }
    ],
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-09-12T14:30:00Z'
  },
  {
    id: 'prod-02',
    name: 'The Aurelia Grand Tote',
    slug: 'the-aurelia-grand-tote',
    tagline: 'Spacious architectural everyday tote with reinforced handles.',
    description: 'Designed for the discerning professional and modern jetsetter. The Aurelia Grand Tote merges clean architectural lines with unmatched utility. Accommodates up to a 15-inch laptop inside a padded microfiber compartment, plus daily essentials, planner, and cosmetics. Finished with signature saddle stitching and structured corners that prevent sagging over years of wear.',
    category: 'Tote Bags',
    price: 740,
    salePrice: undefined,
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 5.0,
    reviewCount: 42,
    sku: 'AUR-TT-02',
    stock: 18,
    material: 'Full-Grain French Calfskin with Water-Resistant Finish',
    dimensions: '38cm W x 29cm H x 14cm D (15.0" x 11.4" x 5.5")',
    hardware: 'Pale Champagne Gold Hardware',
    lining: 'Beige Microfiber Faux-Suede Lining',
    features: [
      'Padded central compartment fits laptops up to 15"',
      'Magnetic top bridge closure with leather pull tab',
      'Dual interior slip pockets and secure zippered passport pocket',
      'Reinforced rolled leather straps with comfortable 25cm drop',
      'Five protective base metal feet'
    ],
    colors: [
      {
        id: 'tote-ivory',
        colorName: 'Alabaster Ivory',
        colorHex: '#F2EDE4',
        stock: 7,
        sku: 'AUR-TT-02-IVR',
        images: [
          '/src/assets/images/luxury_structured_tote_1791211813488.jpg',
          '/src/assets/images/hero_luxury_bag_editorial_1791211786580.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      },
      {
        id: 'tote-cognac',
        colorName: 'Cognac Tan',
        colorHex: '#8B5A2B',
        stock: 6,
        sku: 'AUR-TT-02-CGN',
        images: [
          '/src/assets/images/bag_cognac_shoulder_1791211869256.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      },
      {
        id: 'tote-noir',
        colorName: 'Noir Black',
        colorHex: '#141416',
        stock: 5,
        sku: 'AUR-TT-02-BLK',
        images: [
          '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
          '/src/assets/images/editorial_collection_banner_1791211827079.jpg'
        ]
      }
    ],
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-09-18T16:00:00Z'
  },
  {
    id: 'prod-03',
    name: 'The Celine Saddle Crossbody',
    slug: 'the-celine-saddle-crossbody',
    tagline: 'Curved saddle silhouette with custom equestrian ring hardware.',
    description: 'An elevated interpretation of classic equestrian leathercraft. The Celine Saddle Crossbody features a soft curvilinear silhouette, weighted flap, and custom-cast gold harness ring. Designed to transition seamlessly from brisk morning coffee runs to gallery vernissages in the evening.',
    category: 'Crossbody Bags',
    price: 520,
    salePrice: 460,
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.8,
    reviewCount: 29,
    sku: 'AUR-CB-03',
    stock: 19,
    material: 'Natural Pebbled Calf Leather',
    dimensions: '22cm W x 17cm H x 8cm D (8.6" x 6.7" x 3.1")',
    hardware: 'Antiqued Brushed Gold Ring & Buckle',
    lining: 'Supple Nappa Calfskin',
    features: [
      'Curved front flap with hidden magnetic snap lock',
      'Adjustable cross-body shoulder strap (50cm - 58cm drop)',
      'Exterior back slip pocket for easy smartphone access',
      'Interior zip compartment and 3 card slots',
      'Featherweight construction (490 grams)'
    ],
    colors: [
      {
        id: 'saddle-emerald',
        colorName: 'Forest Emerald',
        colorHex: '#1F3F2B',
        stock: 7,
        sku: 'AUR-CB-03-EMR',
        images: [
          '/src/assets/images/bag_crossbody_emerald_1791211881888.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      },
      {
        id: 'saddle-noir',
        colorName: 'Noir Black',
        colorHex: '#141416',
        stock: 6,
        sku: 'AUR-CB-03-BLK',
        images: [
          '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
          '/src/assets/images/editorial_collection_banner_1791211827079.jpg'
        ]
      },
      {
        id: 'saddle-cognac',
        colorName: 'Cognac Tan',
        colorHex: '#8B5A2B',
        stock: 6,
        sku: 'AUR-CB-03-CGN',
        images: [
          '/src/assets/images/bag_cognac_shoulder_1791211869256.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      }
    ],
    createdAt: '2026-09-01T11:00:00Z',
    updatedAt: '2026-09-22T08:00:00Z'
  },
  {
    id: 'prod-04',
    name: 'The Mara Chain Shoulder Bag',
    slug: 'the-mara-chain-shoulder-bag',
    tagline: 'Feminine baguette shoulder bag with diamond-faceted gold chain.',
    description: 'The epitome of contemporary feminine luxury. The Mara is tailored with a slender profile that sits close under the arm, crafted in supple calfskin and enhanced with an opulent diamond-cut link chain that can be doubled for shoulder wear or extended for high crossbody styling.',
    category: 'Shoulder Bags',
    price: 590,
    salePrice: undefined,
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 31,
    sku: 'AUR-SB-04',
    stock: 14,
    material: 'Smooth Semi-Gloss Box Calfskin',
    dimensions: '25cm W x 14cm H x 6.5cm D (9.8" x 5.5" x 2.6")',
    hardware: 'Double-Polished 24k Gold Chain & Lock',
    lining: 'Mocha Micro-Suede',
    features: [
      'Dual-wear sliding chain strap with leather shoulder cushion',
      'Discreet push-lock clasp with engraved atelier crest',
      'Internal zip pocket and lipstick holder loop',
      'Structured base with invisible reinforcement'
    ],
    colors: [
      {
        id: 'mara-cognac',
        colorName: 'Cognac Tan',
        colorHex: '#8B5A2B',
        stock: 5,
        sku: 'AUR-SB-04-CGN',
        images: [
          '/src/assets/images/bag_cognac_shoulder_1791211869256.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      },
      {
        id: 'mara-noir',
        colorName: 'Noir Black',
        colorHex: '#141416',
        stock: 5,
        sku: 'AUR-SB-04-BLK',
        images: [
          '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
          '/src/assets/images/editorial_collection_banner_1791211827079.jpg'
        ]
      },
      {
        id: 'mara-merlot',
        colorName: 'Merlot Burgundy',
        colorHex: '#5A1827',
        stock: 4,
        sku: 'AUR-SB-04-MER',
        images: [
          '/src/assets/images/bag_merlot_burgundy_1791211907220.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      }
    ],
    createdAt: '2026-08-20T12:00:00Z',
    updatedAt: '2026-09-25T10:00:00Z'
  },
  {
    id: 'prod-05',
    name: 'The Étoile Envelope Clutch',
    slug: 'the-etoile-envelope-clutch',
    tagline: 'Minimalist evening clutch with beveled gold accent trim.',
    description: 'Conceived for gala evenings and intimate dinners. The Étoile Envelope Clutch balances whisper-soft Spanish nappa leather with crisp beveled geometry. Features a concealed magnetic flap and an optional whisper-thin curb chain to hang gracefully over the shoulder.',
    category: 'Clutches',
    price: 380,
    salePrice: 320,
    featured: false,
    bestseller: false,
    newArrival: true,
    rating: 4.7,
    reviewCount: 19,
    sku: 'AUR-CL-05',
    stock: 16,
    material: 'Silky Spanish Nappa Leather',
    dimensions: '24cm W x 13cm H x 4cm D (9.4" x 5.1" x 1.6")',
    hardware: 'Subtle Beveled 24k Gold Corner Accents',
    lining: 'Fine Black Grosgrain Silk',
    features: [
      'Concealed ultra-quiet magnetic closure',
      'Detachable delicate gold trace chain (52cm drop)',
      'Internal 6-card organizer slot and zippered coin pocket',
      'Fits iPhone 16 Pro Max and compact makeup essentials'
    ],
    colors: [
      {
        id: 'clutch-cream',
        colorName: 'Alabaster Ivory',
        colorHex: '#F2EDE4',
        stock: 7,
        sku: 'AUR-CL-05-IVR',
        images: [
          '/src/assets/images/bag_clutch_cream_1791211893821.jpg',
          '/src/assets/images/luxury_structured_tote_1791211813488.jpg'
        ]
      },
      {
        id: 'clutch-noir',
        colorName: 'Noir Black',
        colorHex: '#141416',
        stock: 5,
        sku: 'AUR-CL-05-BLK',
        images: [
          '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
          '/src/assets/images/editorial_collection_banner_1791211827079.jpg'
        ]
      },
      {
        id: 'clutch-merlot',
        colorName: 'Merlot Burgundy',
        colorHex: '#5A1827',
        stock: 4,
        sku: 'AUR-CL-05-MER',
        images: [
          '/src/assets/images/bag_merlot_burgundy_1791211907220.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      }
    ],
    createdAt: '2026-09-10T14:00:00Z',
    updatedAt: '2026-09-28T11:00:00Z'
  },
  {
    id: 'prod-06',
    name: 'The Florentine Continental Wallet',
    slug: 'the-florentine-continental-wallet',
    tagline: 'Hand-stitched pebbled leather wallet with gold foil monogramming.',
    description: 'An enduring everyday companion. Crafted from full-grain textured calfskin that resists scratching and water droplets. Features twelve card slots, two billfold compartments, and an expansive zippered coin pocket, all secured by a perimeter Swiss-engineered zipper.',
    category: 'Wallets',
    price: 240,
    salePrice: undefined,
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 54,
    sku: 'AUR-WL-06',
    stock: 25,
    material: 'Scratch-Resistant Palmellato Calf Leather',
    dimensions: '19.5cm W x 10cm H x 2.2cm D (7.7" x 3.9" x 0.9")',
    hardware: 'Swiss Raccagni Polished Gold Zipper',
    lining: 'Full-Grain Matching Calfskin & Moiré Silk',
    features: [
      '12 credit card slots with RFID blocking shields',
      'Central zippered coin divider with custom leather pull',
      'Two full-length banknote slip pockets',
      'Gold hot-stamped atelier hallmark'
    ],
    colors: [
      {
        id: 'wallet-cognac',
        colorName: 'Cognac Tan',
        colorHex: '#8B5A2B',
        stock: 9,
        sku: 'AUR-WL-06-CGN',
        images: [
          '/src/assets/images/wallet_bifold_luxury_1791211918143.jpg',
          '/src/assets/images/bag_cognac_shoulder_1791211869256.jpg'
        ]
      },
      {
        id: 'wallet-noir',
        colorName: 'Noir Black',
        colorHex: '#141416',
        stock: 8,
        sku: 'AUR-WL-06-BLK',
        images: [
          '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
          '/src/assets/images/wallet_bifold_luxury_1791211918143.jpg'
        ]
      },
      {
        id: 'wallet-merlot',
        colorName: 'Merlot Burgundy',
        colorHex: '#5A1827',
        stock: 8,
        sku: 'AUR-WL-06-MER',
        images: [
          '/src/assets/images/bag_merlot_burgundy_1791211907220.jpg',
          '/src/assets/images/wallet_bifold_luxury_1791211918143.jpg'
        ]
      }
    ],
    createdAt: '2026-08-05T08:00:00Z',
    updatedAt: '2026-09-15T09:00:00Z'
  },
  {
    id: 'prod-07',
    name: 'The Valérie Minimalist Tote',
    slug: 'the-valerie-minimalist-tote',
    tagline: 'Clean unlined raw-edge calfskin tote with internal zip clutch pouch.',
    description: 'Pure architectural restraint. The Valérie strips away unnecessary ornamentation to celebrate the organic weight and hand-feel of double-faced Italian leather. Accompanied by a detachable zippered pouch in matching calfskin for valuables.',
    category: 'Tote Bags',
    price: 620,
    salePrice: 530,
    featured: false,
    bestseller: false,
    newArrival: true,
    rating: 4.8,
    reviewCount: 16,
    sku: 'AUR-TT-07',
    stock: 11,
    material: 'Double-Faced Tuscan Vachetta Leather',
    dimensions: '34cm W x 28cm H x 13cm D (13.4" x 11.0" x 5.1")',
    hardware: 'Solid Cast Brass Hardware',
    lining: 'Natural Raw Suede Interior',
    features: [
      'Raw-edge hand-painted burnished finish',
      'Removable tethered zip clutch pouch included (20cm x 13cm)',
      'Comfortable shoulder drop (26cm) fits over wool coats',
      'Weight: 680g'
    ],
    colors: [
      {
        id: 'valerie-noir',
        colorName: 'Noir Black',
        colorHex: '#141416',
        stock: 6,
        sku: 'AUR-TT-07-BLK',
        images: [
          '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
          '/src/assets/images/luxury_structured_tote_1791211813488.jpg'
        ]
      },
      {
        id: 'valerie-cognac',
        colorName: 'Cognac Tan',
        colorHex: '#8B5A2B',
        stock: 5,
        sku: 'AUR-TT-07-CGN',
        images: [
          '/src/assets/images/bag_cognac_shoulder_1791211869256.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      }
    ],
    createdAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-09-30T12:00:00Z'
  },
  {
    id: 'prod-08',
    name: 'The Sophia Structured Handbag',
    slug: 'the-sophia-structured-handbag',
    tagline: 'Refined trapezoid handbag with dual handles and gold turn-studs.',
    description: 'A timeless silhouette that commands elegance in every room. Constructed with rigid internal framework to preserve its pristine geometry for decades. Finished with subtle contrast saddle-stitching and brass protective base nodes.',
    category: 'Handbags',
    price: 710,
    salePrice: undefined,
    featured: false,
    bestseller: false,
    newArrival: true,
    rating: 5.0,
    reviewCount: 22,
    sku: 'AUR-HB-08',
    stock: 13,
    material: 'Grade-A French Veau Grainé Leather',
    dimensions: '28cm W x 21cm H x 12cm D (11.0" x 8.3" x 4.7")',
    hardware: '24k Brushed Champagne Gold',
    lining: 'Honey Gold Lambskin',
    features: [
      'Twin rolled leather top handles with 11cm drop',
      'Detachable leather crossbody strap included',
      'Dual magnetic flap closure with central safety lock',
      'Internal smartphone holster and zip security pocket'
    ],
    colors: [
      {
        id: 'sophia-merlot',
        colorName: 'Merlot Burgundy',
        colorHex: '#5A1827',
        stock: 5,
        sku: 'AUR-HB-08-MER',
        images: [
          '/src/assets/images/bag_merlot_burgundy_1791211907220.jpg',
          '/src/assets/images/editorial_collection_banner_1791211827079.jpg'
        ]
      },
      {
        id: 'sophia-ivory',
        colorName: 'Alabaster Ivory',
        colorHex: '#F2EDE4',
        stock: 4,
        sku: 'AUR-HB-08-IVR',
        images: [
          '/src/assets/images/luxury_structured_tote_1791211813488.jpg',
          '/src/assets/images/bag_clutch_cream_1791211893821.jpg'
        ]
      },
      {
        id: 'sophia-noir',
        colorName: 'Noir Black',
        colorHex: '#141416',
        stock: 4,
        sku: 'AUR-HB-08-BLK',
        images: [
          '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
          '/src/assets/images/atelier_craftsmanship_leather_1791211800631.jpg'
        ]
      }
    ],
    createdAt: '2026-09-20T15:00:00Z',
    updatedAt: '2026-10-01T14:00:00Z'
  }
];

export const INITIAL_ORDERS: import('../types').Order[] = [
  {
    id: 'AUR-84291',
    customerName: 'Lady Eleanor Vance',
    customerEmail: 'eleanor.vance@vogue-press.co.uk',
    customerPhone: '+44 7700 900341',
    shippingAddress: {
      fullName: 'Lady Eleanor Vance',
      email: 'eleanor.vance@vogue-press.co.uk',
      phone: '+44 7700 900341',
      street: '14 Kensington Palace Gardens',
      city: 'London',
      province: 'Greater London',
      postalCode: 'W8 4QP',
      orderNotes: 'Please leave with the private concierge.'
    },
    items: [
      {
        productId: 'prod-01',
        productName: 'The Paloma Top Handle',
        colorName: 'Noir Black',
        colorHex: '#141416',
        image: '/src/assets/images/bag_noir_handbag_1791211856470.jpg',
        price: 590,
        quantity: 1,
        subtotal: 590
      },
      {
        productId: 'prod-06',
        productName: 'The Florentine Continental Wallet',
        colorName: 'Noir Black',
        colorHex: '#141416',
        image: '/src/assets/images/wallet_bifold_luxury_1791211918143.jpg',
        price: 240,
        quantity: 1,
        subtotal: 240
      }
    ],
    subtotal: 830,
    shippingFee: 0,
    discount: 50,
    couponCode: 'WELCOME50',
    total: 780,
    paymentMethod: 'Credit/Debit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    createdAt: '2026-10-02T14:22:00Z',
    updatedAt: '2026-10-03T09:15:00Z'
  },
  {
    id: 'AUR-84180',
    customerName: 'Camille Dupont',
    customerEmail: 'camille.dupont@atelier-paris.fr',
    customerPhone: '+33 6 12 34 56 78',
    shippingAddress: {
      fullName: 'Camille Dupont',
      email: 'camille.dupont@atelier-paris.fr',
      phone: '+33 6 12 34 56 78',
      street: '42 Avenue Montaigne',
      city: 'Paris',
      province: 'Île-de-France',
      postalCode: '75008'
    },
    items: [
      {
        productId: 'prod-02',
        productName: 'The Aurelia Grand Tote',
        colorName: 'Alabaster Ivory',
        colorHex: '#F2EDE4',
        image: '/src/assets/images/luxury_structured_tote_1791211813488.jpg',
        price: 740,
        quantity: 1,
        subtotal: 740
      }
    ],
    subtotal: 740,
    shippingFee: 0,
    discount: 0,
    total: 740,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    createdAt: '2026-10-04T10:10:00Z',
    updatedAt: '2026-10-04T11:45:00Z'
  },
  {
    id: 'AUR-83955',
    customerName: 'Sophia Montgomery',
    customerEmail: 'sophia.montgomery@nyarts.org',
    customerPhone: '+1 212 555 0192',
    shippingAddress: {
      fullName: 'Sophia Montgomery',
      email: 'sophia.montgomery@nyarts.org',
      phone: '+1 212 555 0192',
      street: '740 Park Avenue, Apt 11B',
      city: 'New York',
      province: 'NY',
      postalCode: '10021'
    },
    items: [
      {
        productId: 'prod-03',
        productName: 'The Celine Saddle Crossbody',
        colorName: 'Forest Emerald',
        colorHex: '#1F3F2B',
        image: '/src/assets/images/bag_crossbody_emerald_1791211881888.jpg',
        price: 460,
        quantity: 1,
        subtotal: 460
      }
    ],
    subtotal: 460,
    shippingFee: 0,
    discount: 0,
    total: 460,
    paymentMethod: 'Credit/Debit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2026-09-28T16:45:00Z',
    updatedAt: '2026-10-01T15:20:00Z'
  }
];
