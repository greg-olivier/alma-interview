import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { PaymentDetailError } from "./payment-detail-error";

describe("PaymentDetailError", () => {
  it("should display the error message", () => {
    const { getByText } = renderWithProviders(<PaymentDetailError onRetry={vi.fn()} />);
    expect(getByText("Impossible de charger ce paiement.")).toBeInTheDocument();
  });

  it("should call onRetry when clicking the retry button", async () => {
    const onRetry = vi.fn();
    const { getByText, user } = renderWithProviders(<PaymentDetailError onRetry={onRetry} />);

    await user.click(getByText("Réessayer"));

    expect(onRetry).toHaveBeenCalledOnce();
  });
});
