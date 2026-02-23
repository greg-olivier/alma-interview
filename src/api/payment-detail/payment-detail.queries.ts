import { queryOptions } from "@tanstack/react-query";
import { paymentDetailService } from "./payment-detail.service";

const PAYMENT_DETAIL_KEY = "payment-detail";

export const paymentDetailQueries = {
  getPaymentDetail: (id: string) =>
    queryOptions({
      queryKey: [PAYMENT_DETAIL_KEY, id],
      queryFn: () => paymentDetailService.getPaymentDetail(id),
    }),
};
