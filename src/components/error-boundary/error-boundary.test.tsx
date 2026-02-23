import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { ErrorBoundary } from "./error-boundary";

function ThrowingComponent(): ReactNode {
  throw new Error("Test error");
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render children when no error", () => {
    const { getByText } = renderWithProviders(
      <ErrorBoundary>
        <div>Content</div>
      </ErrorBoundary>,
    );
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("should render error UI when a child throws", () => {
    const { getByText } = renderWithProviders(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );
    expect(getByText("Une erreur est survenue")).toBeInTheDocument();
    expect(getByText("Veuillez réessayer ultérieurement.")).toBeInTheDocument();
  });

  it("should recover when clicking the reset button", async () => {
    const { getByText } = renderWithProviders(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );

    expect(getByText("Une erreur est survenue")).toBeInTheDocument();

    const link = getByText("Retour à mes paiements");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
