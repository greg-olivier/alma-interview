import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentDetailSkeleton } from "./payment-detail-skeleton";

const meta: Meta<typeof PaymentDetailSkeleton> = {
  title: "Pages/PaymentDetail/Components/Skeleton",
  component: PaymentDetailSkeleton,
};

export default meta;
type Story = StoryObj<typeof PaymentDetailSkeleton>;

export const Default: Story = {};
