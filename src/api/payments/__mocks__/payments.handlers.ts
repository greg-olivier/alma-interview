import { http, HttpResponse } from "msw";
import { mockPaymentsResponse } from "./payments.fixtures";

export const paymentsHandlers = [
  http.get("*/payments", () => {
    return HttpResponse.json(mockPaymentsResponse);
  }),
];
