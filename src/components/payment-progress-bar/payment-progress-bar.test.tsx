import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { PaymentProgressBar } from "./payment-progress-bar";

describe("PaymentProgressBar", () => {
  it("should display the correct count label", () => {
    const { getByText } = renderWithProviders(<PaymentProgressBar paidCount={1} totalCount={4} />);
    expect(getByText("1/4")).toBeInTheDocument();
  });

  it("should be accessible with a descriptive label", () => {
    const { getByRole } = renderWithProviders(<PaymentProgressBar paidCount={2} totalCount={4} />);
    expect(getByRole("progressbar")).toHaveAccessibleName("2 échéances payées sur 4");
  });

  it("should reflect the correct progress width", () => {
    const { getByRole } = renderWithProviders(<PaymentProgressBar paidCount={1} totalCount={4} />);
    expect(getByRole("progressbar")).toHaveStyle({ width: "25%" });
  });

  it("should render nothing when total is zero", () => {
    const { container } = renderWithProviders(<PaymentProgressBar paidCount={0} totalCount={0} />);
    expect(container).toBeEmptyDOMElement();
  });
});
