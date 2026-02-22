import { describe, it, expect } from "vitest";
import { t } from "./i18n";

describe("t", () => {
  it("should return the translation for a simple key", () => {
    expect(t("payments.list.card.completed")).toBe("✓ Payé");
  });

  it("should interpolate parameters", () => {
    const result = t("payment.progressBar.ariaLabel", { paid: 0, total: 4 });
    expect(result).toBe("0 échéances payées sur 4");
  });
});
