import { Customization } from "models/types";

export function Capitalize(string: string) {
    return string?.split('').map((l,i) => i === 0 ? l.toUpperCase() : l ).join('')
}

export function extractPriceFromString(text: string): number {
  // Utilizamos una expresión regular para encontrar el precio en el string
  const priceMatch = text.match(/-?\$\d+(\.\d+)?/);

  if (priceMatch) {
    // Si encontramos un precio, lo extraemos y lo convertimos a número
    const price = parseFloat(priceMatch[0].replace(/\$/g, ""));
    return price;
  } else {
    // Si no se encuentra un precio, retornamos 0 o algún valor predeterminado
    return 0;
  }
}

export function calculateCustomizationPrice(
  customization: Customization
): number {
  let totalPrice = 0;

  // Extraer precios de cada propiedad de personalización y sumarlos si el valor es nulo el precio es 0
  totalPrice += extractPriceFromString(customization.sleeve ?? '');
  totalPrice += extractPriceFromString(customization.neck ?? '');
  totalPrice += extractPriceFromString(customization.socks ?? '');
  totalPrice += extractPriceFromString(customization.pants ?? '');
  totalPrice += extractPriceFromString(customization.shorts ?? '');
  totalPrice += extractPriceFromString(customization.materials ?? '');

  // // Precio de la personalización del frente
  if (customization.frontSide.logos[0]) totalPrice += 4.99 * customization.frontSide.logos.filter((each) => each.logoUrl).length; // Esto podría ser opcional según tus necesidades
  if (customization.frontSide.texts[0]) totalPrice += 3.99 * customization.frontSide.texts.filter((each) => each.text).length; // Esto podría ser opcional según tus necesidades
  if (customization.frontSide.numbers[0]) totalPrice += 3.99 * customization.frontSide.numbers.filter((each) => each.number).length; // Esto podría ser opcional según tus necesidades
  // // Precio de la personalización de la parte trasera
  if (customization.backSide.logos[0]) totalPrice += 4.99 * customization.backSide.logos.filter((each) => each.logoUrl).length; // Esto también podría ser opcional
  if (customization.backSide.texts[0]) totalPrice += 3.99 * customization.backSide.texts.filter((each) => each.text).length; // Esto también podría ser opcional
  if (customization.backSide.numbers[0]) totalPrice += 3.99 * customization.backSide.numbers.filter((each) => each.number).length; // Esto también podría ser opcional

  return parseFloat(totalPrice.toFixed(2));
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
}

export function capitalizeFirstLetter(str: string): string {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return str;
}

export function convertCurrency(amount: number, rate: number = 1) {
  const result = (amount * rate).toFixed(2);

  return result
}

export const currencySymbol = (currency: string) => {
  switch (currency) {
    case 'EUR': return '€ ';
    case 'CAD': return 'CAD ';
    default: return '$ ';
  }
};
export function killParenthesisIn(texto: string) {
  return texto.replace(/\s*\([^)]*\)/g, '');
}

export function eliminarCaracteresNoNumericos(inputString: string) {
  // Utilizamos una expresión regular para reemplazar todos los caracteres que no son números ni puntos con una cadena vacía
  const cleanedString = inputString.replace(/[^\d.+/-]/g, '');

  return cleanedString;
}

export function convertToTitleCase(str: string) {
  // Reemplaza las letras mayúsculas precedidas por letras minúsculas con un espacio y la letra mayúscula
  const result = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Capitaliza la primera letra
  return result.charAt(0).toUpperCase() + result.slice(1);
}
