import { ProductDB } from "./types";

interface Category {
  id: string;
  name: string;
  products: ProductDB[]
}

export default Category;
