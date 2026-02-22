import { apiClient } from "@/api/client";
import type { PaymentsResponse } from "@/api/types";

const PAYMENTS_ENDPOINT = "payments";

export const paymentsService = {
  getPayments: (): Promise<PaymentsResponse> => {
    return apiClient<PaymentsResponse>(PAYMENTS_ENDPOINT);
  },
};
