import type { PaymentCardData } from "./payment-card.types";
import { MerchantLogo } from "@/components/merchant-logo";
import { PaymentProgressBar } from "@/components/payment-progress-bar";

interface PaymentCardProps {
  payment: PaymentCardData;
  onClick: (id: string) => void;
}

export function PaymentCard({ payment, onClick }: PaymentCardProps) {
  const isLate = payment.state === "late";
  const isCompleted = payment.state === "completed";

  const handleOnClick = () => {
    onClick(payment.id);
  };

  return (
    <button
      onClick={handleOnClick}
      className="w-full cursor-pointer overflow-hidden rounded-xl border text-left transition-all hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ borderColor: isLate ? "#FECACA" : undefined }}
    >
      {isLate && (
        <div className="flex items-center gap-1.5 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600">
          <span>⚠</span> Paiement en retard
        </div>
      )}

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <MerchantLogo url={payment.logoUrl} name={payment.merchantName} />

          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-foreground">
              {payment.merchantName}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              {payment.installmentCount}x · {payment.purchaseAmount}
            </div>
          </div>

          {!isCompleted && payment.nextInstallmentAmount && (
            <div className="shrink-0 text-right">
              <div
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: isLate ? "#EF4444" : "#B0B3BA" }}
              >
                {isLate ? "Échéance due" : "Prochain paiement"}
              </div>
              <div
                className="text-base font-bold leading-tight"
                style={{ color: isLate ? "#DC2626" : undefined }}
              >
                {payment.nextInstallmentAmount}
              </div>
              <div
                className="mt-0.5 text-xs font-medium"
                style={{ color: isLate ? "#EF4444" : "#9CA3AF" }}
              >
                le {payment.nextInstallmentDate}
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="shrink-0 text-sm font-semibold text-green-600">✓ Payé</div>
          )}
        </div>

        {!isCompleted && (
          <PaymentProgressBar paidCount={payment.paidCount} totalCount={payment.totalCount} />
        )}
      </div>
    </button>
  );
}
