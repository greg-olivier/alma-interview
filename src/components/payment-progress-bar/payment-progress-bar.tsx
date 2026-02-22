import { t } from "@/lib/i18n";

interface PaymentProgressBarProps {
  paidCount: number;
  totalCount: number;
}

const PERCENTAGE_FULL = 100;

export function PaymentProgressBar({ paidCount, totalCount }: PaymentProgressBarProps) {
  if (totalCount <= 0) return null;

  const percentage = (paidCount / totalCount) * PERCENTAGE_FULL;
  const isComplete = paidCount === totalCount;

  return (
    <div className="flex w-full items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isComplete ? "bg-green-600" : "bg-blue-600"
          }`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={paidCount}
          aria-valuemin={0}
          aria-valuemax={totalCount}
          aria-label={t("payment.progressBar.ariaLabel", { paid: paidCount, total: totalCount })}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {paidCount}/{totalCount}
      </span>
    </div>
  );
}
