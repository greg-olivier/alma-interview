import { describe, it, expect } from "vitest";
import { paymentsService } from "./payments.service";

describe("paymentService", () => {
  describe("getPayments", () => {
    it("should return all payments", async () => {
      const data = await paymentsService.getPayments();
      expect(data.payments).toHaveLength(3);
    });

    it("should return the total amount left to pay", async () => {
      const data = await paymentsService.getPayments();
      expect(data.total_amount_left_to_pay).toBe(40750);
    });

    it("should return payments with expected states", async () => {
      const data = await paymentsService.getPayments();
      const states = data.payments.map((p) => p.state);
      expect(states).toContain("in_progress");
      expect(states).toContain("late");
      expect(states).toContain("completed");
    });
  });
});
