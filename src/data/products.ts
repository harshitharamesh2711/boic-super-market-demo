import { Product, StoreInfo } from '../types';

export const STORE_INFO: StoreInfo = {
  name: 'BoiC Small Super Market',
  address: '123 Local Street, Your Town',
  phone: '+1 234 567 890',
  hoursWeekday: 'Mon-Sat: 8 AM – 9 PM',
  hoursSunday: 'Sun: 9 AM – 6 PM',
  email: 'hello@boicmarket.com',
  whatsapp: '+1234567890'
};

export const CATEGORIES_DATA = [
  {
    id: 'groceries' as const,
    name: 'Groceries',
    iconName: 'ShoppingBag',
    description: 'Pantry staples, organic grains, oils, sauces, and spices.',
    itemCount: 24
  },
  {
    id: 'fruits-veggies' as const,
    name: 'Fruits & Veggies',
    iconName: 'Citrus',
    description: 'Farm-fresh organic fruits and crisp vegetables picked daily.',
    itemCount: 32
  },
  {
    id: 'snacks' as const,
    name: 'Snacks',
    iconName: 'Cookie',
    description: 'Artisanal chips, roasted nuts, granola, and baked bites.',
    itemCount: 18
  },
  {
    id: 'dairy' as const,
    name: 'Dairy',
    iconName: 'Milk',
    description: 'Fresh milk, artisanal cheeses, butter, and cultured yogurts.',
    itemCount: 16
  }
];

