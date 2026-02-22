import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaymentProgressBar } from "./payment-progress-bar";

describe("PaymentProgressBar", () => {
  it("should display the correct count label", () => {
    render(<PaymentProgressBar paidCount={1} totalCount={4} />);
    expect(screen.getByText("1/4")).toBeInTheDocument();
  });

  it("should be accessible with a descriptive label", () => {
    render(<PaymentProgressBar paidCount={2} totalCount={4} />);
    expect(screen.getByRole("progressbar")).toHaveAccessibleName("2 échéances payées sur 4");
  });

  it("should reflect the correct progress width", () => {
    render(<PaymentProgressBar paidCount={1} totalCount={4} />);
    expect(screen.getByRole("progressbar")).toHaveStyle({ width: "25%" });
  });

  it("should render nothing when total is zero", () => {
    const { container } = render(<PaymentProgressBar paidCount={0} totalCount={0} />);
    expect(container).toBeEmptyDOMElement();
  });
});
