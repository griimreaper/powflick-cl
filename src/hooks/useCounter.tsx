import { useEffect, useState } from "react";
import { initialCustomization, useCustomizationStore } from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";
import { useShoppingCartStore } from "store/shoppingCart";

export default function useCounter(id: string): any {
  const [counter, setCounter] = useState<number>(1); // Estado para el contador
  const { list, trimCustomizations, setCustomizationInList } =
    useCustomizationsStore();
  const {

    setCustomization,

  } = useCustomizationStore();


  const handleAddNewCustomization = (amount: number) => {
    if (amount < counter) {
      setCustomizationInList(id, initialCustomization());
    } else if (amount > counter) {
      trimCustomizations(id, counter);

      !amount
        ? null
        : list[list.findIndex((i) => i.productId === id)]?.customizations[
          counter - 1
        ]
          ? setCustomization(
            list[list.findIndex((i) => i.productId === id)]?.customizations[0]
          )
          : null;
    }
  };


  useEffect(() => {
    const amount = list?.find((i) => i.productId === id)?.amount;
    if (counter !== 1) {
      if (amount) {
        handleAddNewCustomization(Number(amount));
      }
    }
    if (counter === 0) {
      setCounter(1);
    }

  }, [counter]);


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

  return {counter, setCounter, handleCounterChange};
};