import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentsListError } from "./payments-list-error";

const meta: Meta<typeof PaymentsListError> = {
  title: "Pages/PaymentsList/Error",
  component: PaymentsListError,
};

export default meta;
type Story = StoryObj<typeof PaymentsListError>;

export const Default: Story = {
  args: {
    onRetry: () => {},
  },
};
