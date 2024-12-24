import { Coupon, Customization, Direction, Favorite, Message, Profile } from "models/types";

export type DashboardState = {
  profile: Profile;
  setData: (profile: Profile) => void;
  removeProfile: () => void;
  setFavorites: (favorites: Favorite[]) => void; // Definir setFavorites con el tipo correcto
  setProfileUser: (userData: Partial<Profile["genericResponseUser"]>) => void;
  addOrUpdateUserDirection: (updatedDirection: Direction) => void;
  setMessages: (messages: Message[]) => void;
};

export type CustomizationStoreType = {
  customization: Customization;
  showCustomization: boolean;
  setCustomization: (customization: Customization) => void;
  updateCustomizationAttribute: (
    attribute: keyof Customization,
    value: any
  ) => void;
  clearCustomization: () => void;
  noneCustomization: () => void;
  setFonts: (font: string) => void;
  setFontColor: (font: string) => void;
  setShowCustomization: (boolean: boolean) => void;
};

export type CustomizationsStoreType = {
  list: {
    productId: string;
    customizations: Customization[];
    amount: number;
    total: number;
  }[];
  setCustomizationInList: (
    productId: string,
    customization: Customization
  ) => void;
  setCustomizationsInList: (
    productId: string,
    newCustomizations: Customization[] | undefined
  ) => void;
  removeCustomizationById: (customizationId: string) => void;
  clearCustomization: () => void;
  trimCustomizations: (productId: string, numCustomizations: number) => void;
};

export type ProductToBagType = {
  id: string;
  title?: string;
  price: number;
  image?: string;
  category?: string;
  sport?: string;
  amount?: number;
  slug?: string;
  colors?: string[];
};

export type ShoppingCartStoreType = {
  cart: {
    product: ProductToBagType;
    customizations: Customization[];
    amount: number;
    totalProduct: number;
    totalCustomization: number;
  }[];
  coupon: Coupon | null;
  total: number;
  showCart: boolean;
  setCoupon: (coupon: Coupon) => void;
  setProductInCart: (
    product: ProductToBagType,
    customization: Customization[],
    totalCustomization: number,
    totalProduct: number,
    amount: number
  ) => void;
  removeProductById: (customizationId: string) => void;
  removeCustomizationFromProduct: (
    productId: string,
    customizationId: string
  ) => void;
  clearCart: () => void;
  handleShowCart: () => void;
};
