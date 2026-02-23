import type { Installment, PaymentsResponse, PaymentSummary } from "@/api/types";

export const makeInstallment = (overrides = {}): Installment => ({
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

export const inProgressSummary: PaymentSummary = {
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

export const lateSummary: PaymentSummary = {
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

export const completedSummary: PaymentSummary = {
  ...inProgressSummary,
  id: "payment_3",
  state: "completed",
  payment_plan: inProgressSummary.payment_plan.map((i) => ({
    ...i,
    state: "paid" as const,
    date_paid: 1751527335,
  })),
};

export const mockPaymentsResponse: PaymentsResponse = {
  total_amount_left_to_pay: 40750,
  payments: [inProgressSummary, lateSummary, completedSummary],
};
