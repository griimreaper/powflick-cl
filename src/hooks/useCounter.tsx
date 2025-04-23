import { useState, useEffect } from "react";
import { useCustomizationsStore } from "store/customizationsStore";

export const useCounter = (productId: string, initialValue = 1) => {
  const [counter, setCounter] = useState(initialValue);
  const { addCustomizations, trimCustomizations } = useCustomizationsStore();

  const handleInputChange = (newValue: number) => {
    if (newValue === 0) {
      // Si el valor es 0, elimina todas las customizaciones
      trimCustomizations(productId, 1);
      setCounter(newValue); // Establece el contador en 0
    } else if (newValue > 0 && newValue <= 999) { // Verifica si el valor está dentro del rango permitido
      const previousValue = counter;

      // Si el valor es mayor que el contador actual, agrega las customizaciones
      if (newValue > previousValue) {
        addCustomizations(productId, newValue);
      }
      // Si el valor es menor que el contador actual, elimina las customizaciones
      else if (newValue < previousValue) {
        trimCustomizations(productId, newValue);
      }

      setCounter(newValue); // Actualiza el contador
    }
  };

  const increment = () => {
    if (counter < 30) { // Solo incrementa si el contador es menor a 30
      const newCounter = counter + 1;
      setCounter(newCounter); // Actualiza el contador
      addCustomizations(productId, newCounter); // Agrega la customización al incrementar
    }
  };

  const decrement = () => {
    if (counter > 1) { // Solo decrementa si el contador es mayor a 1
      const newCounter = counter - 1;
      setCounter(newCounter); // Actualiza el contador
      trimCustomizations(productId, newCounter); // Elimina customización al decrementar
    }
  };

  return { counter, increment, decrement, setCounter, handleInputChange };
};
