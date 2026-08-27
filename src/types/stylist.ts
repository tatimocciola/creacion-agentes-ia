export type DayMode = "today" | "tomorrow";
export type Occasion = "work" | "casual" | "meeting" | "outing" | "mixed";
export type Formality = "relaxed" | "polished" | "formal";
export type PhysicalPreference = "normal" | "comfort" | "cold-sensitive";
export type OutfitKind = "basic" | "bold" | "unexpected";
export type GarmentCategory =
  | "top"
  | "bottom"
  | "outerwear"
  | "shoes"
  | "bag"
  | "belt"
  | "accessory";

export interface Garment {
  id: string;
  name: string;
  category: GarmentCategory;
  colors: string[];
  material: string;
  texture: string;
  formality: 1 | 2 | 3;
  warmth: 0 | 1 | 2 | 3;
  rainSafe: boolean | "unknown";
  waterSensitive?: boolean;
  comfort: 1 | 2 | 3;
  confirmed: true;
}

export interface WeatherSnapshot {
  source: "mock" | "api";
  mode: DayMode;
  location: string;
  condition: "clear" | "cloudy" | "rain";
  min: number;
  max: number;
  rainProbability: number;
  humidity: number;
  summary: string;
}

export interface StylistRequest {
  mode: DayMode;
  occasion: Occasion;
  formality: Formality;
  physicalPreference: PhysicalPreference;
  specialPreference: string;
  weather: WeatherSnapshot;
}

export interface OutfitRecommendation {
  id: string;
  kind: OutfitKind;
  garmentIds: string[];
  palette: string[];
  textures: string[];
  rationale: string;
  weatherNote: string;
  dayToNight?: string;
}

export interface OutfitFeedback {
  id: string;
  outfitId: string;
  rating: "loved" | "good" | "failed";
  comment: string;
  createdAt: string;
}

export interface WeatherProvider {
  getWeather(mode: DayMode): Promise<WeatherSnapshot>;
}

export interface StylistRepository {
  saveSelection(outfitId: string): void;
  saveFeedback(feedback: OutfitFeedback): void;
}
