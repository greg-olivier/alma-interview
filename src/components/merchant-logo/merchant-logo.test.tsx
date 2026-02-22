import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MerchantLogo } from "./merchant-logo";

describe("MerchantLogo", () => {
  it("should render an image with alt text when url is provided", () => {
    render(<MerchantLogo url="https://example.com/logo.png" name="Acme" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/logo.png");
    expect(img).toHaveAttribute("alt", "Acme");
  });

  it("should render the uppercase initial when url is null", () => {
    render(<MerchantLogo url={null} name="france merchant" />);
    expect(screen.getByText("F")).toBeInTheDocument();
  });

  it("should not render an image when url is null", () => {
    render(<MerchantLogo url={null} name="Acme" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should render the initial when url is undefined", () => {
    render(<MerchantLogo name="Acme" />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
