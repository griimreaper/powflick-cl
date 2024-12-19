import { useState } from "react";
import { useCustomizationsStore, useCustomizationStore } from "store/customizations";


export default function useCounter(id: string):any {
  const [counter, setCounter] = useState<number>(1); // Estado para el contador
    const { list, trimCustomizations } =
    useCustomizationsStore();
      const {
 
    setCustomization,

  } = useCustomizationStore();

  let handleCounterChange = (value: number) => {
  
    const newValue = Math.max(1, Math.min(99, counter + value));
    setCounter(newValue);
    if (newValue === 1) {
      trimCustomizations(id, newValue);

      const numRandom = Math.floor(Math.random() * counter - 1);

      list[list.findIndex((i) => i.productId === id)]?.customizations[
        counter - 1
      ]
        ? setCustomization(
            list[list.findIndex((i) => i.productId === id)]?.customizations[
              numRandom >= 0 ? numRandom : 0
            ]
          )
        : null;
    }
  };

    return [counter, setCounter, handleCounterChange];
};