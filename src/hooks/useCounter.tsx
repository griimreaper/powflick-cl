import { Customization, ProductDB } from "models/types";
import { useEffect, useState } from "react";
import { initialCustomization, useCustomizationStore } from "store/customizationStore";
import { useCustomizationsStore } from "store/customizationsStore";
import { useShoppingCartStore } from "store/shoppingCart";
import { showSuccessAlert } from "utils/alerts";


export default function useCounter(product: ProductDB, addtobag = false, init = false): any {
  const [counter, setCounter] = useState<number>(1); // Estado para el contador
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const { list, trimCustomizations, setCustomizationInList } = useCustomizationsStore();
  const { setCustomization, } = useCustomizationStore();
  const { setProductInCart } = useShoppingCartStore();

  const handleAddToBagClick = () => {
    if(init) {
      init = true;
      return;
    }

    const customizations: Customization[] | null =
      list[list.findIndex((i) => i.productId === product.id)]?.customizations ?? [initialCustomization()];
    const totalCustomization: number =
      typeof list[list.findIndex((i) => i.productId === product.id)]?.total === "number"
        ? list[list.findIndex((i) => i.productId === product.id)]?.total
        : 0;
    const totalProduct: number = parseFloat(
      (Number(product.price) * counter).toFixed(2)
    );
    const productToBag = product;
    const amount = counter;

    if (counter !== 0)
      setProductInCart(
        productToBag,
        customizations,
        totalCustomization,
        totalProduct,
        amount
      );
    return {
      productToBag,
      customizations,
      totalCustomization,
      totalProduct,
      amount,
    };
  };

  const handleAddNewCustomization = (amount: number) => {
    if (amount < counter) {
      setCustomizationInList(product.id, initialCustomization());
    } else if (amount > counter) {
      trimCustomizations(product.id, counter);

      !amount
        ? null
        : list[list.findIndex((i) => i.productId === product.id)]?.customizations[
          counter - 1
        ]
          ? setCustomization(
            list[list.findIndex((i) => i.productId === product.id)]?.customizations[0]
          )
          : null;
    }
  };

  useEffect(() => {
    const amount = list?.find((i) => i.productId === product.id)?.amount;
    if (counter !== 1) {
      if (amount) {
        handleAddNewCustomization(Number(amount));
      }
    }
    if (counter === 0) {
      setCounter(1);
    }

    addtobag ? setIsSyncing(!isSyncing) : null;
  }, [counter]);

  useEffect(() => {
    handleAddToBagClick();
  }, [isSyncing]);

  const handleCounterChange = (value: number, addToBag: boolean) => {

    const newValue = Math.max(1, Math.min(99, counter + value));
    setCounter(newValue);
    console.log(counter, value, newValue);
    if (newValue === 1) {
      trimCustomizations(product.id, newValue);

      const numRandom = Math.floor(Math.random() * counter - 1);

      list[list.findIndex((i) => i.productId === product.id)]?.customizations[
        counter - 1
      ]
        ? setCustomization(
          list[list.findIndex((i) => i.productId === product.id)]?.customizations[
          numRandom >= 0 ? numRandom : 0
          ]
        )
        : null;
    }

    addtobag ? setIsSyncing(!isSyncing) : null;
  };

  return { counter, setCounter, handleCounterChange };
};