export const PRODUCTS_DATA: Product[] = [
  // Fruits & Veggies
  {
    id: 'fv-1',
    name: 'Organic Hass Avocados',
    category: 'fruits-veggies',
    price: 3.49,
    originalPrice: 4.29,
    unit: '3 pcs pack',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    description: 'Creamy, perfectly ripe organic Hass avocados grown by local certified organic orchards.',
    origin: 'Valley Sun Farm, CA',
    isOrganic: true,
    isBestSeller: true,
    isFreshToday: true,
    rating: 4.9,
    reviewCount: 84,
    inStock: true
  },
  {
    id: 'fv-2',
    name: 'Farm Fresh Sweet Strawberries',
    category: 'fruits-veggies',
    price: 4.99,
    originalPrice: 5.99,
    unit: '1 lb clamshell',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    description: 'Hand-picked ruby red strawberries bursting with natural sweetness and aromatic flavor.',
    origin: 'Coastal Berry Farm',
    isOrganic: true,
    isFreshToday: true,
    rating: 4.8,
    reviewCount: 62,
    inStock: true
  },
  {
    id: 'fv-3',
    name: 'Crisp Organic Baby Spinach',
    category: 'fruits-veggies',
    price: 2.99,
    unit: '250g bag',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    description: 'Triple-washed tender baby spinach leaves rich in iron and antioxidants, ready for salads.',
    origin: 'Green Earth Organics',
    isOrganic: true,
    isFreshToday: true,
    rating: 4.9,
    reviewCount: 45,
    inStock: true
  },
  {
    id: 'fv-4',
    name: 'Heirloom Vine Tomatoes',
    category: 'fruits-veggies',
    price: 3.89,
    originalPrice: 4.50,
    unit: '500g bunch',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'Juicy, sun-ripened multi-colored heirloom tomatoes packed with rich old-fashioned flavor.',
    origin: 'Heritage Greenhouses',
    isOrganic: true,
    isFreshToday: true,
    rating: 4.7,
    reviewCount: 39,
    inStock: true
  },
  {
    id: 'fv-5',
    name: 'Crunchy Honeycrisp Apples',
    category: 'fruits-veggies',
    price: 4.29,
    unit: '1 kg bag',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp, sweet, and refreshingly tart premium Honeycrisp apples perfect for healthy snacking.',
    origin: 'Highland Orchards',
    isOrganic: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 110,
    inStock: true
  },
  {
    id: 'fv-6',
    name: 'Organic Cavendish Bananas',
    category: 'fruits-veggies',
    price: 1.89,
    unit: '1 bunch (~1kg)',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    description: 'Naturally ripened bananas with smooth yellow peels and sweet energizing potassium.',
    origin: 'Fair Trade Tropicals',
    isOrganic: true,
    isFreshToday: true,
    rating: 4.9,
    reviewCount: 140,
    inStock: true
  },

  // Groceries
  {
    id: 'gr-1',
    name: 'Cold-Pressed Extra Virgin Olive Oil',
    category: 'groceries',
    price: 11.99,
    originalPrice: 14.50,
    unit: '500ml glass bottle',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    description: 'First cold-pressed single estate extra virgin olive oil with fruity notes and peppery finish.',
    origin: 'Mediterranean Groves',
    isOrganic: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 96,
    inStock: true
  },
  {
    id: 'gr-2',
    name: 'Artisanal Sourdough Country Loaf',
    category: 'groceries',
    price: 5.49,
    unit: '650g loaf',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'Naturally fermented for 36 hours with wild yeast, offering an open crumb and crispy blistered crust.',
    origin: 'BoiC In-House Bakery',
    isFreshToday: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 128,
    inStock: true
  },
  {
    id: 'gr-3',
    name: 'Organic Rolled Oats',
    category: 'groceries',
    price: 3.99,
    unit: '750g bag',
    image: 'https://images.unsplash.com/photo-1614961908595-654bdad24a30?auto=format&fit=crop&w=600&q=80',
    description: '100% whole grain organic rolled oats, hearty and nutrient-dense for morning porridge and baking.',
    origin: 'Prairie Harvest Co.',
    isOrganic: true,
    rating: 4.8,
    reviewCount: 52,
    inStock: true
  },
  {
    id: 'gr-4',
    name: 'Pure Raw Wildflower Honey',
    category: 'groceries',
    price: 8.49,
    originalPrice: 9.99,
    unit: '350g jar',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    description: 'Unfiltered, unpasteurized pure wildflower honey harvested by local ethical beekeepers.',
    origin: 'Meadow Gold Apiary',
    isOrganic: true,
    rating: 4.9,
    reviewCount: 77,
    inStock: true
  },
  {
    id: 'gr-5',
    name: 'Italian Bronze-Cut Penne Rigate',
    category: 'groceries',
    price: 2.79,
    unit: '500g box',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional slow-dried durum wheat semolina pasta that holds sauces with authentic texture.',
    origin: 'Campania, Italy',
    rating: 4.7,
    reviewCount: 41,
    inStock: true
  },

  // Dairy
  {
    id: 'dr-1',
    name: 'Farmstead Whole Milk',
    category: 'dairy',
    price: 3.69,
    unit: '1 Gallon (3.78L)',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    description: 'Pasture-raised, non-homogenized whole milk with natural cream top from pasture-fed cows.',
    origin: 'Clover Meadows Dairy',
    isOrganic: true,
    isFreshToday: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 88,
    inStock: true
  },
  {
    id: 'dr-2',
    name: 'Aged Grass-Fed Cheddar Cheese',
    category: 'dairy',
    price: 5.99,
    originalPrice: 6.99,
    unit: '200g block',
    image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&w=600&q=80',
    description: 'Naturally aged for 14 months to develop a sharp, nutty profile and crumbly crystalline bite.',
    origin: 'Green Hills Creamery',
    isOrganic: true,
    rating: 4.9,
    reviewCount: 64,
    inStock: true
  },
  {
    id: 'dr-3',
    name: 'Greek Strained Probiotic Yogurt',
    category: 'dairy',
    price: 4.49,
    unit: '500g tub',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    description: 'Thick, creamy plain Greek yogurt with 5 active live probiotic cultures and 18g protein per serving.',
    origin: 'Olympus Family Dairy',
    isOrganic: true,
    rating: 4.8,
    reviewCount: 53,
    inStock: true
  },
  {
    id: 'dr-4',
    name: 'Cultured European Salted Butter',
    category: 'dairy',
    price: 4.29,
    unit: '250g roll',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    description: 'Slowly churned with 84% butterfat and sea salt crystals for rich, flaky pastries and warm toast.',
    origin: 'Belle Valley Dairy',
    rating: 4.9,
    reviewCount: 38,
    inStock: true
  },

  // Snacks
  {
    id: 'sn-1',
    name: 'Artisan Sea Salt & Vinegar Kettle Chips',
    category: 'snacks',
    price: 3.49,
    originalPrice: 3.99,
    unit: '180g bag',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    description: 'Small-batch kettle cooked potatoes in pure sunflower oil seasoned with tangy cider vinegar and sea salt.',
    origin: 'Rustic Kettle Co.',
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 92,
    inStock: true
  },
  {
    id: 'sn-2',
    name: 'Roasted Tamari Almonds & Cashews',
    category: 'snacks',
    price: 6.99,
    originalPrice: 7.99,
    unit: '250g resealable pouch',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    description: 'Slowly dry-roasted nuts glazed in organic gluten-free tamari soy sauce with a savory crunch.',
    origin: 'SunNut Roasters',
    isOrganic: true,
    rating: 4.9,
    reviewCount: 47,
    inStock: true
  },
  {
    id: 'sn-3',
    name: 'Dark Chocolate & Sea Salt Granola Bites',
    category: 'snacks',
    price: 4.79,
    unit: '200g bag',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80',
    description: 'Clusters of toasted oats, 70% fair-trade dark chocolate chunks, coconut oil, and Maldon sea salt.',
    origin: 'BoiC Artisan Snacks',
    isOrganic: true,
    rating: 4.9,
    reviewCount: 65,
    inStock: true
  },
  {
    id: 'sn-4',
    name: 'Air-Popped Truffle & Herb Popcorn',
    category: 'snacks',
    price: 3.29,
    unit: '120g bag',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=600&q=80',
    description: 'Gourmet butterfly popcorn tossed with real Italian black truffle oil and rosemary herbs.',
    origin: 'PopCraft',
    rating: 4.6,
    reviewCount: 31,
    inStock: true
  }
];
