import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { logger } from "@/lib/logger";
import { ErrorPage } from "./error-page";

vi.mock("@/lib/logger", () => ({
  logger: { error: vi.fn() },
}));

describe("ErrorPage", () => {
  it("should display 404 content for unknown routes", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <div>Home</div>,
          errorElement: <ErrorPage />,
        },
      ],
      { initialEntries: ["/unknown-route"] },
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByText("Page introuvable")).toBeInTheDocument();
    expect(screen.getByText("Retour à mes paiements")).toBeInTheDocument();
  });

  it("should not log 404 errors", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <div>Home</div>,
          errorElement: <ErrorPage />,
        },
      ],
      { initialEntries: ["/unknown-route"] },
    );

    render(<RouterProvider router={router} />);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it("should display generic error content and log the error", async () => {
    function BrokenComponent(): never {
      throw new Error("Something broke");
    }

    const router = createMemoryRouter([
      {
        path: "/",
        element: <BrokenComponent />,
        errorElement: <ErrorPage />,
      },
    ]);

    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Une erreur est survenue")).toBeInTheDocument();
    expect(screen.getByText("Veuillez réessayer ultérieurement.")).toBeInTheDocument();
    expect(logger.error).toHaveBeenCalled();
  });
});
