import type { PaymentState } from "@/api/types";

export interface PaymentCardData {
  id: string;
  merchantName: string;
  logoUrl: string | null;
  state: PaymentState;
  installmentCount: number;
  purchaseAmount: string;
  paidCount: number;
  totalCount: number;
  nextInstallmentAmount: string | null;
  nextInstallmentDate: string | null;
}
