import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaymentSchedule } from "./payment-schedule";
import { mockPaymentDetail1 } from "@/api/payment-detail/__mocks__/payment-detail.fixtures";

describe("PaymentSchedule", () => {
  it("should display the title", () => {
    render(
      <PaymentSchedule installments={mockPaymentDetail1.payment_plan} countryOfService="FR" />,
    );
    expect(screen.getByText("Échéancier")).toBeInTheDocument();
  });

  it("should render all installments", () => {
    render(
      <PaymentSchedule installments={mockPaymentDetail1.payment_plan} countryOfService="FR" />,
    );
    screen.debug();
    expect(screen.getAllByText(/^(Payé|À venir|En retard)$/)).toHaveLength(4);
  });

  it("should display paid and pending badges", () => {
    render(
      <PaymentSchedule installments={mockPaymentDetail1.payment_plan} countryOfService="FR" />,
    );
    expect(screen.getAllByText("Payé")).toHaveLength(1);
    expect(screen.getAllByText("À venir")).toHaveLength(3);
  });
});
