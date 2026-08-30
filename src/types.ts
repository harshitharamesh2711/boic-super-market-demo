export type TabType = 'home' | 'categories' | 'cart' | 'profile';

export type CategoryId = 'groceries' | 'fruits-veggies' | 'snacks' | 'dairy' | 'bakery' | 'beverages';

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  description: string;
  origin?: string;
  isOrganic?: boolean;
  isBestSeller?: boolean;
  isFreshToday?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'Received' | 'Packing' | 'Out for Delivery' | 'Delivered';
  deliveryAddress: string;
  paymentMethod: string;
  timeSlot: string;
}

export interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  hoursWeekday: string;
  hoursSunday: string;
  email: string;
  whatsapp: string;
}
