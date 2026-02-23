import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { mockPaymentDetail1 } from "@/api/payment-detail/__mocks__/payment-detail.fixtures";
import { PaymentSchedule } from "./payment-schedule";

describe("PaymentSchedule", () => {
  it("should display the title", () => {
    const { getByText } = renderWithProviders(
      <PaymentSchedule installments={mockPaymentDetail1.payment_plan} countryOfService="FR" />,
    );
    expect(getByText("Échéancier")).toBeInTheDocument();
  });

  it("should render all installments", () => {
    const { getAllByText } = renderWithProviders(
      <PaymentSchedule installments={mockPaymentDetail1.payment_plan} countryOfService="FR" />,
    );
    expect(getAllByText(/^(Payé|À venir|En retard)$/)).toHaveLength(4);
  });

  it("should display paid and pending badges", () => {
    const { getAllByText } = renderWithProviders(
      <PaymentSchedule installments={mockPaymentDetail1.payment_plan} countryOfService="FR" />,
    );
    expect(getAllByText("Payé")).toHaveLength(1);
    expect(getAllByText("À venir")).toHaveLength(3);
  });
});
