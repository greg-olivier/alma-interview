import { describe, it, expect, vi } from "vitest";
import type { PaymentSummary } from "@/api/types";
import { renderWithProviders } from "@/test/test-utils";
import { PaymentCard } from "./payment-card";
import { toPaymentCardData } from "./payment-card.mapper";

const makeInstallment = (overrides = {}) => ({
  id: "i1",
  purchase_amount: 5250,
  due_date: 1751527297,
  original_due_date: null,
  date_paid: null,
  state: "pending" as const,
  customer_fee: 0,
  customer_interest: 0,
  customer_can_postpone_until: null,
  customer_cannot_postpone_reason: null,
  ...overrides,
});

const inProgressSummary: PaymentSummary = {
  id: "payment_1",
  created: 1751527297,
  state: "in_progress",
  merchant_display_name: "France Merchant",
  purchase_amount: 21000,
  logo_url: null,
  refunds: [],
  payment_plan: [
    makeInstallment({ id: "i1", state: "paid", date_paid: 1751527335 }),
    makeInstallment({ id: "i2", due_date: 1754205697 }),
    makeInstallment({ id: "i3", due_date: 1756884097 }),
    makeInstallment({ id: "i4", due_date: 1759476097 }),
  ],
};

const lateSummary: PaymentSummary = {
  ...inProgressSummary,
  id: "payment_2",
  state: "late",
  payment_plan: [
    makeInstallment({ id: "i1", state: "paid", date_paid: 1751527335 }),
    makeInstallment({ id: "i2", state: "paid", date_paid: 1751527335 }),
    makeInstallment({ id: "i3", state: "late", due_date: 1756112057 }),
    makeInstallment({ id: "i4", state: "late", due_date: 1758790457 }),
  ],
};

const completedSummary: PaymentSummary = {
  ...inProgressSummary,
  id: "payment_3",
  state: "completed",
  payment_plan: inProgressSummary.payment_plan.map((i) => ({
    ...i,
    state: "paid" as const,
    date_paid: 1751527335,
  })),
};

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
