import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { calculateCustomizationPrice } from "utils/tools";
import { deleteImage } from "services/imageStorage";
import { PersistStorage, StorageValue, persist } from 'zustand/middleware';
import { Customization, Number, Text } from "models/types";
import { CustomizationsStoreType, CustomizationStoreType } from "./interfaces/interface";

export const initialCustomization = () => {
  const font = 'Arial'
  return {
    id: uuidv4(),
    userId: '', // Asegúrate de proporcionar un userId cuando uses esta función
    productId: '', // Asegúrate de proporcionar un productId cuando uses esta función
    price: 0,
    size: 'XS-MEN',
    frontSide: {
      logos: [
        {
          logoUrl: '',
          logoId: '',
          logoPosition: { x: 0, y: 0 },
          logoSize: 80,
          rotate: 0,
        }
      ],
      texts: [
        {
          text: '',
          font,
          textPosition: { x: 150, y: 150 },
          textSize: 24,
          textColor: 'black',
          rotate: 0,
        }
      ],
      numbers: [
        {
          number: '',
          font,
          numberPosition: { x: 200, y: 200 },
          numberSize: 50,
          numberColor: 'black',
          rotate: 0,
        }
      ],
    },
    backSide: {
      logos: [
        {
          logoUrl: '',
          logoId: '',
          logoPosition: { x: 0, y: 0 },
          logoSize: 80,
          rotate: 0,
        }
      ],
      texts: [
        {
          text: '',
          font,
          textPosition: { x: 80, y: 100 },
          textSize: 24,
          textColor: 'black',
          rotate: 0,
        }
      ],
      numbers: [
        {
          number: '',
          font,
          numberPosition: { x: 200, y: 200 },
          numberSize: 50,
          numberColor: 'black',
          rotate: 0,
        }
      ],
    },
    sleeve: 'Default',
    neck: 'Default',
    socks: 'No Socks (+$0.00)',
    pants: 'None (+$0.00)',
    shorts: 'No Shorts (+$0.00)',
    materials: 'None',
    designName: '',
  }
}

const sessionStorageCAdapter: PersistStorage<CustomizationStoreType> = {
  getItem: async (key: string) => {
    const value = sessionStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as StorageValue<CustomizationStoreType>;
  },
  setItem: async (key: string, value: StorageValue<CustomizationStoreType>) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    sessionStorage.removeItem(key); // Implementar la lógica para eliminar un elemento del almacenamiento
  }
};

export const useCustomizationStore = create(
  persist<CustomizationStoreType>(
    (set) => ({
      customization: {
        id: 'none',
        price: 0,
        size: 'XS-MEN',
        frontSide: {
          logos: [
            {
              logoUrl: '',
              logoId: '',
              logoPosition: { x: 0, y: 0 },
              logoSize: 80,
              rotate: 0,
            }
          ],
          texts: [
            {
              text: '',
              font: '',
              textPosition: { x: 80, y: 100 },
              textSize: 24,
              textColor: 'black',
              rotate: 0,
            }
          ],
          numbers: [
            {
              number: '',
              font: '',
              numberPosition: { x: 200, y: 200 },
              numberSize: 50,
              numberColor: 'black',
              rotate: 0,
            }
          ],
        },
        backSide: {
          logos: [
            {
              logoUrl: '',
              logoId: '',
              logoPosition: { x: 200, y: 200 },
              logoSize: 80,
              rotate: 0,
            }
          ],
          texts: [
            {
              text: '',
              font: '',
              textPosition: { x: 80, y: 100 },
              textSize: 24,
              textColor: 'black',
              rotate: 0,
            }
          ],
          numbers: [
            {
              number: '',
              font: '',
              numberPosition: { x: 200, y: 200 },
              numberSize: 50,
              numberColor: 'black',
              rotate: 0,
            }
          ],
        },
        sleeve: 'Default',
        neck: 'Default',
        socks: 'No Socks (+$0.00)',
        pants: 'None (+$0.00)',
        shorts: 'No Shorts (+$0.00)',
        materials: 'None',
      },
      showCustomization: false,
      setCustomization: (customization: Customization) => {
        set({ customization });
      },
      updateCustomizationAttribute: (attribute: keyof Customization | string, value: any) => {
        set((state) => {
          if (state.customization) {
            return {
              customization: {
                ...state.customization,
                [attribute]: value,
              },
            };
          }
          return state;
        });
        calculatePrice(set)
      },
      noneCustomization: () => {
        set((state) => {
          return {
            customization: {
              ...state.customization,
              id: 'none'
            }
          }
        })
      },
      clearCustomization: () => {
        set({ customization: initialCustomization() });
      },
      setFonts: (font) => {
        set((state: any) => {
          const updateFont = (items: Array<Text | Number>) => {
            const updatedItems = items.map((item) => ({
              ...item,
              font,
            }));
            return updatedItems;
          };

          const updatedCustomization = {
            ...state.customization,
            frontSide: {
              ...state.customization.frontSide,
              texts: updateFont(state.customization.frontSide.texts),
              numbers: updateFont(state.customization.frontSide.numbers),
            },
            backSide: {
              ...state.customization.backSide,
              texts: updateFont(state.customization.backSide.texts),
              numbers: updateFont(state.customization.backSide.numbers),
            },
          };

          return {
            customization: updatedCustomization,
          };
        });
      },
      setFontColor: (fontColor: string) => {
        set((state) => {
          const updateColors = (texts: Array<Text>, numbers: Array<Number>) => {
            const updatedTexts = texts.map((item) => ({
              ...item,
              textColor: fontColor, // Actualizar color del texto
            }));
            const updatedNumbers = numbers.map((item) => ({
              ...item,
              numberColor: fontColor, // Actualizar color del número
            }));
            return { texts: updatedTexts, numbers: updatedNumbers };
          };

          const updatedCustomization = {
            ...state.customization,
            frontSide: {
              ...state.customization.frontSide,
              ...updateColors(state.customization.frontSide.texts, state.customization.frontSide.numbers),
            },
            backSide: {
              ...state.customization.backSide,
              ...updateColors(state.customization.backSide.texts, state.customization.backSide.numbers),
            },
          };

          return {
            customization: updatedCustomization,
          };
        });
      },
      setShowCustomization: (boolean: boolean) => {
        set((state) => {
          if (boolean !== null) {
            return {
              ...state,
              showCustomization: boolean
            }
          } else {
            return {
              ...state,
              showCustomization: !state.showCustomization
            }
          }
        })
      },
    }),
    {
      name: 'customization-store', // Nombre del almacén persistente
      storage: sessionStorageCAdapter, // Almacenamiento en sessionStorage
    }
  )
);

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
    sessionStorage.removeItem(key); // Implementar la lógica para eliminar un elemento del almacenamiento
  }
};

