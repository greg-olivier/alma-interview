import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentCard } from "./payment-card";
import { toPaymentCardData } from "./payment-card.mapper";
import type { PaymentSummary } from "@/api/types";

const makeInstallment = (overrides = {}) => ({
  id: "i1",
  purchase_amount: 5250,
  due_date: 1751527297,
  original_due_date: null,
  date_paid: null,
  state: "pending" as const,
  customer_fee: 0,
  customer_interest: 0,
  customer_can_postpone_until: null,
  customer_cannot_postpone_reason: null,
  ...overrides,
});

const inProgressSummary: PaymentSummary = {
  id: "payment_1",
  created: 1751527297,
  state: "in_progress",
  merchant_display_name: "France Merchant",
  purchase_amount: 21000,
  logo_url: "https://cdn-icons-png.freepik.com/512/8312/8312956.png",
  refunds: [],
  payment_plan: [
    makeInstallment({ id: "i1", state: "paid", date_paid: 1751527335 }),
    makeInstallment({ id: "i2", due_date: 1754205697 }),
    makeInstallment({ id: "i3", due_date: 1756884097 }),
    makeInstallment({ id: "i4", due_date: 1759476097 }),
  ],
};

const lateSummary: PaymentSummary = {
  ...inProgressSummary,
  id: "payment_2",
  state: "late",
  logo_url: null,
  purchase_amount: 50000,
  payment_plan: [
    makeInstallment({ id: "i1", purchase_amount: 12500, state: "paid", date_paid: 1751527335 }),
    makeInstallment({ id: "i2", purchase_amount: 12500, state: "paid", date_paid: 1751527335 }),
    makeInstallment({ id: "i3", purchase_amount: 12500, state: "late", due_date: 1756112057 }),
    makeInstallment({ id: "i4", purchase_amount: 12500, state: "late", due_date: 1758790457 }),
  ],
};

const completedSummary: PaymentSummary = {
  ...inProgressSummary,
  id: "payment_3",
  state: "completed",
  logo_url: null,
  payment_plan: inProgressSummary.payment_plan.map((i) => ({
    ...i,
    state: "paid" as const,
    date_paid: 1751527335,
  })),
};

const meta: Meta<typeof PaymentCard> = {
  title: "Components/PaymentCard",
  component: PaymentCard,
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PaymentCard>;

export const InProgress: Story = {
  args: {
    payment: toPaymentCardData(inProgressSummary),
    onClick: () => {},
  },
};

export const Late: Story = {
  args: {
    payment: toPaymentCardData(lateSummary),
    onClick: () => {},
  },
};

export const Completed: Story = {
  args: {
    payment: toPaymentCardData(completedSummary),
    onClick: () => {},
  },
};
