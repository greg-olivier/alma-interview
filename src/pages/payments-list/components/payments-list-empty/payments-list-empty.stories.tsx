import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentsListEmpty } from "./payments-list-empty";

const meta: Meta<typeof PaymentsListEmpty> = {
  title: "Pages/PaymentsList/Components/Empty",
  component: PaymentsListEmpty,
};

export default meta;
type Story = StoryObj<typeof PaymentsListEmpty>;

export const Active: Story = {
  args: { type: "active" },
};

export const Completed: Story = {
  args: { type: "completed" },
};
