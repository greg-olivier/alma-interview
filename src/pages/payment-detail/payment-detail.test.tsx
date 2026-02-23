import { describe, it, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import { PaymentDetail } from "./payment-detail";
import { server } from "@/test/mocks/server";
import { http } from "msw";
import { renderWithProviders } from "@/test/test-utils";

function renderPaymentDetail(id: string) {
  return renderWithProviders(<PaymentDetail />, {
    routerOptions: {
      initialEntries: [`/payments/${id}`],
      routes: [{ path: "/payments/:id", element: <PaymentDetail /> }],
    },
  });
}

describe("PaymentDetail", () => {
  it("should display the merchant name", async () => {
    const { getByText } = renderPaymentDetail("payment_1");
    await waitFor(() => {
      expect(getByText("France Merchant")).toBeInTheDocument();
    });
  });

  it("should display the remaining amount", async () => {
    const { getByText } = renderPaymentDetail("payment_1");
    await waitFor(() => {
      expect(getByText("Reste à payer")).toBeInTheDocument();
    });
  });

  it("should display the schedule", async () => {
    const { getByText, getAllByText } = renderPaymentDetail("payment_1");
    await waitFor(() => {
      expect(getByText("Échéancier")).toBeInTheDocument();
      expect(getAllByText(/^(Payé|À venir|En retard)$/)).toHaveLength(4);
    });
  });

  it("should display card information", async () => {
    const { getByText } = renderPaymentDetail("payment_1");
    await waitFor(() => {
      expect(getByText("VISA •••• 0003")).toBeInTheDocument();
    });
  });

  it("should display fees when present", async () => {
    const { getByText } = renderPaymentDetail("payment_1");
    await waitFor(() => {
      expect(getByText("Frais")).toBeInTheDocument();
    });
  });

  it("should display the order reference", async () => {
    const { getByText } = renderPaymentDetail("payment_1");
    await waitFor(() => {
      expect(getByText("ref-5007085773759018")).toBeInTheDocument();
    });
  });

  it("should display 'Tout est payé' for completed payments", async () => {
    const { getByText } = renderPaymentDetail("payment_3");
    await waitFor(() => {
      expect(getByText("Tout est payé")).toBeInTheDocument();
    });
  });

  it("should display error state for unknown payment", async () => {
    const { getByText } = renderPaymentDetail("unknown");
    await waitFor(() => {
      expect(getByText("Impossible de charger ce paiement.")).toBeInTheDocument();
      expect(getByText("Réessayer")).toBeInTheDocument();
    });
  });

  it("should navigate back to the list when clicking the back button", async () => {
    const { getByText, user } = renderWithProviders(<PaymentDetail />, {
      routerOptions: {
        initialEntries: [`/payments/payment_1`],
        routes: [
          { path: "/", element: <div>payments list</div> },
          { path: "/payments/:id", element: <PaymentDetail /> },
        ],
      },
    });

    await waitFor(() => {
      expect(getByText("France Merchant")).toBeInTheDocument();
    });

    await user.click(getByText(/Retour/));

    await waitFor(() => {
      expect(getByText("payments list")).toBeInTheDocument();
    });
  });

  it("should display skeletons while loading", () => {
    server.use(
      http.get("*/payment/:id", async () => {
        await new Promise(() => {});
      }),
    );
    const { container } = renderPaymentDetail("payment_1");
    const skeletons = container.querySelectorAll("[data-slot='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should hide progress bar for completed payments", async () => {
    const { queryByRole } = renderPaymentDetail("payment_3");
    await waitFor(() => {
      expect(queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  it("should display late payment with remaining amount", async () => {
    const { getByText } = renderPaymentDetail("payment_2");
    await waitFor(() => {
      expect(getByText("Reste à payer")).toBeInTheDocument();
    });
  });

  it("should hide order reference when no orders exist", async () => {
    const { queryByText } = renderPaymentDetail("payment_2");
    await waitFor(() => {
      expect(queryByText("Référence")).not.toBeInTheDocument();
    });
  });

  it("should display installment count without fees label when no fees", async () => {
    const { getByText, queryByText } = renderPaymentDetail("payment_no_fees");
    await waitFor(() => {
      expect(getByText(/2x sans frais/)).toBeInTheDocument();
      expect(queryByText("Frais")).not.toBeInTheDocument();
    });
  });
});
