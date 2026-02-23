import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentCard } from "./payment-card";
import { toPaymentCardData } from "./payment-card.mapper";
import {
  inProgressSummary,
  lateSummary,
  completedSummary,
} from "@/api/payments/__mocks__/payments.fixtures";

const meta: Meta<typeof PaymentCard> = {
  title: "Pages/PaymentsList/Components/PaymentCard",
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
