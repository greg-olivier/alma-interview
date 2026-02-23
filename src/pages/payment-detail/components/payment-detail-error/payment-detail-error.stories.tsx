import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentDetailError } from "./payment-detail-error";

const meta: Meta<typeof PaymentDetailError> = {
  title: "Pages/PaymentDetail/Components/Error",
  component: PaymentDetailError,
};

export default meta;
type Story = StoryObj<typeof PaymentDetailError>;

export const Default: Story = {
  args: { onRetry: () => {} },
};
