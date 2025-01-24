// GLOBAL CUSTOM COMPONENTS
import { H4 } from "components/Typography";
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { CategoryTitle, Wrapper } from "./styles";
import Link from "next/link";

// ============================================================
type Props = { image: string; title: string, link: string };
// ============================================================

export default function CategoryCard1({ image, title, link }: Props) {
  return (
    <Wrapper >
      <Link href={link}>
        <img src={image} style={{
          width: "100%",
          height: "100%",       // Rellena completamente el contenedor
          objectFit: "cover",   // Evita deformaciones y recorta el contenido sobrante
          display: "block",
        }} alt="category" />
      </Link>

      {/* <CategoryTitle className="category-title">
        <H4>{title}</H4>
      </CategoryTitle> */}
    </Wrapper>
  );
}
