import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { calculateCustomizationPrice } from "utils/tools";
import { PersistStorage, StorageValue, persist } from "zustand/middleware";
import { Customization, Number, Text } from "models/types";
import { CustomizationStoreType } from "./interfaces/interface";

// Función para inicializar logos
const initialLogos = () => [
  {
    logoUrl: "",
    logoId: "",
    logoPosition: { x: 0, y: 0 },
    logoSize: 80,
    rotate: 0,
  },
];

// Función para inicializar textos
const initialTexts = (font: string) => [
  {
    text: "",
    font,
    textPosition: { x: 150, y: 150 },
    textSize: 24,
    textColor: "black",
    rotate: 0,
  },
];

// Función para inicializar números
const initialNumbers = (font: string) => [
  {
    number: "",
    font,
    numberPosition: { x: 200, y: 200 },
    numberSize: 50,
    numberColor: "black",
    rotate: 0,
  },
];

export const initialCustomization = () => {
  const font = "Arial";
  return {
    id: uuidv4(),
    userId: "",
    productId: "",
    price: 0,
    size: "XS-MEN",
    frontSide: {
      logos: initialLogos(),
      texts: initialTexts(font),
      numbers: initialNumbers(font),
    },
    backSide: {
      logos: initialLogos(),
      texts: initialTexts(font),
      numbers: initialNumbers(font),
    },
    sleeve: "Default",
    neck: "Crew Neck (+$0.00)",
    socks: "No Socks (+$0.00)",
    pants: "None (+$0.00)",
    shorts: "Default (+$0.00)",
    materials: "LitePlay (+$0.00)",
    designName: "",
  };
};

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
    sessionStorage.removeItem(key);
  },
};

const updateFont = (items: Array<Text | Number>, font: string) => {
  return items.map((item) => ({
    ...item,
    font,
  }));
};

const updateColors = (
  texts: Array<Text>,
  numbers: Array<Number>,
  fontColor: string
) => {
  const updatedTexts = texts.map((item) => ({
    ...item,
    textColor: fontColor,
  }));
  const updatedNumbers = numbers.map((item) => ({
    ...item,
    numberColor: fontColor,
  }));
  return { texts: updatedTexts, numbers: updatedNumbers };
};

const calculatePrice = (set: any) => {
  set((state: any) => ({
    ...state,
    customization: {
      ...state.customization,
      price: calculateCustomizationPrice(state.customization as Customization),
    },
  }));
};

export const useCustomizationStore = create(
  persist<CustomizationStoreType>(
    (set) => ({
      customization: initialCustomization(),
      showCustomization: false,
      setCustomization: (customization: Customization) => {
        set({ customization });
        calculatePrice(set);
      },
      updateCustomizationAttribute: (
        attribute: keyof Customization | string,
        value: any
      ) => {
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
        calculatePrice(set);
      },
      noneCustomization: () => {
        set((state) => ({
          customization: {
            ...state.customization,
            id: "none",
          },
        }));
      },
      clearCustomization: () => {
        set({ customization: initialCustomization() });
      },
      setFonts: (font) => {
        set((state: any) => {
          const updatedCustomization = {
            ...state.customization,
            frontSide: {
              ...state.customization.frontSide,
              texts: updateFont(state.customization.frontSide.texts, font),
              numbers: updateFont(state.customization.frontSide.numbers, font),
            },
            backSide: {
              ...state.customization.backSide,
              texts: updateFont(state.customization.backSide.texts, font),
              numbers: updateFont(state.customization.backSide.numbers, font),
            },
          };
          return { customization: updatedCustomization };
        });
      },
      setFontColor: (fontColor: string) => {
        set((state) => {
          const updatedCustomization = {
            ...state.customization,
            frontSide: {
              ...state.customization.frontSide,
              ...updateColors(
                state.customization.frontSide.texts,
                state.customization.frontSide.numbers,
                fontColor
              ),
            },
            backSide: {
              ...state.customization.backSide,
              ...updateColors(
                state.customization.backSide.texts,
                state.customization.backSide.numbers,
                fontColor
              ),
            },
          };
          return { customization: updatedCustomization };
        });
      },
      setShowCustomization: (boolean: boolean) => {
        set((state) => ({
          ...state,
          showCustomization:
            boolean !== null ? boolean : !state.showCustomization,
        }));
      },
    }),
    {
      name: "customization-store",
      storage: sessionStorageCAdapter,
    }
  )
);
