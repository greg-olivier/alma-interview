import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";
import { renderWithProviders, waitFor } from "@/test/test-utils";
import { PaymentsList } from "./payments-list";
import { inProgressSummary, completedSummary } from "@/api/payments/__mocks__/payments.fixtures";

describe("PaymentsList", () => {
  it("should display skeletons while loading", () => {
    const { container } = renderWithProviders(<PaymentsList />);
    const skeletons = container.querySelectorAll("[data-slot='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should display active payments by default", async () => {
    const { getByText, getAllByText } = renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(getByText("En cours (2)")).toBeInTheDocument();
      expect(getAllByText("France Merchant")).toHaveLength(2);
    });
  });

  it("should display the total amount remaining banner", async () => {
    const { getByText } = renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(getByText("Montant restant à payer")).toBeInTheDocument();
    });
  });

  it("should display the late payment banner", async () => {
    const { getByText } = renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(getByText(/Paiement en retard/)).toBeInTheDocument();
    });
  });

  it("should switch to completed tab", async () => {
    const { getByText, user } = renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(getByText("Terminés (1)")).toBeInTheDocument();
    });

    await user.click(getByText("Terminés (1)"));

    await waitFor(() => {
      expect(getByText("✓ Payé")).toBeInTheDocument();
    });
  });

  it("should hide the total remaining banner on completed tab", async () => {
    const { getByText, queryByText, user } = renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(getByText("Montant restant à payer")).toBeInTheDocument();
    });

    await user.click(getByText("Terminés (1)"));

    await waitFor(() => {
      expect(queryByText("Montant restant à payer")).not.toBeInTheDocument();
    });
  });

  it("should navigate to payment detail when clicking a payment card", async () => {
    const { getByText, getAllByText, user } = renderWithProviders(<PaymentsList />, {
      routerOptions: {
        initialEntries: ["/"],
        routes: [
          { path: "/", element: <PaymentsList /> },
          { path: "/payments/:id", element: <div>payment details</div> },
        ],
      },
    });

    await waitFor(() => {
      expect(getByText("En cours (2)")).toBeInTheDocument();
    });

    await user.click(getAllByText("France Merchant")[0]!);

    await waitFor(() => {
      expect(getByText("payment details")).toBeInTheDocument();
    });
  });

  it("should display empty state for completed tab when no completed payments", async () => {
    server.use(
      http.get("*/payments", () => {
        return HttpResponse.json({
          total_amount_left_to_pay: 10000,
          payments: [inProgressSummary],
        });
      }),
    );

    const { getByText, user } = renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(getByText("Terminés (0)")).toBeInTheDocument();
    });

    await user.click(getByText("Terminés (0)"));

    await waitFor(() => {
      expect(getByText("Aucun paiement terminé")).toBeInTheDocument();
    });
  });

  it("should display empty state for active tab when no active payments", async () => {
    server.use(
      http.get("*/payments", () => {
        return HttpResponse.json({
          total_amount_left_to_pay: 0,
          payments: [completedSummary],
        });
      }),
    );

    const { getByText } = renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(getByText("Aucun paiement en cours")).toBeInTheDocument();
    });
  });

  it("should display error state with retry button when API fails", async () => {
    server.use(
      http.get("*/payments", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { getByText } = renderWithProviders(<PaymentsList />);
    await waitFor(() => {
      expect(getByText("Impossible de charger vos paiements.")).toBeInTheDocument();
      expect(getByText("Réessayer")).toBeInTheDocument();
    });
  });
});
