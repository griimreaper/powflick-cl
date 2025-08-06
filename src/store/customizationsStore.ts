import { create } from "zustand";
import { calculateCustomizationPrice } from "utils/tools";
import { deleteImage } from "services/imageStorage";
import { PersistStorage, StorageValue, persist } from 'zustand/middleware';
import { Customization, Number, Text } from "models/types";
import { CustomizationsStoreType } from "./interfaces/interface";
import { initialCustomization } from "./customizationStore";

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
      setCustomizationInList: (
        productId: string,
        customization: Customization,
        isTopSelected?: boolean // 👈 ahora es opcional
      ) => {
        set((state) => {
          const existingProductIndex = findProductIndexById(state.list, productId);
          const price = calculateCustomizationPrice(customization);
          const todosLosIds: string[] = state.list.flatMap(item =>
            item.customizations.map(customizacion => customizacion.id)
          );

          customization = { ...customization, price };

          if (existingProductIndex !== -1) {
            const existingCustomizationIndex = findCustomizationIndexById(
              state.list[existingProductIndex].customizations,
              customization.id
            );

            if (existingCustomizationIndex !== -1) {
              return {
                ...state,
                list: state.list.map((prod, index) => {
                  if (index === existingProductIndex) {
                    return {
                      ...prod,
                      customizations: prod.customizations.map((c) =>
                        c.id === customization.id ? customization : c
                      ),
                      amount: prod.customizations.length,
                      isTopSelected: prod.isTopSelected,
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
                      isTopSelected: prod.isTopSelected,
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

            // 👇 si no se pasa isTopSelected, tomar el del primer producto o false por defecto
            const fallbackTopSelected = state.list[0]?.isTopSelected ?? false;

            return {
              ...state,
              list: [
                ...state.list,
                {
                  productId: productId,
                  customizations: [customization],
                  isTopSelected: isTopSelected ?? fallbackTopSelected, // 👈 asignación por defecto
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
        set((state) => {
          const newState = {
            ...state,
            list: state.list.map((prod) => {
              const customizationsToRemove = prod.customizations.find((c) => c.id === customizationId);
              if (customizationsToRemove) {
                deleteCustomizationImages(customizationsToRemove);
              }
              const updatedCustomizations = prod.customizations.filter((c) => c.id !== customizationId);

              // Verificamos si las customizaciones son menores a 20
              if (updatedCustomizations.length < 20) {
                // Asignamos el valor "socks" a todas las customizaciones si son menos de 20
                updatedCustomizations.forEach((customization) => {
                  customization.socks = 'No Socks (+$0.00)';  // Default "socks"
                });
              }

              return {
                ...prod,
                customizations: updatedCustomizations,
                amount: updatedCustomizations.length
              };
            }),
          };

          return newState;
        });
        updateTotal(set);
      },
      addCustomizations: (productId: string, numCustomizations: number) => {
        set((state) => {
          const newState = {
            ...state,
            list: state.list.map((prod) => {
              if (prod.productId === productId) {
                let currentCustomizations = [...prod.customizations];

                // Si hay menos customizaciones de las necesarias, agregamos más
                while (currentCustomizations.length < numCustomizations) {
                  currentCustomizations.push({
                    ...initialCustomization(),
                  });
                }

                return {
                  ...prod,
                  customizations: currentCustomizations,
                  amount: currentCustomizations.length,
                };
              }
              return prod;
            }),
          };

          return newState;
        });
        updateTotal(set);
      },
      trimCustomizations: (productId: string, numCustomizations: number) => {
        set((state) => {
          const newState = {
            ...state,
            list: state.list.map((prod) => {
              if (prod.productId === productId) {
                const customizations = prod.customizations.slice(0, numCustomizations);

                // Si el número de customizaciones es menor a 20, asignamos el valor "socks" a todas
                if (customizations.length < 20) {
                  customizations.forEach((customization) => {
                    customization.socks = 'No Socks (+$0.00)';  // Default "socks"
                  });
                }

                return {
                  ...prod,
                  customizations,
                  amount: customizations.length
                };
              }
              return prod;
            }),
          };

          return newState;
        });
        updateTotal(set);
      },
      setFieldForAllCustomizations: (productId: string, name: keyof Customization, value: string) => {
        set((state) => {
          const product = state.list.find((item) => item.productId === productId);

          if (!product) return state;

          const updatedCustomizations = product.customizations.map((customization) => ({
            ...customization,
            [name]: value,
          }));

          return {
            ...state,
            list: state.list.map((item) =>
              item.productId === productId
                ? {
                  ...item,
                  customizations: updatedCustomizations.map((customization) => ({
                    ...customization,
                    price: calculateCustomizationPrice(customization),
                  })),
                  amount: updatedCustomizations.length,
                  total: 0,
                }
                : item
            ),
          };
        });

        updateTotal(set);
      },
      generateCustomizationsFromSizeMap: (
        productId: string,
        customizationsBySize: {
          [size: string]: { number?: string; name?: string }[];
        },
        font = 'Arial',
        fontColor = '#000000',
        isTopSelected?: boolean
      ) => {
        const newCustomizations: Customization[] = [];

        function estimateCenterX(charCount: number, fontSize: number): number {
          const charWidthEstimate = fontSize * 0.5; // aproximado
          const textWidth = charCount * charWidthEstimate;
          return (500 - textWidth) / 2; // centrado en imagen de 640px
        }

        function getFittedFontSize(text: string, maxWidth: number, baseFontSize: number): number {
          if (!text) return baseFontSize;

          const estimatedCharWidth = baseFontSize * 0.6; // estimación promedio
          const estimatedWidth = text.length * estimatedCharWidth;

          if (estimatedWidth <= maxWidth) return baseFontSize;

          // Ajustamos proporcionalmente
          const scaleFactor = maxWidth / estimatedWidth;
          return Math.floor(baseFontSize * scaleFactor);
        }

        Object.entries(customizationsBySize).forEach(([size, items]) => {
          items
            .forEach(item => {
              const customization = initialCustomization();

              const numberText = item.number ?? "";
              const nameText = item.name ?? "";

              const numberSize = getFittedFontSize(numberText, 170, 120);
              const textSize = getFittedFontSize(nameText, 170, 50);

              const numberX = estimateCenterX(numberText.length, numberSize);
              const textX = estimateCenterX(nameText.length, textSize);

              customization.size = size;
              customization.shorts = isTopSelected ? 'No Shorts (-$10.00)' : 'Default (+$0.00)';

              customization.backSide.numbers = item.number
                ? [{
                  number: numberText,
                  font,
                  numberPosition: { x: numberX, y: 120 },
                  numberDragOffset: { x: 0, y: 0 },
                  numberSize,
                  numberColor: fontColor,
                  rotate: 0,
                }]
                : [];

              customization.backSide.texts = item.name
                ? [{
                  text: nameText,
                  font,
                  textPosition: { x: textX, y: 50 },
                  textDragOffset: { x: 0, y: 0 },
                  textSize,
                  textColor: fontColor,
                  rotate: 0,
                }]
                : [];

              customization.price = calculateCustomizationPrice(customization);

              newCustomizations.push(customization);
            });
        });

        set(state => {
          const existingIndex = state.list.findIndex(p => p.productId === productId);

          if (existingIndex !== -1) {
            const newList = [...state.list];
            newList[existingIndex] = {
              ...newList[existingIndex],
              customizations: newCustomizations,
              amount: newCustomizations.length,
              isTopSelected: isTopSelected ?? newList[existingIndex].isTopSelected,
              total: 0,
            };
            return { ...state, list: newList };
          } else {
            return {
              ...state,
              list: [
                ...state.list,
                {
                  productId,
                  customizations: newCustomizations,
                  amount: newCustomizations.length,
                  isTopSelected: isTopSelected ?? false,
                  total: 0,
                }
              ],
            };
          }
        });

        updateTotal(set);
      },
      updateCustomizationField: (
        productId: string,
        customizationId: string,
        side: 'frontSide' | 'backSide',
        type: 'texts' | 'numbers',
        index: number,
        value: string | undefined
      ) => {
        set((state) => {
          const updatedList = state.list.map((prod) => {
            if (prod.productId !== productId) return prod;

            const updatedCustomizations = prod.customizations.map((custom) => {
              if (custom.id !== customizationId) return custom;

              const sideData = { ...custom[side] };

              let elements = type === "texts"
                ? [...(sideData.texts as Text[])]
                : [...(sideData.numbers as Number[])];

              const base = elements[0];
              if (!base) return custom;

              // Si value es undefined, eliminar el elemento en index (pero no el base)
              if (value === undefined) {
                if (index === 0) {
                  // No eliminar base, solo limpiar su valor
                  elements[0] = type === "texts" ? { ...base, text: "" } : { ...base, number: "" };
                } else if (index < elements.length) {
                  elements.splice(index, 1);
                }
              } else {
                // Rellenar huecos si faltan
                for (let i = 0; i < index; i++) {
                  if (!elements[i]) {
                    elements[i] = type === "texts"
                      ? { ...base, text: "" }
                      : { ...base, number: "" };
                  }
                }
                // Insertar o actualizar
                elements[index] = type === "texts"
                  ? { ...base, text: value }
                  : { ...base, number: value };
              }

              // Actualizar sideData con nuevo array
              if (type === "texts") {
                sideData.texts = elements as Text[];
              } else {
                sideData.numbers = elements as Number[];
              }

              return {
                ...custom,
                [side]: sideData,
              };
            });

            return {
              ...prod,
              customizations: updatedCustomizations,
            };
          });

          return {
            list: updatedList,
          };
        });

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
