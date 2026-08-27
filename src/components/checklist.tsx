import { INVENTORY } from "@/data/mock-inventory";
import type { OutfitRecommendation } from "@/types/stylist";

export function Checklist({ outfit }: { outfit: OutfitRecommendation }) {
  const garments = outfit.garmentIds.map((id) => INVENTORY.find((item) => item.id === id)!);
  return (
    <section className="checklist panel">
      <p className="eyebrow">Dejalo preparado</p>
      <h2>Tu checklist</h2>
      <div className="check-grid">
        {garments.map((item) => <label key={item.id}><input type="checkbox" /> <span>{item.name}</span></label>)}
      </div>
    </section>
  );
}
