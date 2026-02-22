import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentsListSkeleton } from "./payments-list-skeleton";

const meta: Meta<typeof PaymentsListSkeleton> = {
  title: "Pages/PaymentsList/Components/Skeleton",
  component: PaymentsListSkeleton,
};

export default meta;
type Story = StoryObj<typeof PaymentsListSkeleton>;

export const Default: Story = {};
