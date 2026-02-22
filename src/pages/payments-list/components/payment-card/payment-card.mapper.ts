import type { PaymentSummary, Installment } from "@/api/types";
import type { PaymentCardData } from "./payment-card.types";
import { formatCentsToCurrency } from "@/lib/format-cents-to-currency";
import { formatDate } from "@/lib/format-date";

function findNextInstallment(plan: Installment[]): Installment | null {
  const nextPending = plan.find((i) => i.state === "pending");
  if (nextPending) return nextPending;

  const lateByDate = plan.filter((i) => i.state === "late").sort((a, b) => a.due_date - b.due_date);

  return lateByDate[0] ?? null;
}

function countPaidInstallments(plan: Installment[]): number {
  return plan.filter((i) => i.state === "paid").length;
}

export function toPaymentCardData(summary: PaymentSummary): PaymentCardData {
  const nextInstallment = findNextInstallment(summary.payment_plan);

  return {
    id: summary.id,
    merchantName: summary.merchant_display_name,
    logoUrl: summary.logo_url,
    state: summary.state,
    installmentCount: summary.payment_plan.length,
    purchaseAmount: formatCentsToCurrency({ cents: summary.purchase_amount, compact: true }),
    paidCount: countPaidInstallments(summary.payment_plan),
    totalCount: summary.payment_plan.length,
    nextInstallmentAmount: nextInstallment
      ? formatCentsToCurrency({ cents: nextInstallment.purchase_amount, compact: true })
      : null,
    nextInstallmentDate: nextInstallment
      ? formatDate({ timestamp: nextInstallment.due_date, format: "short" })
      : null,
  };
}
