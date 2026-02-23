import { t } from "@/lib/i18n";

interface PaymentDetailErrorProps {
  onRetry: () => void;
}

export function PaymentDetailError({ onRetry }: PaymentDetailErrorProps) {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center px-6 py-20 text-center">
      <p className="text-sm text-muted-foreground">{t("payments.details.error.message")}</p>
      <button onClick={onRetry} className="mt-4 text-sm font-semibold text-primary hover:underline">
        {t("payments.details.error.retry")}
      </button>
    </div>
  );
}
