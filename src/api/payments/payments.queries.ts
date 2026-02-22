import { queryOptions } from "@tanstack/react-query";
import { paymentsService } from "./payments.service";

const PAYMENTS_KEY = "payments";

export const paymentsQueries = {
  getPaymentsList: () =>
    queryOptions({
      queryKey: [PAYMENTS_KEY],
      queryFn: () => {
        return paymentsService.getPayments();
      },
    }),
};
