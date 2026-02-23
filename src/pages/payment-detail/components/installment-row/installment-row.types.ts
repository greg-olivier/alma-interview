import type { InstallmentState } from "@/api/types";

export interface InstallmentRowData {
  id: string;
  amount: string;
  date: string;
  dateLabel: string;
  state: InstallmentState;
  fees: string | null;
  isLast: boolean;
}
