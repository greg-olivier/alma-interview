import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { paymentDetailQueries } from "@/api/payment-detail";
import { MerchantLogo } from "@/components/merchant-logo";
import { PaymentProgressBar } from "@/components/payment-progress-bar";
import { PaymentSchedule } from "./components/payment-schedule";
import { PaymentDetailSkeleton } from "./components/payment-detail-skeleton";
import { PaymentDetailError } from "./components/payment-detail-error";
import { formatCentsToCurrency } from "@/lib/format-cents-to-currency";
import { t } from "@/lib/i18n";

export function PaymentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery(
    paymentDetailQueries.getPaymentDetail(id!),
  );

  function handleBack() {
    navigate("/");
  }

  if (isLoading) return <PaymentDetailSkeleton />;
  if (isError || !data) return <PaymentDetailError onRetry={refetch} />;

  const isCompleted = data.state === "completed";
  const isLate = data.state === "late";
  const hasFees = data.fees.customer.total > 0;
  const paidCount = data.payment_plan.filter((i) => i.state === "paid").length;
  const installmentLabel = hasFees
    ? t("payments.details.installmentCountWithFees", { count: data.payment_plan.length })
    : t("payments.details.installmentCount", { count: data.payment_plan.length });

  return (
    <div className="mx-auto max-w-[640px] px-6 py-10">
      <button
        onClick={handleBack}
        className="mb-6 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← {t("payments.details.back")}
      </button>

      <div className="mb-6 flex items-center gap-3">
        <MerchantLogo url={data.logo_url} name={data.merchant_display_name} size="lg" />
        <div>
          <div className="text-lg font-bold text-foreground">{data.merchant_display_name}</div>
          <div className="text-sm text-muted-foreground">
            {installmentLabel} ·{" "}
            {formatCentsToCurrency({
              cents: data.purchase_amount,
              countryOfService: data.country_of_service,
              compact: true,
            })}
          </div>
        </div>
      </div>

      <div className={`mb-6 rounded-xl border p-4 ${isLate ? "border-destructive/30" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium text-muted-foreground">
            {isCompleted ? t("payments.details.totalPaid") : t("payments.details.remaining")}
          </div>
          <div className={`text-lg font-bold ${isLate ? "text-destructive" : "text-foreground"}`}>
            {formatCentsToCurrency({
              cents: data.amount_left_to_pay,
              countryOfService: data.country_of_service,
              compact: true,
            })}
          </div>
        </div>
        {!isCompleted && (
          <div className="mt-3">
            <PaymentProgressBar paidCount={paidCount} totalCount={data.payment_plan.length} />
          </div>
        )}
      </div>

      <div className="mb-6">
        <PaymentSchedule
          installments={data.payment_plan}
          countryOfService={data.country_of_service}
        />
      </div>

      <div className="space-y-3 rounded-xl border p-4">
        {hasFees && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("payments.details.totalFees")}</span>
            <span className="font-medium">
              {formatCentsToCurrency({
                cents: data.fees.customer.total,
                countryOfService: data.country_of_service,
              })}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("payments.details.paymentMethod")}</span>
          <div className="text-right">
            <div className="font-medium">
              {t("payments.details.cardLabel", {
                brand: data.customer.card.brand.toUpperCase(),
                last4: data.customer.card.last4,
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              {t("payments.details.cardExpiry", {
                month: String(data.customer.card.exp_month).padStart(2, "0"),
                year: data.customer.card.exp_year,
              })}
            </div>
          </div>
        </div>

        {data.orders.length > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("payments.details.orderReference")}</span>
            <span className="font-medium">{data.orders[0]!.merchant_reference}</span>
          </div>
        )}
      </div>
    </div>
  );
}
