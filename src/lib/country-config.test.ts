import { describe, it, expect, vi, afterEach } from "vitest";
import { getCountryConfig } from "@/lib/country-config";

describe("getCountryConfig", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return FR config for France", () => {
    const config = getCountryConfig("FR");
    expect(config).toEqual({
      locale: "fr-FR",
      timezone: "Europe/Paris",
      currency: "EUR",
    });
  });

  it("should return DE config for Germany", () => {
    const config = getCountryConfig("DE");
    expect(config).toEqual({
      locale: "de-DE",
      timezone: "Europe/Berlin",
      currency: "EUR",
    });
  });

  it("should return a valid config for unknown country", () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("es-ES");
    const config = getCountryConfig("XX");
    expect(config.locale).toBe("es-ES");
    expect(config.timezone).toBeDefined();
    expect(config.currency).toBe("EUR");
  });

  it("should return a valid config when no country provided", () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("it-IT");
    const config = getCountryConfig();
    expect(config.locale).toBe("it-IT");
    expect(config.timezone).toBeDefined();
    expect(config.currency).toBe("EUR");
  });

  it("should fallback to fr-FR when navigator.language is empty", () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("");
    const config = getCountryConfig();
    expect(config.locale).toBe("fr-FR");
  });
});
