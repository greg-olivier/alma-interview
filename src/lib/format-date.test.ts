import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/format-date";

const JULY_3_2025 = 1751527297;
const JAN_1_2025 = 1735689600;

describe("formatDate", () => {
  describe("long format", () => {
    it("should include full month name and year for FR", () => {
      const result = formatDate({ timestamp: JULY_3_2025, format: "long", countryOfService: "FR" });
      expect(result).toContain("juillet");
      expect(result).toContain("2025");
      expect(result).toContain("3");
    });

    it("should format in German for DE", () => {
      const result = formatDate({ timestamp: JULY_3_2025, format: "long", countryOfService: "DE" });
      expect(result).toContain("Juli");
      expect(result).toContain("2025");
    });

    it("should format a January date for FR", () => {
      const result = formatDate({ timestamp: JAN_1_2025, format: "long", countryOfService: "FR" });
      expect(result).toContain("janvier");
      expect(result).toContain("2025");
    });
  });

  describe("short format", () => {
    it("should include abbreviated month for FR", () => {
      const result = formatDate({
        timestamp: JULY_3_2025,
        format: "short",
        countryOfService: "FR",
      });
      expect(result).toContain("juil.");
      expect(result).toContain("3");
    });

    it("should not include the year", () => {
      const result = formatDate({
        timestamp: JULY_3_2025,
        format: "short",
        countryOfService: "FR",
      });
      expect(result).not.toContain("2025");
    });

    it("should format in German for DE", () => {
      const result = formatDate({
        timestamp: JULY_3_2025,
        format: "short",
        countryOfService: "DE",
      });
      expect(result).toContain("Jul");
    });

    it("should format a January date for FR", () => {
      const result = formatDate({ timestamp: JAN_1_2025, format: "short", countryOfService: "FR" });
      expect(result).toContain("janv.");
    });
  });

  describe("country fallback", () => {
    it("should format without country using default", () => {
      const result = formatDate({ timestamp: JULY_3_2025 });
      expect(result).toContain("2025");
    });

    it("should format with unknown country using default", () => {
      const result = formatDate({ timestamp: JULY_3_2025, countryOfService: "XX" });
      expect(result).toContain("2025");
    });
  });
});
