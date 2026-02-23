import type { PaymentDetailResponse } from "@/api/types";

export const makeInstallmentDetail = (overrides = {}) => ({
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
  used_payment_method: null,
  ...overrides,
});

const baseDetail = {
  origin: "online_in_page",
  locale: "fr",
  country_of_service: "FR",
  deferred_trigger: false,
  deferred_days: 0,
  deferred_months: 0,
  merchant_name: "France Merchant",
  customer: {
    id: "customer_1",
    card: {
      id: "card_1",
      brand: "visa",
      iin: "411111",
      country: "FR",
      created: 1751527297,
      exp_month: 1,
      exp_year: 2030,
      last4: "0003",
      verified: true,
      psp: "stripe",
    },
  },
};

export const mockPaymentDetail1: PaymentDetailResponse = {
  ...baseDetail,
  id: "payment_1",
  created: 1751527297,
  state: "in_progress",
  merchant_display_name: "France Merchant",
  purchase_amount: 21000,
  amount_left_to_pay: 15750,
  logo_url: "https://cdn-icons-png.freepik.com/512/8312/8312956.png",
  fees: { customer: { total: 378, total_excluding_tax: 315, tax: 63 } },
  orders: [{ id: "order_1", created: 1751527297, merchant_reference: "ref-5007085773759018" }],
  payment_plan: [
    makeInstallmentDetail({
      id: "i1",
      state: "paid",
      date_paid: 1751527335,
      customer_fee: 378,
      used_payment_method: "card",
    }),
    makeInstallmentDetail({
      id: "i2",
      due_date: 1754205697,
      customer_can_postpone_until: "2025-09-03",
    }),
    makeInstallmentDetail({
      id: "i3",
      due_date: 1756884097,
      customer_can_postpone_until: "2025-10-03",
    }),
    makeInstallmentDetail({
      id: "i4",
      due_date: 1759476097,
      customer_can_postpone_until: "2025-11-03",
    }),
  ],
};

export const mockPaymentDetail2: PaymentDetailResponse = {
  ...baseDetail,
  id: "payment_2",
  created: 1750841654,
  state: "late",
  merchant_display_name: "France Merchant",
  purchase_amount: 50000,
  amount_left_to_pay: 25000,
  logo_url: null,
  fees: { customer: { total: 900, total_excluding_tax: 750, tax: 150 } },
  orders: [],
  payment_plan: [
    makeInstallmentDetail({
      id: "i5",
      purchase_amount: 12500,
      state: "paid",
      due_date: 1750841657,
      date_paid: 1750841694,
      customer_fee: 900,
      used_payment_method: "card",
    }),
    makeInstallmentDetail({
      id: "i6",
      purchase_amount: 12500,
      state: "paid",
      due_date: 1753433657,
      date_paid: 1751287110,
      used_payment_method: "card",
    }),
    makeInstallmentDetail({
      id: "i7",
      purchase_amount: 12500,
      state: "late",
      due_date: 1756112057,
      customer_can_postpone_until: "2025-09-25",
    }),
    makeInstallmentDetail({
      id: "i8",
      purchase_amount: 12500,
      state: "late",
      due_date: 1758790457,
      customer_can_postpone_until: "2025-10-26",
    }),
  ],
};

export const mockPaymentDetail3: PaymentDetailResponse = {
  ...baseDetail,
  id: "payment_3",
  created: 1751527297,
  state: "completed",
  merchant_display_name: "France Merchant",
  purchase_amount: 21000,
  amount_left_to_pay: 0,
  logo_url: null,
  fees: { customer: { total: 378, total_excluding_tax: 315, tax: 63 } },
  orders: [{ id: "order_3", created: 1751527297, merchant_reference: "ref-5007085773759018" }],
  payment_plan: [
    makeInstallmentDetail({
      id: "i9",
      state: "paid",
      date_paid: 1751527335,
      customer_fee: 378,
      used_payment_method: "card",
    }),
    makeInstallmentDetail({
      id: "i10",
      state: "paid",
      due_date: 1754205697,
      date_paid: 1754205697,
      customer_fee: 378,
      used_payment_method: "card",
    }),
    makeInstallmentDetail({
      id: "i11",
      state: "paid",
      due_date: 1756884097,
      date_paid: 1756884097,
      customer_fee: 378,
      used_payment_method: "card",
    }),
    makeInstallmentDetail({
      id: "i12",
      state: "paid",
      due_date: 1759476097,
      date_paid: 1759476097,
      customer_fee: 378,
      used_payment_method: "card",
    }),
  ],
};

export const mockPaymentDetailNoFees: PaymentDetailResponse = {
  ...baseDetail,
  id: "payment_no_fees",
  created: 1751527297,
  state: "in_progress",
  merchant_display_name: "No Fees Merchant",
  purchase_amount: 10000,
  amount_left_to_pay: 5000,
  logo_url: null,
  fees: { customer: { total: 0, total_excluding_tax: 0, tax: 0 } },
  orders: [],
  payment_plan: [
    makeInstallmentDetail({
      id: "i13",
      purchase_amount: 5000,
      state: "paid",
      date_paid: 1751527335,
      used_payment_method: "card",
    }),
    makeInstallmentDetail({
      id: "i14",
      purchase_amount: 5000,
      due_date: 1754205697,
    }),
  ],
};

export const mockPaymentDetails: Record<string, PaymentDetailResponse> = {
  payment_1: mockPaymentDetail1,
  payment_2: mockPaymentDetail2,
  payment_3: mockPaymentDetail3,
  payment_no_fees: mockPaymentDetailNoFees,
};
