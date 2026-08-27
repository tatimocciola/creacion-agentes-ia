"use client";

import { useMemo, useState } from "react";
import { MOCK_WEATHER } from "@/data/mock-weather";
import { generateRecommendations, validateRecommendations } from "@/lib/stylist";
import { localStylistRepository } from "@/lib/local-storage";
import type { DayMode, Formality, Occasion, OutfitRecommendation, PhysicalPreference, StylistRequest } from "@/types/stylist";
import { WeatherCard } from "./weather-card";
import { OutfitCard } from "./outfit-card";
import { Checklist } from "./checklist";
import { FeedbackPanel } from "./feedback-panel";

const occasions: { value: Occasion; label: string }[] = [
  { value: "work", label: "Trabajo" }, { value: "casual", label: "Casual" }, { value: "meeting", label: "Reunión" }, { value: "outing", label: "Salida" }, { value: "mixed", label: "Día mixto" },
];
const formalities: { value: Formality; label: string }[] = [{ value: "relaxed", label: "Relajado" }, { value: "polished", label: "Prolijo" }, { value: "formal", label: "Más formal" }];
const feelings: { value: PhysicalPreference; label: string }[] = [{ value: "normal", label: "Me siento bien" }, { value: "comfort", label: "Quiero comodidad" }, { value: "cold-sensitive", label: "Tengo frío" }];

export function StylistExperience() {
  const [mode, setMode] = useState<DayMode>("today");
  const [occasion, setOccasion] = useState<Occasion>("work");
  const [formality, setFormality] = useState<Formality>("polished");
  const [physicalPreference, setPhysicalPreference] = useState<PhysicalPreference>("normal");
  const [specialPreference, setSpecialPreference] = useState("");
  const [outfits, setOutfits] = useState<OutfitRecommendation[]>([]);
  const [selected, setSelected] = useState<OutfitRecommendation | null>(null);
  const weather = MOCK_WEATHER[mode];
  const dateLabel = useMemo(() => new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" }).format(new Date(Date.now() + (mode === "tomorrow" ? 86400000 : 0))), [mode]);

  function chooseMode(value: DayMode) {
    setMode(value); setOutfits([]); setSelected(null);
  }

  function generate() {
    const request: StylistRequest = { mode, occasion, formality, physicalPreference, specialPreference, weather };
    const result = generateRecommendations(request);
    if (!validateRecommendations(result, request)) throw new Error("No fue posible armar tres looks seguros.");
    setOutfits(result); setSelected(null);
    requestAnimationFrame(() => document.querySelector("#recomendaciones")?.scrollIntoView({ behavior: "smooth" }));
  }

  function select(outfit: OutfitRecommendation) {
    setSelected(outfit); localStylistRepository.saveSelection(outfit.id);
    requestAnimationFrame(() => document.querySelector("#preparar")?.scrollIntoView({ behavior: "smooth" }));
  }

  return (
    <main>
      <nav className="topbar"><a className="brand" href="#inicio"><span>PS</span><strong>Personal Stylist</strong></a><span className="location">⌖ Buenos Aires</span></nav>
      <section id="inicio" className="hero">
        <p className="eyebrow">Tu look, resuelto en menos de un minuto</p>
        <h1>¿Qué te vas<br /><em>a poner?</em></h1>
        <div className="day-toggle" aria-label="Elegir día">
          <button className={mode === "today" ? "active" : ""} onClick={() => chooseMode("today")}><span>Hoy</span><small>Decidir ahora</small></button>
          <button className={mode === "tomorrow" ? "active" : ""} onClick={() => chooseMode("tomorrow")}><span>Mañana</span><small>Dejar preparado</small></button>
        </div>
        <p className="date-label">{dateLabel}</p>
        <WeatherCard weather={weather} />
      </section>

      <section className="brief panel">
        <div className="section-heading"><span>01</span><div><p className="eyebrow">Contame lo mínimo</p><h2>¿Cómo es tu día?</h2></div></div>
        <fieldset><legend>Contexto principal</legend><div className="chips">{occasions.map((item) => <button type="button" className={occasion === item.value ? "active" : ""} key={item.value} onClick={() => setOccasion(item.value)}>{item.label}</button>)}</div></fieldset>
        <div className="two-fields">
          <fieldset><legend>Formalidad</legend><div className="chips compact">{formalities.map((item) => <button type="button" className={formality === item.value ? "active" : ""} key={item.value} onClick={() => setFormality(item.value)}>{item.label}</button>)}</div></fieldset>
          <fieldset><legend>¿Cómo te sentís?</legend><div className="chips compact">{feelings.map((item) => <button type="button" className={physicalPreference === item.value ? "active" : ""} key={item.value} onClick={() => setPhysicalPreference(item.value)}>{item.label}</button>)}</div></fieldset>
        </div>
        <label className="preference-label">Preferencia especial <span>Opcional</span><input value={specialPreference} onChange={(event) => setSpecialPreference(event.target.value)} placeholder="Ej: quiero usar jean, nada ajustado..." /></label>
        <button className="generate-button" onClick={generate}><span>¿Qué me pongo?</span><b>→</b></button>
        <p className="microcopy">Usamos solo prendas confirmadas de tu vestidor.</p>
      </section>

      {outfits.length > 0 && <section id="recomendaciones" className="recommendations">
        <div className="results-heading"><div><p className="eyebrow">Tres maneras de resolverlo</p><h2>Tu moodboard de {mode === "today" ? "hoy" : "mañana"}</h2></div><p>Compará códigos, texturas y proporciones. Todas las opciones respetan el clima.</p></div>
        <div className="outfit-grid">{outfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} selected={selected?.id === outfit.id} onSelect={() => select(outfit)} />)}</div>
      </section>}

      {selected && <div id="preparar" className="after-selection"><Checklist outfit={selected} /><FeedbackPanel key={selected.id} outfitId={selected.id} /></div>}
      <footer><span>Personal Stylist Agent</span><p>Demo local · Tu información queda en este dispositivo</p></footer>
    </main>
  );
}
