import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { MerchantLogo } from "./merchant-logo";

describe("MerchantLogo", () => {
  it("should render an image with alt text when url is provided", () => {
    const { getByRole } = renderWithProviders(
      <MerchantLogo url="https://example.com/logo.png" name="Acme" />,
    );
    const img = getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/logo.png");
    expect(img).toHaveAttribute("alt", "Acme");
  });

  it("should render the uppercase initial when url is null", () => {
    const { getByText } = renderWithProviders(<MerchantLogo url={null} name="france merchant" />);
    expect(getByText("F")).toBeInTheDocument();
  });

  it("should not render an image when url is null", () => {
    const { queryByRole } = renderWithProviders(<MerchantLogo url={null} name="Acme" />);
    expect(queryByRole("img")).not.toBeInTheDocument();
  });

  it("should render the initial when url is undefined", () => {
    const { getByText, queryByRole } = renderWithProviders(<MerchantLogo name="Acme" />);
    expect(getByText("A")).toBeInTheDocument();
    expect(queryByRole("img")).not.toBeInTheDocument();
  });
});
