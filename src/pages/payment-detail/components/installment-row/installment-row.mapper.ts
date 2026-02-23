import type { InstallmentDetail } from "@/api/types";
import type { InstallmentRowData } from "./installment-row.types";
import { formatCentsToCurrency } from "@/lib/format-cents-to-currency";
import { formatDate } from "@/lib/format-date";
import { t } from "@/lib/i18n";

interface ToInstallmentRowDataParams {
  installment: InstallmentDetail;
  countryOfService: string;
  isLast: boolean;
}

function getDateLabel({
  installment,
  countryOfService,
}: {
  installment: InstallmentDetail;
  countryOfService: string;
}): string {
  if (installment.state === "paid" && installment.date_paid) {
    return t("payments.details.installment.paidOn", {
      date: formatDate({ timestamp: installment.date_paid, format: "long", countryOfService }),
    });
  }

  return t("payments.details.installment.dueOn", {
    date: formatDate({ timestamp: installment.due_date, format: "long", countryOfService }),
  });
}

function getFees({
  installment,
  countryOfService,
}: {
  installment: InstallmentDetail;
  countryOfService: string;
}): string | null {
  if (installment.customer_fee <= 0) return null;

  return t("payments.details.installment.fees", {
    amount: formatCentsToCurrency({ cents: installment.customer_fee, countryOfService }),
  });
}

export function toInstallmentRowData({
  installment,
  countryOfService,
  isLast,
}: ToInstallmentRowDataParams): InstallmentRowData {
  return {
    id: installment.id,
    amount: formatCentsToCurrency({ cents: installment.purchase_amount, countryOfService }),
    date: formatDate({ timestamp: installment.due_date, format: "short", countryOfService }),
    dateLabel: getDateLabel({ installment, countryOfService }),
    state: installment.state,
    fees: getFees({ installment, countryOfService }),
    isLast,
  };
}
