import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import {
  inProgressSummary,
  lateSummary,
  completedSummary,
} from "@/api/payments/__mocks__/payments.fixtures";
import { PaymentCard } from "./payment-card";
import { toPaymentCardData } from "./payment-card.mapper";

describe("toPaymentCardData", () => {
  it("should return the first pending installment as next", () => {
    const data = toPaymentCardData(inProgressSummary);
    expect(data.nextInstallmentAmount).not.toBeNull();
    expect(data.nextInstallmentDate).not.toBeNull();
  });

  it("should return the first late installment when no pending", () => {
    const data = toPaymentCardData(lateSummary);
    expect(data.nextInstallmentAmount).not.toBeNull();
    expect(data.nextInstallmentDate).not.toBeNull();
  });

  it("should return null for next installment when all paid", () => {
    const data = toPaymentCardData(completedSummary);
    expect(data.nextInstallmentAmount).toBeNull();
    expect(data.nextInstallmentDate).toBeNull();
  });

  it("should count paid installments correctly", () => {
    const data = toPaymentCardData(inProgressSummary);
    expect(data.paidCount).toBe(1);
    expect(data.totalCount).toBe(4);
  });

  it("should map merchant name", () => {
    const data = toPaymentCardData(inProgressSummary);
    expect(data.merchantName).toBe("France Merchant");
  });

  it("should format purchase amount as currency", () => {
    const data = toPaymentCardData(inProgressSummary);
    expect(data.purchaseAmount).toContain("210");
    expect(data.purchaseAmount).toContain("€");
  });
});

describe("PaymentCard", () => {
  it("should display the merchant name", () => {
    const { getByText } = renderWithProviders(
      <PaymentCard payment={toPaymentCardData(inProgressSummary)} onClick={() => {}} />,
    );
    expect(getByText("France Merchant")).toBeInTheDocument();
  });

  it("should display 'Prochain paiement' for in progress payments", () => {
    const { getByText } = renderWithProviders(
      <PaymentCard payment={toPaymentCardData(inProgressSummary)} onClick={() => {}} />,
    );
    expect(getByText("Prochain paiement")).toBeInTheDocument();
  });

  it("should display the late banner and 'Échéance due' for late payments", () => {
    const { getByText } = renderWithProviders(
      <PaymentCard payment={toPaymentCardData(lateSummary)} onClick={() => {}} />,
    );
    expect(getByText(/Paiement en retard/)).toBeInTheDocument();
    expect(getByText("Échéance due")).toBeInTheDocument();
  });

  it("should display '✓ Payé' without progress bar for completed payments", () => {
    const { getByText, queryByRole } = renderWithProviders(
      <PaymentCard payment={toPaymentCardData(completedSummary)} onClick={() => {}} />,
    );
    expect(getByText("✓ Payé")).toBeInTheDocument();
    expect(queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("should display a progress bar for active payments", () => {
    const { getByRole } = renderWithProviders(
      <PaymentCard payment={toPaymentCardData(inProgressSummary)} onClick={() => {}} />,
    );
    expect(getByRole("progressbar")).toBeInTheDocument();
  });

  it("should call onClick with the correct id", async () => {
    const handleClick = vi.fn();
    const { getByRole, user } = renderWithProviders(
      <PaymentCard payment={toPaymentCardData(inProgressSummary)} onClick={handleClick} />,
    );
    await user.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledWith("payment_1");
  });

  it("should be activatable with keyboard", async () => {
    const handleClick = vi.fn();
    const { getByRole, user } = renderWithProviders(
      <PaymentCard payment={toPaymentCardData(inProgressSummary)} onClick={handleClick} />,
    );
    getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledWith("payment_1");
  });
});
