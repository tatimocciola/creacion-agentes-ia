import type { WeatherSnapshot } from "@/types/stylist";

export function WeatherCard({ weather }: { weather: WeatherSnapshot }) {
  const rainy = weather.condition === "rain";
  return (
    <section className="weather-card" aria-label="Clima simulado">
      <div className="weather-icon" aria-hidden>{rainy ? "☂" : "☀"}</div>
      <div className="weather-main">
        <p className="eyebrow">Clima · demo simulada</p>
        <h2>{weather.location}</h2>
        <p>{weather.summary}</p>
      </div>
      <div className="temperature"><strong>{weather.max}°</strong><span>{weather.min}° mín.</span></div>
      <div className="weather-stats"><span>{weather.rainProbability}% lluvia</span><span>{weather.humidity}% humedad</span></div>
    </section>
  );
}
