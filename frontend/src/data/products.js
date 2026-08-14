// Estilo Wear Product Database - Premium Women's Ethnic & Boutique Fashion

export const categoriesData = [
  {
    id: 'kurtis',
    name: 'Kurtis & Suits',
    tagline: 'Timeless Grace & Modern Cuts',
    image: '/hero-kurti-model.png',
    subcategories: ['Designer Kurtis', 'Cotton Kurtis', 'Chikankari Kurtis', 'Straight Kurtis', 'Printed Kurtis', 'Anarkali Suits']
  },
  {
    id: 'sarees',
    name: 'Luxury Sarees',
    tagline: 'Six Yards of Royal Heritage',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Banarasi Sarees', 'Silk Sarees', 'Organza Sarees', 'Cotton Sarees', 'Linen Sarees']
  },
  {
    id: 'coord-sets',
    name: 'Co-Ord Sets',
    tagline: 'Effortless Chic & Modern Ethnic',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Boutique Co-Ords', 'Silk Co-Ords', 'Printed Co-Ords', 'Festive Co-Ords']
  },
  {
    id: 'ethnic-dresses',
    name: 'Ethnic & Boutique Dresses',
    tagline: 'Fusion Elegance for Every Affair',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Ethnic Dresses', 'Boutique Dresses', 'Party Dresses', 'Maxi Dresses']
  },
  {
    id: 'festive-wedding',
    name: 'Festive & Wedding Couture',
    tagline: 'Grand Celebrations & Bridal Radiance',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    subcategories: ['Wedding Collection', 'Festive Wear', 'Heavy Anarkalis', 'Lehenga Sarees']
  }
];

