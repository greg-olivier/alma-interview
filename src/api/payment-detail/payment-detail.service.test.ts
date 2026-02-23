import { describe, it, expect } from "vitest";
import { paymentDetailService } from "./payment-detail.service";

describe("paymentDetailService", () => {
  describe("getPaymentDetail", () => {
    it("should return payment detail for a valid id", async () => {
      const data = await paymentDetailService.getPaymentDetail("payment_1");
      expect(data.id).toBe("payment_1");
      expect(data.country_of_service).toBe("FR");
      expect(data.payment_plan).toHaveLength(4);
    });

    it("should return fees and card information", async () => {
      const data = await paymentDetailService.getPaymentDetail("payment_1");
      expect(data.fees.customer.total).toBe(378);
      expect(data.customer.card.last4).toBe("0003");
    });
  });
});
