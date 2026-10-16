export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  ageRange: '0-12m' | '1-3y' | '3-5y' | '6-8y' | '8+y';
  ageLabel: string;
  price: number; // in PKR
  originalPrice?: number;
  discountBadge?: string;
  badgeType?: 'new' | 'sale' | 'hot';
  stock: number;
  inStock: boolean;
  image: string;
  galleryImages: string[];
  shortDescription: string;
  fullDescription: string;
  features: string[];
  materials: string;
  safetyNotes: string;
  dimensions?: string;
  isTrending?: boolean;
  isEarlyYears?: boolean;
  /** Override. Default is "{title} Price in Pakistan | A&S Toys". */
  seoTitle?: string;
  seoDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'Received' | 'Inspected' | 'Dispatched' | 'Delivered';
  createdAt: string;
  trackingNumber: string;
  courier: string;
}
