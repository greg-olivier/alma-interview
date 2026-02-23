import { apiClient } from "@/api/client";
import type { PaymentDetailResponse } from "@/api/types";

export const paymentDetailService = {
  getPaymentDetail: (id: string): Promise<PaymentDetailResponse> => {
    return apiClient<PaymentDetailResponse>(`payment/${id}`);
  },
};
