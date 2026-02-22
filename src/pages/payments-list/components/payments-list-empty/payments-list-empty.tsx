import { t } from "@/lib/i18n";

interface PaymentsListEmptyProps {
  type: "active" | "completed";
}

export function PaymentsListEmpty({ type }: PaymentsListEmptyProps) {
  const isActive = type === "active";

  return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="mb-4 text-4xl">{isActive ? "📋" : "✅"}</div>
      <div className="text-sm font-semibold text-foreground">
        {isActive
          ? t("payments.list.empty.active.title")
          : t("payments.list.empty.completed.title")}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        {isActive
          ? t("payments.list.empty.active.description")
          : t("payments.list.empty.completed.description")}
      </div>
    </div>
  );
}
