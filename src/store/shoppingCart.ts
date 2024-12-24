import { create } from "zustand";
import { PersistStorage, StorageValue, persist } from "zustand/middleware";
import { ProductToBagType, ShoppingCartStoreType } from "./interfaces/interface";
import { Coupon, Customization } from "models/types";


const localStorageAdapter: PersistStorage<ShoppingCartStoreType> = {
  getItem: async (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as StorageValue<ShoppingCartStoreType>;
  },
  setItem: async (key: string, value: StorageValue<ShoppingCartStoreType>) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    localStorage.removeItem(key); // Implementar la lógica para eliminar un elemento del almacenamiento
  },
};

export const useShoppingCartStore = create(
  persist<ShoppingCartStoreType>(
    (set) => ({
      cart: [],
      coupon: {} as Coupon,
      total: 0,
      showCart: false,
      setProductInCart: (
        product: ProductToBagType,
        customizations: Customization[] | null,
        totalCustomization: number,
        totalProduct: number,
        amount: number
      ) => {
        set((state) => {
          const productIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
          );
          if (productIndex !== -1) {
            // El producto ya está en el carrito
            const updatedCart = [...state.cart];
            const existingProduct = updatedCart[productIndex];
            existingProduct.amount = amount;

            if (customizations === null) {
              // Si customizations es null, eliminar todas las customizaciones del producto
              existingProduct.customizations = [];
            } else {
              // Eliminar customizaciones si el nuevo array es más corto
              existingProduct.customizations =
                existingProduct.customizations.filter((existingCustomization) =>
                  customizations.some(
                    (newCustomization) =>
                      newCustomization.id === existingCustomization.id
                  )
                );

              // Actualizar o agregar customizaciones
              customizations.forEach((customization) => {
                const existingCustomizationIndex =
                  existingProduct.customizations.findIndex(
                    (c) => c.id === customization.id
                  );
                if (existingCustomizationIndex !== -1) {
                  // La customización ya existe, actualízala
                  existingProduct.customizations[existingCustomizationIndex] =
                    customization;
                } else {
                  // La customización no existe, agrégala
                  existingProduct.customizations.push(customization);
                }
              });
            }

            existingProduct.totalProduct = totalProduct;
            existingProduct.totalCustomization = totalCustomization; // Actualiza el total de customizaciones del producto
            return {
              ...state,
              cart: updatedCart,
              amount,
            };
          } else {
            // El producto no está en el carrito, agrégalo
            return {
              ...state,
              cart: [
                ...state.cart,
                {
                  product: product,
                  customizations: customizations === null ? [] : customizations,
                  totalCustomization: totalCustomization,
                  totalProduct: totalProduct,
                  amount,
                },
              ],
            };
          }
        });

        // Actualizar el total después de agregar un producto al carrito
        updateCartTotal(set);
      },

      setCoupon: (coupon: Coupon) => {
        set((state) => ({
          ...state,
          coupon,
        }));
      },

      removeCustomizationFromProduct: (
        productId: string,
        customizationId: string
      ) => {
        set((state) => {
          let isVoid = false;
          let updatedCart = state.cart.map((product) => {
            if (product.product.id === productId) {
              // Filtrar las customizaciones del producto para eliminar la que coincida con customizationId
              product.customizations = product.customizations.filter(
                (customization) => customization.id !== customizationId
              );
              // Actualizar el subtotal del producto si es necesario
              product.totalCustomization =
                calculateProductSubtotalCustomization(product.customizations);
            }
            if (product.customizations.length === 0) {
              isVoid = true;
            }
            return product;
          });
          if (isVoid) {
            updatedCart = state.cart.filter(
              (cartproduct) => cartproduct.product.id !== productId
            );
          }
          return {
            ...state,
            cart: updatedCart,
          };
        });
        // Actualizar el total después de eliminar una customización del producto
        updateCartTotal(set);
      },
      removeProductById: (productId: string) => {
        set((state) => ({
          ...state,
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
        // Actualizar el total después de eliminar un producto del carrito
        updateCartTotal(set);
      },
      clearCart: () => {
        set({ cart: [], coupon: null, total: 0 });
      },
      handleShowCart: () => {
        set((state) => {
          return {
            ...state,
            showCart: !state.showCart,
          };
        });
      },
    }),
    {
      name: "shoppingCart", // Nombre de la persistencia
      storage: localStorageAdapter, // Almacenamiento en localStorage
    }
  )
);

function updateCartTotal(set: any) {
  set((state: any) => ({
    ...state,
    cart: state.cart.map((prod: any) => ({
      ...prod,
      totalCustomization: parseFloat(
        prod.customizations
          .reduce((acc: number, custom: Customization) => (acc += custom.price), 0)
          .toFixed(2)
      ),
      amount: prod.customizations.length,
      totalProduct: parseFloat((prod.product.price * prod.amount).toFixed(2)),
    })),
    total: parseFloat(
      state.cart
        .reduce(
          (acc: number, { totalCustomization, totalProduct }: any) =>
            (acc += totalCustomization + totalProduct),
          0
        )
        .toFixed(2)
    ),
  }));
}

const calculateProductSubtotalCustomization = (
  customizations: Customization[]
): number => {
  return customizations.reduce(
    (totalCustomization, customization) =>
      (totalCustomization += customization.price),
    0
  );
};
