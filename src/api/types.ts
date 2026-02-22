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
