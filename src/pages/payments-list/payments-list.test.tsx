import { describe, it, expect } from "vitest";
import { renderWithProviders, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { PaymentsList } from "./payments-list";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

describe("PaymentsList", () => {
  it("should display skeletons while loading", () => {
    renderWithProviders(<PaymentsList />);
    const skeletons = document.querySelectorAll("[data-slot='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should display active payments by default", async () => {
    renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(screen.getByText("En cours (2)")).toBeInTheDocument();
      expect(screen.getAllByText("France Merchant")).toHaveLength(2);
    });
  });

  it("should display the total amount remaining banner", async () => {
    renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(screen.getByText("Montant restant à payer")).toBeInTheDocument();
    });
  });

  it("should display the late payment banner", async () => {
    renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(screen.getByText(/Paiement en retard/)).toBeInTheDocument();
    });
  });

  it("should switch to completed tab", async () => {
    renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(screen.getByText("Terminés (1)")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("Terminés (1)"));

    await waitFor(() => {
      expect(screen.getByText("✓ Payé")).toBeInTheDocument();
    });
  });

  it("should hide the total remaining banner on completed tab", async () => {
    renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(screen.getByText("Montant restant à payer")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("Terminés (1)"));

    await waitFor(() => {
      expect(screen.queryByText("Montant restant à payer")).not.toBeInTheDocument();
    });
  });

  it("should display error state with retry button when API fails", async () => {
    server.use(
      http.get("*/payments", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(screen.getByText("Impossible de charger vos paiements.")).toBeInTheDocument();
      expect(screen.getByText("Réessayer")).toBeInTheDocument();
    });
  });
});
