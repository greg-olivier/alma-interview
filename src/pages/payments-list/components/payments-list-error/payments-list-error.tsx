import { t } from "@/lib/i18n";

interface PaymentsListErrorProps {
  onRetry: () => void;
}

export function PaymentsListError({ onRetry }: PaymentsListErrorProps) {
  const handleRetry = () => {
    onRetry();
  };
  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center px-6 py-20 text-center">
      <p className="text-sm text-muted-foreground">{t("payments.list.error.message")}</p>
      <button
        onClick={handleRetry}
        className="mt-4 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {t("payments.list.error.retry")}
      </button>
    </div>
  );
}
