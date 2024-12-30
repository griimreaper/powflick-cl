import { create } from "zustand";
import { calculateCustomizationPrice } from "utils/tools";
import { deleteImage } from "services/imageStorage";
import { PersistStorage, StorageValue, persist } from 'zustand/middleware';
import { Customization } from "models/types";
import { CustomizationsStoreType } from "./interfaces/interface";

// SessionStorageAdapter handles session storage operations
const sessionStorageAdapter: PersistStorage<CustomizationsStoreType> = {
  getItem: async (key: string) => {
    const value = sessionStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as StorageValue<CustomizationsStoreType>;
  },
  setItem: async (key: string, value: StorageValue<CustomizationsStoreType>) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    sessionStorage.removeItem(key);
  }
};

// Utility function to update total price
const updateTotal = (set: any) => {
  set((state: any) => ({
    ...state,
    list: state.list.map((prod: any) => ({
      ...prod,
      total: parseFloat(prod.customizations.reduce((acc: number, custom: Customization) => acc += custom.price, 0).toFixed(2))
    }))
  }));
};

// Utility function to delete customization images
const deleteCustomizationImages = (customization: Customization) => {
  customization.frontSide.logos?.forEach((l) => deleteImage(l.logoUrl));
  customization.backSide.logos?.forEach((l) => deleteImage(l.logoUrl));
};

// Utility function to find product index by ID
const findProductIndexById = (list: any[], productId: string) => {
  return list.findIndex((prod) => prod.productId === productId);
};

// Utility function to find customization index by ID
const findCustomizationIndexById = (customizations: Customization[], customizationId: string) => {
  return customizations.findIndex((c) => c.id === customizationId);
};

export const useCustomizationsStore = create(
  persist<CustomizationsStoreType>(
    (set) => ({
      list: [],
      setCustomizationInList: (productId: string, customization: Customization) => {
        set((state) => {
          const existingProductIndex = findProductIndexById(state.list, productId);
          const price = calculateCustomizationPrice(customization);
          const todosLosIds: string[] = state.list.flatMap(item => item.customizations.map(customizacion => customizacion.id));

          customization = { ...customization, price };

          if (existingProductIndex !== -1) {
            const existingCustomizationIndex = findCustomizationIndexById(state.list[existingProductIndex].customizations, customization.id);
            if (existingCustomizationIndex !== -1) {
              return {
                ...state,
                list: state.list.map((prod, index) => {
                  if (index === existingProductIndex) {
                    return {
                      ...prod,
                      customizations: prod.customizations.map((c) => c.id === customization.id ? customization : c),
                      amount: prod.customizations.length,
                      total: 0
                    };
                  }
                  return prod;
                }),
              };
            } else {
              if (todosLosIds.includes(customization.id)) {
                return state;
              }
              return {
                ...state,
                list: state.list.map((prod, index) => {
                  if (index === existingProductIndex) {
                    return {
                      ...prod,
                      customizations: [...prod.customizations, customization],
                      amount: prod.customizations.length + 1,
                      total: 0
                    };
                  }
                  return prod;
                }),
              };
            }
          } else {
            if (todosLosIds.includes(customization.id)) {
              return state;
            }
            return {
              ...state,
              list: [
                ...state.list,
                {
                  productId: productId,
                  customizations: [customization],
                  amount: 1,
                  total: 0
                },
              ],
            };
          }
        });
        updateTotal(set);
      },
      setCustomizationsInList: (productId: string, newCustomizations: Customization[] | undefined) => {
        set((state) => ({
          ...state,
          list: state.list.map((prod) => {
            if (prod.productId === productId && newCustomizations) {
              return {
                ...prod,
                customizations: newCustomizations.map((customization) => ({
                  ...customization,
                  price: calculateCustomizationPrice(customization)
                })),
                amount: newCustomizations.length,
                total: 0
              };
            }
            return prod;
          }),
        }));
        updateTotal(set);
      },
      removeCustomizationById: (customizationId: string) => {
        set((state) => ({
          ...state,
          list: state.list.map((prod) => {
            const customizationsToRemove = prod.customizations.find((c) => c.id === customizationId);
            if (customizationsToRemove) {
              deleteCustomizationImages(customizationsToRemove);
            }
            const updatedCustomizations = prod.customizations.filter((c) => c.id !== customizationId);
            return {
              ...prod,
              customizations: updatedCustomizations,
              amount: updatedCustomizations.length
            };
          }),
        }));
        updateTotal(set);
      },
      trimCustomizations: (productId: string, numCustomizations: number) => {
        set((state) => ({
          ...state,
          list: state.list.map((prod) => {
            if (prod.productId === productId) {
              const customizations = prod.customizations.slice(0, numCustomizations);
              return {
                ...prod,
                customizations,
                amount: customizations.length
              };
            }
            return prod;
          }),
        }));
        updateTotal(set);
      },
      clearCustomization: () => {
        set({ list: [] });
      },
    }),
    {
      name: 'customizations-store',
      storage: sessionStorageAdapter,
    }
  )
);
