import { useState } from "react";
import { UseLoadingType } from "models/types";

// Definimos un tipo para el hook useLoading

// Custom hook para manejar el estado de carga de un botón
function useLoading(): UseLoadingType {
  const [loading, setLoading] = useState(false);

  // Componente de Loading con Tailwind CSS

  // Función para iniciar la carga
  const startLoading = () => {
    setLoading(true);
  };

  // Función para detener la carga
  const stopLoading = () => {
    setLoading(false);
  };

  // Devolver el estado de carga y las funciones para iniciar/detener la carga como un objeto
  return [loading, startLoading, stopLoading];
}

export default useLoading; // Exportar el hook useLoading
