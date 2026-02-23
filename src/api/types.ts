export type InstallmentState = "paid" | "pending" | "late";
export type PaymentState = "in_progress" | "late" | "completed";

export interface Installment {
  id: string;
  purchase_amount: number;
  due_date: number;
  original_due_date: number | null;
  date_paid: number | null;
  state: InstallmentState;
  customer_fee: number;
  customer_interest: number;
  customer_can_postpone_until: string | null;
  customer_cannot_postpone_reason: string | null;
}

export interface PaymentSummary {
  id: string;
  created: number;
  state: PaymentState;
  merchant_display_name: string;
  purchase_amount: number;
  payment_plan: Installment[];
  logo_url: string | null;
  refunds: unknown[];
}

export interface PaymentsResponse {
  total_amount_left_to_pay: number;
  payments: PaymentSummary[];
}

export interface InstallmentDetail extends Installment {
  used_payment_method: string | null;
}

export interface PaymentCard {
  id: string;
  brand: string;
  iin: string;
  country: string;
  created: number;
  exp_month: number;
  exp_year: number;
  last4: string;
  verified: boolean;
  psp: string;
}

export interface PaymentOrder {
  id: string;
  created: number;
  merchant_reference: string;
}

export interface PaymentDetailResponse {
  id: string;
  created: number;
  state: PaymentState;
  origin: string;
  locale: string;
  country_of_service: string;
  purchase_amount: number;
  amount_left_to_pay: number;
  logo_url: string | null;
  merchant_display_name: string;
  merchant_name: string;
  deferred_trigger: boolean;
  deferred_days: number;
  deferred_months: number;
  fees: {
    customer: {
      total: number;
      total_excluding_tax: number;
      tax: number;
    };
  };
  customer: {
    id: string;
    card: PaymentCard;
  };
  orders: PaymentOrder[];
  payment_plan: InstallmentDetail[];
}
