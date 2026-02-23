import { describe, it, expect } from "vitest";
import type { InstallmentDetail } from "@/api/types";
import { renderWithProviders } from "@/test/test-utils";
import { InstallmentRow } from "./installment-row";
import { toInstallmentRowData } from "./installment-row.mapper";

const makeInstallment = (overrides = {}): InstallmentDetail => ({
  id: "i1",
  purchase_amount: 5250,
  due_date: 1751527297,
  original_due_date: null,
  date_paid: null,
  state: "pending",
  customer_fee: 0,
  customer_interest: 0,
  customer_can_postpone_until: null,
  customer_cannot_postpone_reason: null,
  used_payment_method: null,
  ...overrides,
});

describe("toInstallmentRowData", () => {
  it("should use date_paid for paid installments", () => {
    const data = toInstallmentRowData({
      installment: makeInstallment({ state: "paid", date_paid: 1751527335 }),
      countryOfService: "FR",
      isLast: false,
    });
    expect(data.dateLabel).toContain("Payé le");
  });

  it("should use due_date for pending installments", () => {
    const data = toInstallmentRowData({
      installment: makeInstallment(),
      countryOfService: "FR",
      isLast: false,
    });
    expect(data.dateLabel).toContain("Échéance le");
  });

  it("should include fees when present", () => {
    const data = toInstallmentRowData({
      installment: makeInstallment({ customer_fee: 378 }),
      countryOfService: "FR",
      isLast: false,
    });
    expect(data.fees).toContain("3,78");
    expect(data.fees).toContain("frais");
    expect(data.fees).toContain("€");
  });

  it("should return null fees when zero", () => {
    const data = toInstallmentRowData({
      installment: makeInstallment({ customer_fee: 0 }),
      countryOfService: "FR",
      isLast: false,
    });
    expect(data.fees).toBeNull();
  });
});

describe("InstallmentRow", () => {
  it("should display amount and date label", () => {
    const data = toInstallmentRowData({
      installment: makeInstallment(),
      countryOfService: "FR",
      isLast: false,
    });
    const { getByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(getByText((text) => text.includes("52,50"))).toBeInTheDocument();
    expect(getByText((text) => text.includes("3 juillet 2025"))).toBeInTheDocument();
  });

  it("should display the correct badge for paid state", () => {
    const data = toInstallmentRowData({
      installment: makeInstallment({ state: "paid", date_paid: 1751527335 }),
      countryOfService: "FR",
      isLast: false,
    });
    const { getByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(getByText("Payé")).toBeInTheDocument();
  });

  it("should display the correct badge for late state", () => {
    const data = toInstallmentRowData({
      installment: makeInstallment({ state: "late" }),
      countryOfService: "FR",
      isLast: false,
    });
    const { getByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(getByText("En retard")).toBeInTheDocument();
  });

  it("should display fees when present", () => {
    const data = toInstallmentRowData({
      installment: makeInstallment({ customer_fee: 378 }),
      countryOfService: "FR",
      isLast: false,
    });
    const { getByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(getByText((text) => text.includes("3,78"))).toBeInTheDocument();
  });

  it("should not display fees when null", () => {
    const data = toInstallmentRowData({
      installment: makeInstallment({ customer_fee: 0 }),
      countryOfService: "FR",
      isLast: false,
    });
    const { queryByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(queryByText(/frais/)).not.toBeInTheDocument();
  });
});
