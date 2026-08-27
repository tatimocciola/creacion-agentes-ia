"use client";

import { useEffect, useState } from "react";
import { localStylistRepository } from "@/lib/local-storage";
import type { OutfitFeedback } from "@/types/stylist";

const ratings: { value: OutfitFeedback["rating"]; emoji: string; label: string }[] = [
  { value: "loved", emoji: "😍", label: "Me encantó" },
  { value: "good", emoji: "🙂", label: "Estuvo bien" },
  { value: "failed", emoji: "👎", label: "No funcionó" },
];

export function FeedbackPanel({ outfitId }: { outfitId: string }) {
  const [rating, setRating] = useState<OutfitFeedback["rating"] | null>(null);
  const [comment, setComment] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function handlePhoto(file?: File) {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  function submit() {
    if (!rating) return;
    localStylistRepository.saveFeedback({ id: crypto.randomUUID(), outfitId, rating, comment, createdAt: new Date().toISOString() });
    setSaved(true);
  }

  return (
    <section className="feedback panel">
      <p className="eyebrow">Después de usarlo</p>
      <h2>¿Qué tal fue este outfit?</h2>
      <div className="rating-row">{ratings.map((item) => <button className={rating === item.value ? "active" : ""} key={item.value} onClick={() => { setRating(item.value); setSaved(false); }}><b>{item.emoji}</b><span>{item.label}</span></button>)}</div>
      <label className="comment-label">¿Algo para recordar? <span>Opcional</span><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Ej: estuve cómoda todo el día..." /></label>
      <label className="photo-upload"><input type="file" accept="image/*" onChange={(event) => handlePhoto(event.target.files?.[0])} /><span>＋</span><strong>{preview ? "Cambiar foto" : "Sumar foto del look"}</strong><small>Solo preview local en esta demo</small></label>
      {/* Blob URLs are local previews and cannot be optimized by next/image. */}
      {preview && <div className="photo-preview">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={preview} alt="Preview del outfit usado" /><button onClick={() => handlePhoto()}>Quitar</button></div>}
      <button className="save-button" disabled={!rating || saved} onClick={submit}>{saved ? "Feedback guardado ✓" : "Guardar feedback"}</button>
      {saved && <p className="saved-note">Quedó asociado a este outfit en tu dispositivo.</p>}
    </section>
  );
}
