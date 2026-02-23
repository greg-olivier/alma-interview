import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { PaymentsListEmpty } from "./payments-list-empty";

describe("PaymentsListEmpty", () => {
  it("should display active empty state", () => {
    const { getByText } = renderWithProviders(<PaymentsListEmpty type="active" />);
    expect(getByText("Aucun paiement en cours")).toBeInTheDocument();
    expect(getByText("Vous n'avez aucun échéancier actif pour le moment.")).toBeInTheDocument();
  });

  it("should display completed empty state", () => {
    const { getByText } = renderWithProviders(<PaymentsListEmpty type="completed" />);
    expect(getByText("Aucun paiement terminé")).toBeInTheDocument();
    expect(getByText("Vos paiements terminés apparaîtront ici.")).toBeInTheDocument();
  });
});
