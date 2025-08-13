import { Metadata } from "next";
import YourDesignClient from "./YourDesignClient";

export const metadata: Metadata = {
  title: "Your Design - Pow Flick",
  alternates: {
    canonical: "https://www.powflick.com/en/your-design",
    languages: {
      en: "https://www.powflick.com/en/your-design",
      es: "https://www.powflick.com/es/your-design",
      "x-default": "https://www.powflick.com/en/your-design",
    },
  },
};

export default function Page() {
  return <YourDesignClient />;
}
