import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { searchByTitle } from "services/Products";

// Función para obtener productos desde la API
const fetchProducts = async (searchText: string) => {
  const response = await searchByTitle(searchText);
  return response; // Asegúrate de que esto se adapte a la estructura de tus datos
};

export default function useSearch() {
  const parentRef = useRef();

  const [searchText, setSearchText] = useState(""); // Para manejar el texto de búsqueda

  // Referencia para el debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // React Query: obtener productos usando useQuery
  const { data: resultList = [], isLoading, isError, error } = useQuery({
    queryKey: ['search', searchText],
    queryFn: () => fetchProducts(searchText),
    enabled: searchText.length > 0, // Solo se activa si el texto de búsqueda tiene algo
    placeholderData: (previousData, previousQuery) =>  previousQuery && searchText === "" ? previousQuery : undefined,
    staleTime: 300000,
    refetchOnWindowFocus: false, // Evita la recarga cuando el usuario cambia de ventana
  });

  // Función de búsqueda con debounce
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Limpiar el debounce anterior si existe
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Establecer un nuevo debounce para ejecutar después de 3 segundos de inactividad
    debounceRef.current = setTimeout(() => {
      setSearchText(value); // Actualiza con el nuevo valor después del debounce
    }, 3000); // 3000 ms = 3 segundos
  };

  const handleDocumentClick = () => setSearchText("");

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  // Si `searchText` está vacío, no mostramos nada
  if (searchText === "") {
    return {
      parentRef,
      resultList: [], // No mostramos resultados cuando la búsqueda está vacía
      handleSearch,
      searchText,
    };
  }

  return {
    parentRef,
    resultList,
    handleSearch,
    searchText,
  };
}
