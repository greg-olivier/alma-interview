import type { InstallmentDetail } from "@/api/types";
import { InstallmentRow, toInstallmentRowData } from "./components/installment-row";
import { t } from "@/lib/i18n";

interface PaymentScheduleProps {
  installments: InstallmentDetail[];
  countryOfService: string;
}

export function PaymentSchedule({ installments, countryOfService }: PaymentScheduleProps) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-foreground">
        {t("payments.details.schedule.title")}
      </h2>
      <div>
        {installments.map((installment, index) => (
          <InstallmentRow
            key={installment.id}
            installment={toInstallmentRowData({
              installment,
              countryOfService,
              isLast: index === installments.length - 1,
            })}
          />
        ))}
      </div>
    </div>
  );
}
