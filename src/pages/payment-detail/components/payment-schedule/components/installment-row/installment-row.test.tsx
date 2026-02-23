import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { InstallmentRow } from "./installment-row";
import { toInstallmentRowData } from "./installment-row.mapper";
import { makeInstallmentDetail } from "@/api/payment-detail/__mocks__/payment-detail.fixtures";

describe("toInstallmentRowData", () => {
  it("should use date_paid for paid installments", () => {
    const data = toInstallmentRowData({
      installment: makeInstallmentDetail({ state: "paid", date_paid: 1751527335 }),
      countryOfService: "FR",
      isLast: false,
    });
    expect(data.dateLabel).toContain("Payé le");
  });

  it("should use due_date for pending installments", () => {
    const data = toInstallmentRowData({
      installment: makeInstallmentDetail({ state: "pending" }),
      countryOfService: "FR",
      isLast: false,
    });
    expect(data.dateLabel).toContain("Échéance le");
  });

  it("should include fees when present", () => {
    const data = toInstallmentRowData({
      installment: makeInstallmentDetail({ customer_fee: 378 }),
      countryOfService: "FR",
      isLast: false,
    });
    expect(data.fees).toContain("3,78");
    expect(data.fees).toContain("frais");
    expect(data.fees).toContain("€");
  });

  it("should return null fees when zero", () => {
    const data = toInstallmentRowData({
      installment: makeInstallmentDetail({ customer_fee: 0 }),
      countryOfService: "FR",
      isLast: false,
    });
    expect(data.fees).toBeNull();
  });
});

describe("InstallmentRow", () => {
  it("should display amount and date label", () => {
    const data = toInstallmentRowData({
      installment: makeInstallmentDetail({ state: "pending" }),
      countryOfService: "FR",
      isLast: false,
    });
    const { getByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(getByText((text) => text.includes("52,50"))).toBeInTheDocument();
    expect(getByText((text) => text.includes("3 juillet 2025"))).toBeInTheDocument();
  });

  it("should display the correct badge for paid state", () => {
    const data = toInstallmentRowData({
      installment: makeInstallmentDetail({ state: "paid", date_paid: 1751527335 }),
      countryOfService: "FR",
      isLast: false,
    });
    const { getByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(getByText("Payé")).toBeInTheDocument();
  });

  it("should display the correct badge for late state", () => {
    const data = toInstallmentRowData({
      installment: makeInstallmentDetail({ state: "late" }),
      countryOfService: "FR",
      isLast: false,
    });
    const { getByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(getByText("En retard")).toBeInTheDocument();
  });

  it("should display fees when present", () => {
    const data = toInstallmentRowData({
      installment: makeInstallmentDetail({ customer_fee: 378 }),
      countryOfService: "FR",
      isLast: false,
    });
    const { getByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(getByText((text) => text.includes("3,78"))).toBeInTheDocument();
  });

  it("should not display fees when null", () => {
    const data = toInstallmentRowData({
      installment: makeInstallmentDetail({ customer_fee: 0 }),
      countryOfService: "FR",
      isLast: false,
    });
    const { queryByText } = renderWithProviders(<InstallmentRow installment={data} />);
    expect(queryByText(/frais/)).not.toBeInTheDocument();
  });
});
