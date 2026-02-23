import { paymentsHandlers } from "@/api/payments/__mocks__/payments.handlers";
import { paymentDetailHandlers } from "@/api/payment-detail/__mocks__/payment-detail.handlers";

export const handlers = [...paymentsHandlers, ...paymentDetailHandlers];
