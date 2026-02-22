import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentProgressBar } from "./payment-progress-bar";

const meta: Meta<typeof PaymentProgressBar> = {
  title: "Components/PaymentProgressBar",
  component: PaymentProgressBar,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PaymentProgressBar>;

export const InProgress: Story = {
  args: { paidCount: 1, totalCount: 4 },
};

export const HalfPaid: Story = {
  args: { paidCount: 2, totalCount: 4 },
};

export const Complete: Story = {
  args: { paidCount: 4, totalCount: 4 },
};

export const NoPaid: Story = {
  args: { paidCount: 0, totalCount: 4 },
};
