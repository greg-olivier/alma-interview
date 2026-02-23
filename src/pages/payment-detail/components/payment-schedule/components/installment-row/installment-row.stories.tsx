import type { Meta, StoryObj } from "@storybook/react-vite";
import { InstallmentRow } from "./installment-row";
import { toInstallmentRowData } from "./installment-row.mapper";
import type { InstallmentDetail } from "@/api/types";

const makeInstallment = (overrides = {}): InstallmentDetail => ({
  id: "i1",
  purchase_amount: 5250,
  due_date: 1751527297,
  original_due_date: null,
  date_paid: null,
  state: "pending",
  customer_fee: 0,
  customer_interest: 0,
  customer_can_postpone_until: null,
  customer_cannot_postpone_reason: null,
  used_payment_method: null,
  ...overrides,
});

const meta: Meta<typeof InstallmentRow> = {
  title: "Pages/PaymentDetail/Components/InstallmentRow",
  component: InstallmentRow,
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InstallmentRow>;

export const Paid: Story = {
  args: {
    installment: toInstallmentRowData({
      installment: makeInstallment({ state: "paid", date_paid: 1751527335, customer_fee: 378 }),
      countryOfService: "FR",
      isLast: false,
    }),
  },
};

export const Pending: Story = {
  args: {
    installment: toInstallmentRowData({
      installment: makeInstallment(),
      countryOfService: "FR",
      isLast: false,
    }),
  },
};

export const Late: Story = {
  args: {
    installment: toInstallmentRowData({
      installment: makeInstallment({ state: "late" }),
      countryOfService: "FR",
      isLast: false,
    }),
  },
};

export const LastItem: Story = {
  args: {
    installment: toInstallmentRowData({
      installment: makeInstallment({ state: "pending" }),
      countryOfService: "FR",
      isLast: true,
    }),
  },
};
