export interface ProductFilters {
  search: any;
  brand: string[];
  color: string[];
  sales: string[];
  price: number[];
  rating: number;
  category: string[];
  collection: string[];
}

export type ProductFilterKeys = keyof ProductFilters;
export type ProductFilterValues = ProductFilters[ProductFilterKeys];
