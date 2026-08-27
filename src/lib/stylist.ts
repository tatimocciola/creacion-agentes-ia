import { INVENTORY } from "@/data/mock-inventory";
import type { Garment, OutfitKind, OutfitRecommendation, StylistRequest } from "@/types/stylist";

export function isWeatherCompatible(garment: Garment, request: StylistRequest) {
  const wet = request.weather.condition === "rain" || request.weather.rainProbability >= 60;
  if (wet && (garment.waterSensitive || garment.rainSafe === false)) return false;
  return true;
}

export function getAvailableGarments(request: StylistRequest) {
  return INVENTORY.filter((garment) => garment.confirmed && isWeatherCompatible(garment, request));
}

const plans: Record<"dry" | "wet", Record<OutfitKind, string[]>> = {
  dry: {
    basic: ["sweater-stripe", "jean-flare", "bomber-camel", "forum", "bag-black", "earrings-gold"],
    bold: ["shirt-white", "pants-black", "corduroy-green", "forum", "bag-camel", "belt-black", "earrings-gold"],
    unexpected: ["top-black", "jean-dark", "denim-jacket", "boots-black", "bag-camel", "cap", "jewelry-silver"],
  },
  wet: {
    basic: ["sweater-grey", "pants-black", "puffer-black", "boots-black", "bag-black", "earrings-gold"],
    bold: ["shirt-white", "jean-dark", "puffer-black", "sneakers-black", "bag-black", "belt-black", "jewelry-silver"],
    unexpected: ["sweater-stripe", "jean-flare", "puffer-black", "boots-black", "bag-black", "cap", "earrings-gold"],
  },
};

const copy: Record<OutfitKind, { rationale: string; weather: string }> = {
  basic: { rationale: "Una base neutra, segura y pulida que funciona sin pensarlo de más.", weather: "Capas equilibradas para todo el recorrido." },
  bold: { rationale: "El contraste entre códigos pulidos y casuales suma diseño sin sumar ruido.", weather: "Piezas prácticas sin resignar estructura." },
  unexpected: { rationale: "Una mezcla menos obvia de proporciones y accesorios, pero fácil de llevar.", weather: "Texturas elegidas para acompañar el clima." },
};

export function generateRecommendations(request: StylistRequest): OutfitRecommendation[] {
  const wet = request.weather.condition === "rain" || request.weather.rainProbability >= 60;
  const available = new Set(getAvailableGarments(request).map((item) => item.id));

  return (["basic", "bold", "unexpected"] as OutfitKind[]).map((kind) => {
    const garmentIds = plans[wet ? "wet" : "dry"][kind].filter((id) => available.has(id));
    const garments = garmentIds.map((id) => INVENTORY.find((item) => item.id === id)!);
    return {
      id: `${request.mode}-${kind}`,
      kind,
      garmentIds,
      palette: [...new Set(garments.flatMap((item) => item.colors))].slice(0, 5),
      textures: [...new Set(garments.map((item) => item.texture))].slice(0, 4),
      rationale: copy[kind].rationale,
      weatherNote: wet ? `${copy[kind].weather} Sin corderoy ni prendas sensibles al agua.` : copy[kind].weather,
      dayToNight: request.occasion === "mixed" || request.occasion === "outing" ? "Para la noche: sumá el abrigo y cambiá el accesorio protagonista." : undefined,
    };
  });
}

export function validateRecommendations(outfits: OutfitRecommendation[], request: StylistRequest) {
  if (outfits.length !== 3) return false;
  const known = new Set(INVENTORY.map((item) => item.id));
  const signatures = new Set(outfits.map((item) => [...item.garmentIds].sort().join("|")));
  return signatures.size === 3 && outfits.every((outfit) => outfit.garmentIds.every((id) => known.has(id) && isWeatherCompatible(INVENTORY.find((item) => item.id === id)!, request)));
}
