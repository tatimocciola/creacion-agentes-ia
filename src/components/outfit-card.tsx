import { INVENTORY } from "@/data/mock-inventory";
import type { OutfitRecommendation } from "@/types/stylist";

const labels = { basic: "Básica", bold: "Jugada", unexpected: "Inesperada" };
const numbers = { basic: "01", bold: "02", unexpected: "03" };

export function OutfitCard({ outfit, selected, onSelect }: { outfit: OutfitRecommendation; selected: boolean; onSelect: () => void }) {
  const garments = outfit.garmentIds.map((id) => INVENTORY.find((item) => item.id === id)!);
  return (
    <article className={`outfit-card ${selected ? "selected" : ""}`}>
      <header><span>{numbers[outfit.kind]}</span><h3>{labels[outfit.kind]}</h3>{selected && <b>Elegido</b>}</header>
      <div className="mini-moodboard" aria-label={`Paleta ${labels[outfit.kind]}`}>
        {outfit.palette.map((color, index) => <i key={`${color}-${index}`} style={{ backgroundColor: color }} />)}
      </div>
      <ul className="garment-list">
        {garments.map((item) => <li key={item.id}><span>{item.category === "shoes" ? "Calzado" : item.category === "outerwear" ? "Abrigo" : item.category === "bag" ? "Cartera" : item.category === "accessory" ? "Detalle" : "Prenda"}</span>{item.name}</li>)}
      </ul>
      <div className="texture-row">{outfit.textures.map((texture) => <span key={texture}>{texture}</span>)}</div>
      <p className="rationale">{outfit.rationale}</p>
      <p className="climate-note">✓ {outfit.weatherNote}</p>
      {outfit.dayToNight && <p className="night-note">↗ {outfit.dayToNight}</p>}
      <button className={selected ? "secondary-button" : "select-button"} onClick={onSelect}>{selected ? "Este es mi look" : "Me pongo este"}</button>
    </article>
  );
}
