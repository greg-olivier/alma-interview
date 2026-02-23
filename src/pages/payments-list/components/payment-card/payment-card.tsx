import type { PaymentCardData } from "./payment-card.types";
import { MerchantLogo } from "@/components/merchant-logo";
import { PaymentProgressBar } from "@/components/payment-progress-bar";
import { t } from "@/lib/i18n";

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
      className={`w-full cursor-pointer overflow-hidden rounded-xl border text-left transition-all hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isLate ? "border-destructive/30" : ""}`}
    >
      {isLate && (
        <div className="flex items-center gap-1.5 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600">
          <span>⚠</span> {t("payments.list.card.lateBanner")}
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
                className={`text-[11px] font-semibold uppercase tracking-wide ${isLate ? "text-destructive" : "text-muted-foreground"}`}
              >
                {isLate
                  ? t("payments.list.card.dueDateLabel")
                  : t("payments.list.card.nextPayment")}
              </div>
              <div
                className={`text-base font-bold leading-tight ${isLate ? "text-destructive" : "text-foreground"}`}
              >
                {payment.nextInstallmentAmount}
              </div>
              <div
                className={`mt-0.5 text-xs font-medium ${isLate ? "text-destructive" : "text-muted-foreground"}`}
              >
                {`${t("payments.list.card.datePrefix")} ${payment.nextInstallmentDate}`}
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="shrink-0 text-sm font-semibold text-green-600">
              {t("payments.list.card.completed")}
            </div>
          )}
        </div>

        {!isCompleted && (
          <PaymentProgressBar paidCount={payment.paidCount} totalCount={payment.totalCount} />
        )}
      </div>
    </button>
  );
}