export const occasionsData = [
  { name: 'Wedding Collection', slug: 'wedding', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Festive Wear', slug: 'festive', image: '/hero-kurti-model.png' },
  { name: 'Office Wear', slug: 'office', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80' },
  { name: 'Casual Wear', slug: 'casual', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80' },
  { name: 'Party Wear', slug: 'party', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80' }
];

export const fabricsData = [
  { name: 'Pure Silk', count: '48 Designs' },
  { name: 'Chikankari Cotton', count: '32 Designs' },
  { name: 'Organza', count: '24 Designs' },
  { name: 'Mulmul Cotton', count: '40 Designs' },
  { name: 'Banarasi Brocade', count: '18 Designs' },
  { name: 'Organic Linen', count: '29 Designs' }
];

export const productsData = [
  {
    id: 'est-001',
    name: 'Gulzar Handcrafted Chikankari Anarkali Set',
    category: 'Chikankari Kurtis',
    mainCategory: 'Kurtis',
    subCategory: 'Anarkali Suits',
    fabric: 'Chikankari Cotton',
    occasion: 'Festive Wear',
    price: 1899,
    oldPrice: 2599,
    discount: 27,
    rating: 4.9,
    reviewCount: 42,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    sku: 'EST-GUL-001',
    colors: [
      { name: 'Antique Rose', hex: '#C87D87' },
      { name: 'Bisque', hex: '#E5BCA9' },
      { name: 'Pure Ivory', hex: '#FFF9F5' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Imbued with royal Nawabi elegance, our Gulzar Anarkali Set is meticulously hand-embroidered by artisan women in Lucknow. Crafted from breathable cotton mulmul with delicate shadow work and subtle sequin accents.',
    details: [
      'Fabric: 100% Breathable Cotton Mulmul',
      'Work: Handcrafted Lucknowi Chikankari & Mukaish Sequins',
      'Includes: Anarkali Kurta, Churidar & Chiffon Dupatta',
      'Neckline: Graceful Sweetheart Neckline with Potli Buttons',
      'Sleeve: Full Length Sheer Embroidered Sleeves'
    ],
    care: 'Dry Clean Only. Cool Iron on reverse side.',
    images: [
      '/hero-kurti-model.png',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-002',
    name: 'Varanasi Royal Zari Banarasi Silk Saree',
    category: 'Banarasi Sarees',
    mainCategory: 'Sarees',
    subCategory: 'Silk Sarees',
    fabric: 'Banarasi Brocade',
    occasion: 'Wedding Collection',
    price: 2499,
    oldPrice: 3499,
    discount: 29,
    rating: 5.0,
    reviewCount: 38,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    sku: 'EST-BAN-002',
    colors: [
      { name: 'Blush Pink', hex: '#F0C4CB' },
      { name: 'Royal Emerald', hex: '#6B7556' },
      { name: 'Crimson Red', hex: '#A25964' }
    ],
    sizes: ['Free Size'],
    description: 'A masterpiece from the heritage looms of Varanasi. Handwoven in pure Katan silk with gold electro-plated Kadwa weaves, featuring intricate floral Jaal motifs and a stately Zari pallu.',
    details: [
      'Saree Fabric: Pure Katan Silk',
      'Blouse Piece: Included (Unstitched 80cm Brocade)',
      'Weave: Kadwa Handloom Zari Weave',
      'Saree Length: 5.5 Meters',
      'Certificate of Authenticity Included'
    ],
    care: 'Dry Clean Only. Preserve wrapped in pure cotton muslin cloth.',
    images: [
      '/saree-banarasi.png',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-003',
    name: 'Noor Hand-Painted Floral Organza Saree',
    category: 'Organza Sarees',
    mainCategory: 'Sarees',
    subCategory: 'Organza Sarees',
    fabric: 'Organza',
    occasion: 'Party Wear',
    price: 1699,
    oldPrice: 2299,
    discount: 26,
    rating: 4.8,
    reviewCount: 29,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    sku: 'EST-ORG-003',
    colors: [
      { name: 'Champagne Gold', hex: '#FBEAD6' },
      { name: 'Rose Blush', hex: '#F0C4CB' }
    ],
    sizes: ['Free Size'],
    description: 'Ethereal and whisper-light. Hand-painted botanical motifs gracefully flow across pure sheer organza fabric, framed with handmade Gota Patti scallop border work.',
    details: [
      'Fabric: 100% Sheer Mulberry Organza Silk',
      'Work: Artisan Hand-painting & Scalloped Gota Edge',
      'Blouse Piece: Included (Raw Silk 80cm embroidered)',
      'Weight: Ultra Light (approx 350 grams)'
    ],
    care: 'Dry Clean Only.',
    images: [
      '/saree-organza.png',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-004',
    name: 'Raysha Silk Blend Printed Peplum Co-Ord Set',
    category: 'Co-Ord Sets',
    mainCategory: 'Co-Ord Sets',
    subCategory: 'Boutique Co-Ords',
    fabric: 'Pure Silk',
    occasion: 'Casual Wear',
    price: 1499,
    oldPrice: 1999,
    discount: 25,
    rating: 4.7,
    reviewCount: 31,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    isFeatured: false,
    inStock: true,
    sku: 'EST-COO-004',
    colors: [
      { name: 'Dried Thyme Green', hex: '#6B7556' },
      { name: 'Bisque Sand', hex: '#E5BCA9' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Designed for the modern woman who craves statement elegance. Features a high-low structured peplum top tailored with elasticated flared trousers in soft art silk.',
    details: [
      'Fabric: Premium Soft Art Silk Blend',
      'Set Includes: Peplum Tunic Top & Straight Fit Pants',
      'Neckline: V-Neck with Dori Tassels',
      'Pockets: Dual side pockets on pants'
    ],
    care: 'Gentle Hand Wash or Dry Clean.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-005',
    name: 'Aarya Hand Block Printed Cotton Straight Kurti',
    category: 'Cotton Kurtis',
    mainCategory: 'Kurtis',
    subCategory: 'Straight Kurtis',
    fabric: 'Mulmul Cotton',
    occasion: 'Office Wear',
    price: 1099,
    oldPrice: 1499,
    discount: 27,
    rating: 4.9,
    reviewCount: 54,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: false,
    isFeatured: true,
    inStock: true,
    sku: 'EST-STR-005',
    colors: [
      { name: 'Sage Thyme', hex: '#6B7556' },
      { name: 'Dusty Rose', hex: '#C87D87' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Artisanal Sanganeri hand block print crafted on breathable super-fine cotton. Designed for executive comfort with a flattering straight silhouette.',
    details: [
      'Fabric: 100% Organic Handloom Cotton',
      'Print: Authentic Wooden Block Print (Natural Dyes)',
      'Style: Straight Knee Length Kurti with Side Slits',
      'Sleeve: 3/4th Foldable Sleeves with Accent Buttons'
    ],
    care: 'Cold Machine Wash with similar colors.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-006',
    name: 'Sultana Royal Zardozi Embroidered Silk Anarkali',
    category: 'Anarkali Suits',
    mainCategory: 'Kurtis',
    subCategory: 'Anarkali Suits',
    fabric: 'Pure Silk',
    occasion: 'Wedding Collection',
    price: 2399,
    oldPrice: 3299,
    discount: 27,
    rating: 5.0,
    reviewCount: 19,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    sku: 'EST-ZAR-006',
    colors: [
      { name: 'Antique Crimson', hex: '#A25964' },
      { name: 'Rich Gold', hex: '#D4AF37' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Fit for royalty. Heavy Chanderi raw silk Anarkali adorned with handcrafted Dabka, Zardozi, and Metallic Dabka embroidery across the bodice and full flair.',
    details: [
      'Fabric: Raw Chanderi Silk with Shantoon Lining',
      'Work: Fine Hand Zardozi & Cutdana Work',
      'Flair: 5.5 Meters Full Kalidar Gher',
      'Dupatta: Heavy Organza Dupatta with Zari Borders'
    ],
    care: 'Professional Dry Clean Only.',
    images: [
      '/hero-kurti-model.png',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-007',
    name: 'Kashvi Chanderi Silk Foil Printed Boutique Dress',
    category: 'Boutique Dresses',
    mainCategory: 'Ethnic Dresses',
    subCategory: 'Boutique Dresses',
    fabric: 'Pure Silk',
    occasion: 'Party Wear',
    price: 1599,
    oldPrice: 2199,
    discount: 27,
    rating: 4.8,
    reviewCount: 33,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    isFeatured: false,
    inStock: true,
    sku: 'EST-DRS-007',
    colors: [
      { name: 'Champagne Beige', hex: '#FBEAD6' },
      { name: 'Rose Gold', hex: '#F0C4CB' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A contemporary spin on traditional ethnic wear. High-waisted tier dress embellished with subtle foil motifs, hand-tied fabric belt, and soft cotton lining.',
    details: [
      'Fabric: Chanderi Silk Blend with Cotton Lining',
      'Design: Tiered Flare Midi Ethnic Gown',
      'Includes: Fabric Belt with Hand-crafted Fabric Latkans'
    ],
    care: 'Dry Clean Recommended.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-008',
    name: 'Manjari Organic Handloom Linen Saree',
    category: 'Linen Sarees',
    mainCategory: 'Sarees',
    subCategory: 'Linen Sarees',
    fabric: 'Organic Linen',
    occasion: 'Casual Wear',
    price: 1299,
    oldPrice: 1799,
    discount: 28,
    rating: 4.7,
    reviewCount: 22,
    isNewArrival: false,
    isBestSeller: false,
    isTrending: false,
    isFeatured: false,
    inStock: true,
    sku: 'EST-LIN-008',
    colors: [
      { name: 'Dried Thyme', hex: '#6B7556' },
      { name: 'Bisque Peach', hex: '#E5BCA9' }
    ],
    sizes: ['Free Size'],
    description: 'Breathe effortless sophistication in 100 count pure organic linen woven with silver zari borders and handcrafted tassel fringes.',
    details: [
      'Fabric: 100 Count Organic Pure Linen',
      'Features: Silver Zari Stripe Pallu & Tassels',
      'Blouse Piece: Included (Matching Linen 80cm)'
    ],
    care: 'Gentle Hand Wash in Cold Water.',
    images: [
      '/saree-linen.png',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-009',
    name: 'Reeva Sequin Embroidered Georgette Designer Kurti',
    category: 'Designer Kurtis',
    mainCategory: 'Kurtis',
    subCategory: 'Designer Kurtis',
    fabric: 'Pure Silk',
    occasion: 'Party Wear',
    price: 1199,
    oldPrice: 1599,
    discount: 25,
    rating: 4.8,
    reviewCount: 36,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true,
    isFeatured: false,
    inStock: true,
    sku: 'EST-DES-009',
    colors: [
      { name: 'Antique Rose', hex: '#C87D87' },
      { name: 'Midnight Ebony', hex: '#1A1818' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Radiate festive glamour with intricate mirror and micro-sequin thread work across the neckline and cuffs. Cut in a flattering asymmetrical flared silhouette.',
    details: [
      'Fabric: Micro-Georgette with Soft Crepe Lining',
      'Work: Thread Embroidery with Micro Sequins',
      'Style: Asymmetric Flare Tunic'
    ],
    care: 'Dry Clean Only.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      '/hero-kurti-model.png'
    ]
  },
  {
    id: 'est-010',
    name: 'Meera Handloom Mulmul Cotton Jamdani Saree',
    category: 'Cotton Sarees',
    mainCategory: 'Sarees',
    subCategory: 'Cotton Sarees',
    fabric: 'Mulmul Cotton',
    occasion: 'Office Wear',
    price: 1799,
    oldPrice: 2399,
    discount: 25,
    rating: 4.9,
    reviewCount: 27,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    isFeatured: true,
    inStock: true,
    sku: 'EST-COT-010',
    colors: [
      { name: 'Champagne Ivory', hex: '#FBEAD6' },
      { name: 'Blush Pink', hex: '#F0C4CB' }
    ],
    sizes: ['Free Size'],
    description: 'Woven by master weavers using traditional Bengal Jamdani technique. Light as air mulmul cotton with geometric extra-weft floral motifs.',
    details: [
      'Fabric: 100% Fine Mulmul Cotton',
      'Weave: Authentic Handcrafted Jamdani',
      'Blouse Piece: Contrast Printed Cotton Included'
    ],
    care: 'Hand Wash separately with mild liquid detergent.',
    images: [
      '/saree-cotton.png',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-011',
    name: 'Tarang Printed Angrakha Style Ethnic Dress',
    category: 'Ethnic Dresses',
    mainCategory: 'Ethnic Dresses',
    subCategory: 'Ethnic Dresses',
    fabric: 'Chikankari Cotton',
    occasion: 'Festive Wear',
    price: 1399,
    oldPrice: 1899,
    discount: 26,
    rating: 4.9,
    reviewCount: 45,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true,
    isFeatured: false,
    inStock: true,
    sku: 'EST-ANG-011',
    colors: [
      { name: 'Thyme Green', hex: '#6B7556' },
      { name: 'Antique Rose', hex: '#C87D87' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Regal royal Angrakha neck wrap closure tied with opulent beaded latkans. Designed with tiered flares that cascade gracefully.',
    details: [
      'Fabric: Hand-Block Printed Cotton Silk',
      'Neckline: Angrakha Wrap with Handmade Fabric Ties',
      'Includes: Matching Cotton Slip'
    ],
    care: 'Hand Wash or Dry Clean.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'est-012',
    name: 'Bhavya Pure Kanjivaram Golden Zari Silk Saree',
    category: 'Silk Sarees',
    mainCategory: 'Sarees',
    subCategory: 'Silk Sarees',
    fabric: 'Pure Silk',
    occasion: 'Wedding Collection',
    price: 2299,
    oldPrice: 3199,
    discount: 28,
    rating: 5.0,
    reviewCount: 51,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    sku: 'EST-KAN-012',
    colors: [
      { name: 'Antique Crimson', hex: '#A25964' },
      { name: 'Imperial Gold', hex: '#D4AF37' }
    ],
    sizes: ['Free Size'],
    description: 'Handwoven in Kanchipuram with pure silver-gold electroplated Zari thread. Features traditional temple borders and grand peacock motifs.',
    details: [
      'Fabric: 100% Pure Mulberry Kanjivaram Silk',
      'Zari Quality: Tested Pure Gold Zari Weave',
      'Silk Mark Certified: Yes'
    ],
    care: 'Dry Clean Only. Store in Cotton Saree Cover.',
    images: [
      '/saree-kanjivaram.png',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ]
  }
];

export const testimonialsData = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Mumbai',
    role: 'Fashion Curator & Stylist',
    comment: 'Estilo Wear is pure luxury! The Lucknowi Chikankari Anarkali set I ordered for my sister’s sangeet was so divine. The fabric quality, shadow embroidery, and fit exceeded all expectations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Priyanka Sen',
    city: 'Kolkata',
    role: 'Interior Architect',
    comment: 'The Banarasi silk saree from Estilo Wear feels like holding heritage art in your hands. The Kadwa zari work is flawless. Arrived beautifully packaged in a signature wooden boutique box!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Dr. Radhika Menon',
    city: 'Bengaluru',
    role: 'Senior Physician',
    comment: 'Finding office-wear ethnic outfits that balance comfort and executive style was always hard until I found Estilo Wear. Their hand block printed cotton kurtis are my daily go-to!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
];

export const instagramPosts = [
  {
    id: 1,
    image: '/hero-kurti-model.png',
    likes: '2.4k',
    tag: '#EstiloWomen'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    likes: '3.8k',
    tag: '#SlayEveryLook'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    likes: '1.9k',
    tag: '#ChikankariLove'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    likes: '4.1k',
    tag: '#BoutiqueCouture'
  }
];
