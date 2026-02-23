import type { InstallmentRowData } from "./installment-row.types";
import { t } from "@/lib/i18n";

const STATE_STYLES = {
  paid: {
    dot: "bg-green-600",
    line: "bg-green-600/20",
    badge: "bg-green-600/10 text-green-600",
  },
  pending: {
    dot: "bg-muted-foreground/40",
    line: "bg-muted",
    badge: "bg-muted text-muted-foreground",
  },
  late: {
    dot: "bg-destructive",
    line: "bg-destructive/20",
    badge: "bg-destructive/10 text-destructive",
  },
} as const;

const STATE_LABELS: Record<string, string> = {
  paid: t("payments.details.installment.paid"),
  pending: t("payments.details.installment.pending"),
  late: t("payments.details.installment.late"),
};

interface InstallmentRowProps {
  installment: InstallmentRowData;
}

export function InstallmentRow({ installment }: InstallmentRowProps) {
  const styles = STATE_STYLES[installment.state];

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`h-3 w-3 shrink-0 rounded-full ${styles.dot}`} />
        {!installment.isLast && <div className={`w-0.5 flex-1 ${styles.line}`} />}
      </div>

      <div className="flex flex-1 items-start justify-between pb-6">
        <div>
          <div className="text-sm font-semibold text-foreground tabular-nums">
            {installment.amount}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">{installment.dateLabel}</div>
          {installment.fees && (
            <div className="mt-0.5 text-xs text-muted-foreground tabular-nums">
              {installment.fees}
            </div>
          )}
        </div>

        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.badge}`}>
          {STATE_LABELS[installment.state]}
        </span>
      </div>
    </div>
  );
}
