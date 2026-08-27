import type { DayMode, WeatherSnapshot } from "@/types/stylist";

export const MOCK_WEATHER: Record<DayMode, WeatherSnapshot> = {
  today: {
    source: "mock",
    mode: "today",
    location: "CABA, Argentina",
    condition: "clear",
    min: 14,
    max: 22,
    rainProbability: 10,
    humidity: 52,
    summary: "Templado, seco y más fresco al volver.",
  },
  tomorrow: {
    source: "mock",
    mode: "tomorrow",
    location: "CABA, Argentina",
    condition: "rain",
    min: 12,
    max: 17,
    rainProbability: 80,
    humidity: 86,
    summary: "Fresco y lluvioso. Conviene evitar texturas sensibles.",
  },
};
