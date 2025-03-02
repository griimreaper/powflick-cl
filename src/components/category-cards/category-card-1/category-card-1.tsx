import Image from "next/image";
import Link from "next/link";

// ============================================================
type Props = { image: string; title: string; link: string };
// ============================================================

export default function CategoryCard1({ image, title, link }: Props) {
  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      <Link href={link}>
        <Image
          src={image}
          alt="category"
          width={300} // Define un tamaño explícito
          height={200} // Ajusta según necesidad
          quality={80}
          loading="lazy"
          style={{
            objectFit: "cover", // Mantiene la relación de aspecto
            display: "block",
            width: "100%", // Permite adaptarse al contenedor
            height: "auto",
          }}
        />
      </Link>
    </div>
  );
}
