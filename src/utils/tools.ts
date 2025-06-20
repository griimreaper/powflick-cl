import { Customization } from "models/types";

export function Capitalize(string: string) {
  return string?.split('').map((l, i) => i === 0 ? l.toUpperCase() : l).join('')
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

type Tier = '10>20' | '21>50' | '51>100' | '101>250' | '250+';

const getTieredPrices = (basePrice: number): Record<Tier, number> => ({
  '10>20': +basePrice.toFixed(2),
  '21>50': +(basePrice * 0.94).toFixed(2),   // 6% off
  '51>100': +(basePrice * 0.88).toFixed(2),  // 12% off
  '101>250': +(basePrice * 0.82).toFixed(2), // 18% off
  '250+': +(basePrice * 0.65).toFixed(2),    // 35% off
});

export const getTotalWithDiscount = (basePrice: number, quantity: number): number => {
  let tier: Tier;

  if (quantity >= 250) tier = '250+';
  else if (quantity >= 101) tier = '101>250';
  else if (quantity >= 51) tier = '51>100';
  else if (quantity >= 21) tier = '21>50';
  else tier = '10>20';

  const tieredPrices = getTieredPrices(basePrice);
  const unitPrice = tieredPrices[tier];
  return +(unitPrice * quantity).toFixed(2);
};


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
