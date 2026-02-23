import { useQuery } from "@tanstack/react-query";
import { Tabs } from "@/components/ui/tabs";
import { paymentsQueries } from "@/api/payments";
import { PaymentCard, toPaymentCardData } from "./components/payment-card";
import { formatCentsToCurrency } from "@/lib/format-cents-to-currency";
import { filterActivePayments, filterCompletedPayments } from "./utils/filter-payments";
import { t } from "@/lib/i18n";
import { PaymentsListSkeleton } from "./components/payments-list-skeleton";
import { PaymentsListError } from "./components/payments-list-error";
import { PaymentsListEmpty } from "./components/payments-list-empty";
import { useNavigate } from "react-router";

export function PaymentsList() {
  const { data, isLoading, isError, refetch } = useQuery(paymentsQueries.getPaymentsList());
  const navigate = useNavigate();

  if (isLoading) return <PaymentsListSkeleton />;
  if (isError || !data) return <PaymentsListError onRetry={refetch} />;

  const activePayments = filterActivePayments(data.payments);
  const completedPayments = filterCompletedPayments(data.payments);

  const handlePaymentClick = (paymentId: string): void => {
    navigate(`/payments/${paymentId}`);
  };

  return (
    <div className="mx-auto max-w-[640px] px-6 py-10">
      <h1 className="mb-8 text-2xl font-extrabold tracking-tight">{t("payments.list.title")}</h1>

      <Tabs defaultValue="active">
        <Tabs.List className="mb-6">
          <Tabs.Trigger value="active">
            {t("payments.list.tabs.active")} ({activePayments.length})
          </Tabs.Trigger>
          <Tabs.Trigger value="completed">
            {t("payments.list.tabs.completed")} ({completedPayments.length})
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="active">
          {activePayments.length > 0 && data && (
            <div className="mb-5 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 p-5 text-white">
              <div className="text-xs font-medium opacity-80">
                {t("payments.list.totalRemaining")}
              </div>
              <div className="mt-1 text-3xl font-extrabold tracking-tight">
                {formatCentsToCurrency({ cents: data.total_amount_left_to_pay, compact: true })}
              </div>
            </div>
          )}

          {activePayments.length > 0 ? (
            <div className="flex flex-col gap-3">
              {activePayments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  payment={toPaymentCardData(payment)}
                  onClick={handlePaymentClick}
                />
              ))}
            </div>
          ) : (
            <PaymentsListEmpty type="active" />
          )}
        </Tabs.Content>

        <Tabs.Content value="completed">
          {completedPayments.length > 0 ? (
            <div className="flex flex-col gap-3">
              {completedPayments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  payment={toPaymentCardData(payment)}
                  onClick={handlePaymentClick}
                />
              ))}
            </div>
          ) : (
            <PaymentsListEmpty type="completed" />
          )}
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
