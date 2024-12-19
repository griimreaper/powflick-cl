import { Customization, Direction, Favorite, Message, Profile } from "models/types";

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
