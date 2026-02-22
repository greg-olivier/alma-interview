import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { ErrorPage } from "./error-page";

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
});
