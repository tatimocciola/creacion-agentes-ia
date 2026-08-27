import { describe, expect, it } from "vitest";
import { INVENTORY } from "@/data/mock-inventory";
import { MOCK_WEATHER } from "@/data/mock-weather";
import { generateRecommendations, getAvailableGarments, validateRecommendations } from "./stylist";
import type { StylistRequest } from "@/types/stylist";

function request(kind: "today" | "tomorrow"): StylistRequest {
  return { mode: kind, occasion: "work", formality: "polished", physicalPreference: "normal", specialPreference: "", weather: MOCK_WEATHER[kind] };
}

describe("deterministic stylist", () => {
  it("removes water-sensitive garments on a rainy day", () => {
    const ids = getAvailableGarments(request("tomorrow")).map((item) => item.id);
    expect(ids).not.toContain("corduroy-green");
    expect(ids).not.toContain("bomber-camel");
  });

  it("returns exactly three distinct, valid rainy-day outfits", () => {
    const input = request("tomorrow");
    const outfits = generateRecommendations(input);
    expect(outfits).toHaveLength(3);
    expect(new Set(outfits.map((item) => item.garmentIds.join("|"))).size).toBe(3);
    expect(validateRecommendations(outfits, input)).toBe(true);
  });

  it("only references confirmed inventory", () => {
    const known = new Set(INVENTORY.filter((item) => item.confirmed).map((item) => item.id));
    for (const outfit of generateRecommendations(request("today"))) {
      expect(outfit.garmentIds.every((id) => known.has(id))).toBe(true);
    }
  });
});
