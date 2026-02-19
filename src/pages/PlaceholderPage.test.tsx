import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "@/test/test-utils";
import { PlaceholderPage } from "./PlaceholderPage";

describe("App", () => {
  it("renders without crashing", () => {
    renderWithProviders(<PlaceholderPage />);
    expect(screen.getByText("Payments list placeholder")).toBeInTheDocument();
  });
});
