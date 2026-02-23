import type { Meta, StoryObj } from "@storybook/react-vite";
import { PaymentSchedule } from "./payment-schedule";
import {
  mockPaymentDetail1,
  mockPaymentDetail2,
  mockPaymentDetail3,
} from "@/api/payment-detail/__mocks__/payment-detail.fixtures";

const meta: Meta<typeof PaymentSchedule> = {
  title: "Pages/PaymentDetail/PaymentSchedule",
  component: PaymentSchedule,
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PaymentSchedule>;

export const InProgress: Story = {
  args: {
    installments: mockPaymentDetail1.payment_plan,
    countryOfService: "FR",
  },
};

export const Late: Story = {
  args: {
    installments: mockPaymentDetail2.payment_plan,
    countryOfService: "FR",
  },
};

export const Completed: Story = {
  args: {
    installments: mockPaymentDetail3.payment_plan,
    countryOfService: "FR",
  },
};