// Creación del hook de Zustand con persistencia
export const useCustomizationsStore = create(
  persist<CustomizationsStoreType>(
    (set) => ({
      list: [],
      setCustomizationInList: (productId: string, customization: Customization) => {
        set((state) => {
          const existingProductIndex = state.list.findIndex((prod) => prod.productId === productId);
          const price = calculateCustomizationPrice(customization);
          const todosLosIds: string[] = state.list.flatMap(item => item.customizations.map(customizacion => customizacion.id));

          customization = { ...customization, price };

          if (existingProductIndex !== -1) {
            // Verificar si la personalización ya existe
            const existingCustomizationIndex = state.list[existingProductIndex].customizations.findIndex((c) => c.id === customization.id);
            if (existingCustomizationIndex !== -1) {

              // La personalización ya existe, actualizarla
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
              // La personalización no existe, agregarla a la lista
              if (todosLosIds.includes(customization.id)) {
                return state
              } //si el id es el mismo que otra personalizacion no se agrega
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
            // No hay ninguna personalización para este producto, agregar una nueva entrada a la lista
            if (todosLosIds.includes(customization.id)) {
              return state
            } //si el id es el mismo que otra personalizacion no se agrega
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
                customizations: newCustomizations.map((customization) =>
                  customization = {
                    ...customization,
                    price: calculateCustomizationPrice(customization)
                  }), // Reemplazar las customizaciones antiguas con las nuevas
                amount: newCustomizations.length,
                total: 0 // Puedes necesitar recalcular el total aquí si es necesario
              };
            }
            return prod;
          }),
        }));
        updateTotal(set); // Actualizar el total después de establecer las nuevas customizaciones
      },
      removeCustomizationById: (customizationId: string) => {
        set((state) => ({
          ...state,
          list: state.list.map((prod) => {
            //eliminar logotipo de cloudinary
            const customizationsToRemove = prod.customizations.find((c) => c.id === customizationId);
            if (customizationsToRemove?.frontSide.logos) {
              customizationsToRemove.frontSide.logos.forEach((l) => {
                deleteImage(l.logoUrl);
              })
            }
            if (customizationsToRemove?.backSide.logos) {
              customizationsToRemove.backSide.logos.forEach((l) => {
                deleteImage(l.logoUrl);
              })
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
              const customizations = prod.customizations.slice(0, numCustomizations); // Recortar el array de customizaciones
              return {
                ...prod,
                customizations,
                amount: customizations.length
              };
            }
            return prod;
          }),
        }));
        updateTotal(set); // Actualizar el total después de recortar las customizaciones
      },
      clearCustomization: () => {
        set({ list: [] }); // Elimina todas las personalizaciones
      },
    }),
    {
      name: 'customizations-store', // Nombre del almacén persistente
      storage: sessionStorageAdapter, // Almacenamiento en sessionStorage
    }
  )
);

function updateTotal(set: any) {
  set((state: any) => ({
    ...state,
    list: state.list.map((prod: any) => ({
      ...prod,
      total: parseFloat(prod.customizations.reduce((acc: number, custom:Customization) => acc += custom.price, 0).toFixed(2))
    }))
  }));
}

function calculatePrice(set: any) {
  set((state: any) => ({
    ...state,
    customization: {
      ...state.customization,
      price: calculateCustomizationPrice(state.customization as Customization)
    }
  }))
}