import { http, HttpResponse } from "msw";
import { mockPaymentDetails } from "./payment-detail.fixtures";

export const paymentDetailHandlers = [
  http.get("*/payment/:id", ({ params }) => {
    const { id } = params;
    const detail = mockPaymentDetails[id as string];

    if (!detail) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(detail);
  }),
];
