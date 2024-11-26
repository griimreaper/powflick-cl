// types.ts

export interface Category {
  id: string;
  name: string;
  // parentId: string | null;
  // link: string;
  // subcategories: Category[];
}

export interface ProductDB {
  id: string; // Identificador único del producto
  title: string; // Título del producto
  content: string; // Descripción completa del producto
  short_description: string; // Descripción corta del producto (puede ser vacío)
  date: string; // Fecha de creación o actualización del producto
  price: number; // Precio actual del producto
  regular_price: number; // Precio regular del producto
  discount: number; // Descuento aplicado al producto
  stock_status: 'instock' | 'outofstock'; // Estado de inventario
  stock: number; // Cantidad de stock disponible
  selled: number; // Cantidad vendida (puede ser nula)
  product_categories: string; // Categorías del producto separadas por '|'
  colors: string | null; // Colores disponibles (puede ser nulo)
  status: 'publish' | 'draft'; // Estado de publicación del producto
  URL: string; // URL de la imagen del producto
  images: string[]; // Array de URLs de imágenes del producto
  slug: string; // Slug (parte de la URL) del producto
  featured: boolean; // Indica si el producto es destacado
  mostSold: boolean; // Indica si el producto es el más vendido
  createdAt: string; // Fecha de creación del producto
  updatedAt: string; // Fecha de última actualización del producto
  quantityPurchase: number;
}

export interface RecentProduct extends ProductDB {
}

export interface Navbar {
  categories: Category[];
  recent: RecentProduct[];
}

export interface Collections {
  mostSoldProducts: ProductDB[];
  featuredProducts: ProductDB[];
  discountProducts: ProductDB[];
  latestProducts: ProductDB[];
  bestWeekProducts: ProductDB[];
  popularProducts: ProductDB[];
  saleProducts: ProductDB[];
}

export interface Landing {
  reviews: any[]; // Define el tipo adecuado si se conoce la estructura
  modal: ProductDB[];
  collections: Collections;
}

export interface DataStructure {
  navbar: Navbar;
  landing: Landing;
}

export interface Direction {
  id: string;
  country: string;
  city: string;
  district: string;
  address: string;
  addressReference?: string;
  postalCode?: string;
  neighborhood?: string;
  phone?: string;
}

export interface CouponUsers {
  id: string;
  active: boolean;
  coupon: Coupon;
}
export interface Coupon {
  id: string;
  title: string;
  content: string;
  discount: number;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export enum OrderStateEnum {
  APROBADO = 'APPROVED',
  PAGO = 'PAID',
  RECHAZADO = 'REJECTED',
  DESPACHO = 'DISPATCHED',
  PENDIENTE = 'PENDING',
  ENTREGADO = 'DELIVERED',
  CANCELADO = 'CANCELLED',
}

export interface Order {
  coupon: Coupon | null;
  id: number;
  total: number;
  currency: {
    name: string,
    value: number,
  }
  state: OrderStateEnum;
  createdAt: string;
  updatedAt: string;
  products: ProductDB[];
  direction: Direction;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}

export interface Favorite {
  id: string;
  product: ProductDB;
}

export interface Profile {
  favorites: Favorite[];
  genericResponseUser: {
    couponUsers: {
      active: boolean;
      coupon: Coupon;
    }[];
    cart?: {
      id: string;
      products: ProductDB;
      coupon?: Coupon;
    }[];
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    image?: string;
    directions: Direction[];
    orders: Order[];
    reviews: Review[];
  };
  token: string | null;
  rol: "admin" | "user" | null;
}

export interface User {
  id: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rol: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Review {
  id: string;
  title: string;
  review: string;
  author: string;
  type: string;
  orderId?: number;
  productId: number;
  rating: string;
  image?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  product?: ProductDB;
  show: string;
}

export interface Message {
  id: string;
  name: string;
  email?: string;
  message: string;
  category?: ContactType;
  response?: string | null;
  consultedAt: string;
  responseAt: string;
}

export enum ContactType {
  ComplaintOrClaim = 'Complaint or Claim',
  OrderHelp = 'Help with an Order',
  PageFunctionalityHelp = 'Help with Page Functionality',
  GeneralHelp = 'General Help',
}