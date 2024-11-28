import Shop from "./Shop.model";
import Review from "./Review.model";

interface Product {
  id: string; // Identificador único del producto
  title: string; // Título del producto
  content: string; // Descripción completa del producto
  short_description: string; // Descripción corta del producto (puede ser vacío)
  date: string; // Fecha de creación o actualización del producto
  price: number; // Precio actual del producto
  regular_price: number; // Precio regular del producto
  discount: number; // Descuento aplicado al producto
  stock_status: "instock" | "outofstock"; // Estado de inventario
  stock: number; // Cantidad de stock disponible
  selled: number; // Cantidad vendida (puede ser nula)
  product_categories: string; // Categorías del producto separadas por '|'
  sports: string;
  colors: string | null; // Colores disponibles (puede ser nulo)
  status: "publish" | "draft"; // Estado de publicación del producto
  URL: string; // URL de la imagen del producto
  images: string[]; // Array de URLs de imágenes del producto
  slug: string; // Slug (parte de la URL) del producto
  featured: boolean; // Indica si el producto es destacado
  mostSold: boolean; // Indica si el producto es el más vendido
  createdAt: string; // Fecha de creación del producto
  updatedAt: string; // Fecha de última actualización del producto
  quantityPurchase: number;
}

export default Product;
