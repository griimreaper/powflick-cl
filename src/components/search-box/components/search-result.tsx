import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
// STYLED COMPONENT
import { SearchResultCard } from "../styles";
import { Typography } from "@mui/material";

// ==============================================================

type Props = { results: string[], query: string, onClose: Function }; // Añadir `query` como prop

// Función para resaltar el texto
// Función para resaltar el texto
const highlightMatch = (text: string, query: string) => {
  if (!query) return text; // Si no hay término de búsqueda, devolver el texto tal cual

  // Dividir el query en palabras y construir una expresión regular que coincida con cada una de ellas
  const queryWords = query.split(' ').filter(Boolean);
  const regex = new RegExp(`(${queryWords.join('|')})`, 'gi');

  // Usamos split y map para resaltar las coincidencias
  const highlightedText = text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <Typography key={index} fontWeight={600} px={0.1} color={'primary.main'}>
        {part}
      </Typography>
    ) : (
      <Typography key={index} px={0.1}>
        {part}
      </Typography>
    )
  );

  return highlightedText;
};


// ==============================================================

export default function SearchResult({ results, query, onClose }: Props) {

  return (
    <SearchResultCard elevation={2}>
      {results.map((item) => (
        <Link href={`/products/${item[1]}`} onClick={() => onClose()} key={item[0]}>
          <MenuItem>
            {highlightMatch(item[0], query)} {/* Llamar a la función para resaltar */}
          </MenuItem>
        </Link>
      ))}
    </SearchResultCard>
  );
}
