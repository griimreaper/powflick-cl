import { create } from "zustand";
import { PersistStorage, StorageValue, persist } from "zustand/middleware";
import {
  ProductToBagType,
  ShoppingCartStoreType,
} from "./interfaces/interface";
import { Coupon, Customization } from "models/types";
import { getTotalWithDiscount } from "utils/tools";

// Adaptador de almacenamiento local
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
    localStorage.removeItem(key);
  },
};

// Función para actualizar el total del carrito
function updateCartTotal(set: any) {
  set((state: any) => ({
    ...state,
    cart: state.cart.map((prod: any) => ({
      ...prod,
      totalCustomization: parseFloat(
        prod.customizations
          .reduce(
            (acc: number, custom: Customization) => (acc += custom.price),
            0
          )
          .toFixed(2)
      ),
      amount: prod.customizations.length,
      totalProduct: Number(getTotalWithDiscount(prod.product.price, prod.customizations.length).toFixed(2)),
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

// Función para calcular el subtotal de las customizaciones de un producto
const calculateProductSubtotalCustomization = (
  customizations: Customization[]
): number => {
  return customizations.reduce(
    (totalCustomization, customization) =>
      (totalCustomization += customization.price),
    0
  );
};

// Función para manejar la lógica de agregar o actualizar un producto en el carrito
const handleSetProductInCart = (
  set: any,
  product: ProductToBagType,
  customizations: Customization[] | null,
  totalCustomization: number,
  amount: number,
  top: boolean = false
) => {
  set((state: any) => {
    const productIndex = state.cart.findIndex(
      (item: any) => item.product.id === product.id
    );
    if (productIndex !== -1) {
      const updatedCart = [...state.cart];
      const existingProduct = updatedCart[productIndex];
      existingProduct.amount = amount;
      existingProduct.top = top;

      if (customizations === null) {
        existingProduct.customizations = [];
      } else {
        existingProduct.customizations = existingProduct.customizations.filter(
          (existingCustomization: Customization) =>
            customizations.some(
              (newCustomization) =>
                newCustomization.id === existingCustomization.id
            )
        );

        customizations.forEach((customization) => {
          const existingCustomizationIndex =
            existingProduct.customizations.findIndex(
              (c: Customization) => c.id === customization.id
            );
          if (existingCustomizationIndex !== -1) {
            existingProduct.customizations[existingCustomizationIndex] =
              customization;
          } else {
            existingProduct.customizations.push(customization);
          }
        });
      }

      existingProduct.totalCustomization = totalCustomization;
      existingProduct.top = top;
      return {
        ...state,
        cart: updatedCart,
        amount,
      };
    } else {
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            product: product,
            customizations: customizations === null ? [] : customizations,
            totalCustomization: totalCustomization,
            amount,
            top,
          },
        ],
      };
    }
  });

  updateCartTotal(set);
};

// Función para manejar la lógica de eliminar una customización de un producto
const handleRemoveCustomizationFromProduct = (
  set: any,
  productId: string,
  customizationId: string
) => {
  set((state: any) => {
    let isVoid = false;
    let updatedCart = state.cart.map((product: any) => {
      if (product.product.id === productId) {
        product.customizations = product.customizations.filter(
          (customization: any) => customization.id !== customizationId
        );
        product.totalCustomization = calculateProductSubtotalCustomization(
          product.customizations
        );
      }
      if (product.customizations.length === 0) {
        isVoid = true;
      }
      return product;
    });
    if (isVoid) {
      updatedCart = state.cart.filter(
        (cartproduct: any) => cartproduct.product.id !== productId
      );
    }
    return {
      ...state,
      cart: updatedCart,
    };
  });
  updateCartTotal(set);
};

// Crear el store de Zustand
export const useShoppingCartStore = create(
  persist<ShoppingCartStoreType>(
    (set) => ({
      cart: [],
      coupon: {} as Coupon,
      total: 0,
      showCart: false,
      note: "", // Añadir el estado note
      setProductInCart: (
        product: ProductToBagType,
        customizations: Customization[] | null,
        totalCustomization: number,
        amount: number,
        top: boolean
      ) =>
        handleSetProductInCart(
          set,
          product,
          customizations,
          totalCustomization,
          amount,
          top,
        ),
      setCoupon: (coupon: Coupon | null) => {
        set((state) => ({
          ...state,
          coupon,
        }));
      },
      setNote: (note: string) => {
        set((state) => ({
          ...state,
          note,
        }));
      },
      removeCustomizationFromProduct: (
        productId: string,
        customizationId: string
      ) =>
        handleRemoveCustomizationFromProduct(set, productId, customizationId),
      removeProductById: (productId: string) => {
        set((state) => ({
          ...state,
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
        updateCartTotal(set);
      },
      clearCart: () => {
        set({ cart: [], coupon: null, total: 0, note: "" });
      },
      handleShowCart: () => {
        set((state) => ({
          ...state,
          showCart: !state.showCart,
        }));
      },
    }),
    {
      name: "shoppingCart",
      storage: localStorageAdapter,
    }
  )
);
