import type { Installment, PaymentsResponse } from "@/api/types";

const makeInstallment = (overrides = {}): Installment => ({
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

export const mockPaymentsResponse: PaymentsResponse = {
  total_amount_left_to_pay: 40750,
  payments: [
    {
      id: "payment_1",
      created: 1751527297,
      state: "in_progress",
      merchant_display_name: "France Merchant",
      purchase_amount: 21000,
      logo_url: "https://cdn-icons-png.freepik.com/512/8312/8312956.png",
      refunds: [],
      payment_plan: [
        makeInstallment({ id: "i1", state: "paid", date_paid: 1751527335 }),
        makeInstallment({
          id: "i2",
          due_date: 1754205697,
          customer_can_postpone_until: "2025-09-03",
        }),
        makeInstallment({
          id: "i3",
          due_date: 1756884097,
          customer_can_postpone_until: "2025-10-03",
        }),
        makeInstallment({
          id: "i4",
          due_date: 1759476097,
          customer_can_postpone_until: "2025-11-03",
        }),
      ],
    },
    {
      id: "payment_2",
      created: 1750841654,
      state: "late",
      merchant_display_name: "France Merchant",
      purchase_amount: 50000,
      logo_url: null,
      refunds: [],
      payment_plan: [
        makeInstallment({
          id: "i5",
          purchase_amount: 12500,
          state: "paid",
          due_date: 1750841657,
          date_paid: 1750841694,
          customer_fee: 900,
        }),
        makeInstallment({
          id: "i6",
          purchase_amount: 12500,
          state: "paid",
          due_date: 1753433657,
          date_paid: 1751287110,
        }),
        makeInstallment({
          id: "i7",
          purchase_amount: 12500,
          state: "late",
          due_date: 1756112057,
          customer_can_postpone_until: "2025-09-25",
        }),
        makeInstallment({
          id: "i8",
          purchase_amount: 12500,
          state: "late",
          due_date: 1758790457,
          customer_can_postpone_until: "2025-10-26",
        }),
      ],
    },
    {
      id: "payment_3",
      created: 1751527297,
      state: "completed",
      merchant_display_name: "France Merchant",
      purchase_amount: 21000,
      logo_url: null,
      refunds: [],
      payment_plan: [
        makeInstallment({ id: "i9", state: "paid", date_paid: 1751527335, customer_fee: 378 }),
        makeInstallment({
          id: "i10",
          state: "paid",
          due_date: 1754205697,
          date_paid: 1754205697,
          customer_fee: 378,
        }),
        makeInstallment({
          id: "i11",
          state: "paid",
          due_date: 1756884097,
          date_paid: 1756884097,
          customer_fee: 378,
        }),
        makeInstallment({
          id: "i12",
          state: "paid",
          due_date: 1759476097,
          date_paid: 1759476097,
          customer_fee: 378,
        }),
      ],
    },
  ],
};
