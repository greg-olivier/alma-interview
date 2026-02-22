import { describe, it, expect } from "vitest";
import { filterActivePayments, filterCompletedPayments } from "./filter-payments";
import { mockPaymentsResponse } from "@/api/payments/__mocks__/payments.fixtures";

const { payments } = mockPaymentsResponse;

describe("filterActivePayments", () => {
  it("should return in_progress and late payments", () => {
    const result = filterActivePayments(payments);
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.state !== "completed")).toBe(true);
  });

  it("should return empty array when no active payments", () => {
    const completed = payments.filter((p) => p.state === "completed");
    expect(filterActivePayments(completed)).toHaveLength(0);
  });
});

describe("filterCompletedPayments", () => {
  it("should return only completed payments", () => {
    const result = filterCompletedPayments(payments);
    expect(result).toHaveLength(1);
    expect(result.every((p) => p.state === "completed")).toBe(true);
  });

  it("should return empty array when no completed payments", () => {
    const active = payments.filter((p) => p.state !== "completed");
    expect(filterCompletedPayments(active)).toHaveLength(0);
  });
});
