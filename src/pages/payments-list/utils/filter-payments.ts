import type { PaymentSummary } from "@/api/types";

export function filterActivePayments(payments: PaymentSummary[]): PaymentSummary[] {
  return payments.filter((p) => p.state === "in_progress" || p.state === "late");
}

export function filterCompletedPayments(payments: PaymentSummary[]): PaymentSummary[] {
  return payments.filter((p) => p.state === "completed");
}
