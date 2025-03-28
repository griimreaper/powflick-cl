export interface ProductFilters {
  search: any;
  page: number;
  brand: string[];
  color: string[];
  sales: string[];
  price: number[];
  rating: number;
  category: string[];
  collection: string[];
  tag: string[];
  featured: true | false | undefined
  discount: true | false | undefined
  mostSold: true | false | undefined
  order: string
}

export type ProductFilterKeys = keyof ProductFilters;
export type ProductFilterValues = ProductFilters[ProductFilterKeys];
