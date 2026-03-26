export type Unit = "g" | "oz" | "kg";

const OUNCES_PER_GRAM = 0.035274;
const KILOGRAMS_PER_GRAM = 0.001;

export function convertGrams(grams: number, unit: Unit): number {
  if (unit === "oz") {
    return grams * OUNCES_PER_GRAM;
  }

  if (unit === "kg") {
    return grams * KILOGRAMS_PER_GRAM;
  }

  return grams;
}

export function formatWeight(grams: number, unit: Unit): string {
  const converted = convertGrams(grams, unit);

  if (unit === "g") {
    return Math.round(converted).toString();
  }

  return converted.toFixed(1);
}

export function unitLabel(unit: Unit): string {
  return unit;
}
