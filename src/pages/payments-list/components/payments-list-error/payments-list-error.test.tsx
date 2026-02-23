import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { PaymentsListError } from "./payments-list-error";

describe("PaymentsListError", () => {
  it("should display the error message", () => {
    const { getByText } = renderWithProviders(<PaymentsListError onRetry={vi.fn()} />);
    expect(getByText("Impossible de charger vos paiements.")).toBeInTheDocument();
  });

  it("should call onRetry when clicking the retry button", async () => {
    const onRetry = vi.fn();
    const { getByText, user } = renderWithProviders(<PaymentsListError onRetry={onRetry} />);

    await user.click(getByText("Réessayer"));

    expect(onRetry).toHaveBeenCalledOnce();
  });
});
