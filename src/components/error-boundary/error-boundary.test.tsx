import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "./error-boundary";
import type { ReactNode } from "react";
import { renderWithProviders } from "@/test/test-utils";

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
    render(
      <ErrorBoundary>
        <div>Content</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render error UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
    expect(screen.getByText("Veuillez réessayer ultérieurement.")).toBeInTheDocument();
  });

  it("should recover when clicking the reset button", async () => {
    const { rerender } = renderWithProviders(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <div>Recovered</div>
      </ErrorBoundary>,
    );

    await userEvent.click(screen.getByText("Retour à mes paiements"));

    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });
});
