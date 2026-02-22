import { describe, it, expect } from "vitest";
import { formatCentsToCurrency } from "@/lib/format-cents-to-currency";

describe("formatCentsToCurrency", () => {
  describe("default mode", () => {
    it("should format a standard amount", () => {
      const result = formatCentsToCurrency({ cents: 21000, countryOfService: "FR" });
      expect(result).toContain("210,00");
      expect(result).toContain("€");
    });

    it("should format zero", () => {
      const result = formatCentsToCurrency({ cents: 0, countryOfService: "FR" });
      expect(result).toContain("0,00");
      expect(result).toContain("€");
    });

    it("should format a small amount with centimes", () => {
      const result = formatCentsToCurrency({ cents: 378, countryOfService: "FR" });
      expect(result).toContain("3,78");
      expect(result).toContain("€");
    });

    it("should format a single centime", () => {
      const result = formatCentsToCurrency({ cents: 1, countryOfService: "FR" });
      expect(result).toContain("0,01");
      expect(result).toContain("€");
    });

    it("should format a large amount with thousands", () => {
      const result = formatCentsToCurrency({ cents: 1500000, countryOfService: "FR" });
      expect(result).toContain("15");
      expect(result).toContain("000");
      expect(result).toContain("€");
    });

    it("should handle negative amounts", () => {
      const result = formatCentsToCurrency({ cents: -5000, countryOfService: "FR" });
      expect(result).toContain("50,00");
      expect(result).toContain("€");
      expect(result).toContain("-");
    });
  });

  describe("compact mode", () => {
    it("should remove decimals when no centimes", () => {
      const result = formatCentsToCurrency({ cents: 21000, countryOfService: "FR", compact: true });
      expect(result).toContain("210");
      expect(result).not.toContain(",00");
      expect(result).toContain("€");
    });

    it("should keep decimals when centimes exist", () => {
      const result = formatCentsToCurrency({ cents: 21050, countryOfService: "FR", compact: true });
      expect(result).toContain("210,50");
      expect(result).toContain("€");
    });

    it("should remove decimals for zero", () => {
      const result = formatCentsToCurrency({ cents: 0, countryOfService: "FR", compact: true });
      expect(result).not.toContain(",00");
    });

    it("should keep single digit centimes", () => {
      const result = formatCentsToCurrency({ cents: 21001, countryOfService: "FR", compact: true });
      expect(result).toContain("210,01");
    });
  });

  describe("country support", () => {
    it("should format with German locale", () => {
      const result = formatCentsToCurrency({ cents: 21000, countryOfService: "DE" });
      expect(result).toContain("210");
      expect(result).toContain("€");
    });

    it("should format without country using default", () => {
      const result = formatCentsToCurrency({ cents: 21000 });
      expect(result).toContain("210");
      expect(result).toContain("€");
    });

    it("should format with unknown country using default currency", () => {
      const result = formatCentsToCurrency({ cents: 21000, countryOfService: "XX" });
      expect(result).toContain("210");
      expect(result).toContain("€");
    });
  });
});
