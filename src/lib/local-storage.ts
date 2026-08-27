import type { OutfitFeedback, StylistRepository } from "@/types/stylist";

const FEEDBACK_KEY = "personal-stylist-feedback";

export const localStylistRepository: StylistRepository = {
  saveSelection(outfitId) {
    window.localStorage.setItem("personal-stylist-selection", outfitId);
  },
  saveFeedback(feedback) {
    const current = JSON.parse(window.localStorage.getItem(FEEDBACK_KEY) ?? "[]") as OutfitFeedback[];
    window.localStorage.setItem(FEEDBACK_KEY, JSON.stringify([...current, feedback]));
  },
};
