import type { Meta, StoryObj } from "@storybook/react-vite";
import { InstallmentRow } from "./installment-row";
import { toInstallmentRowData } from "./installment-row.mapper";
import { makeInstallmentDetail } from "@/api/payment-detail/__mocks__/payment-detail.fixtures";

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
      installment: makeInstallmentDetail({
        state: "paid",
        date_paid: 1751527335,
        customer_fee: 378,
      }),
      countryOfService: "FR",
      isLast: false,
    }),
  },
};

export const Pending: Story = {
  args: {
    installment: toInstallmentRowData({
      installment: makeInstallmentDetail({ state: "pending" }),
      countryOfService: "FR",
      isLast: false,
    }),
  },
};

export const Late: Story = {
  args: {
    installment: toInstallmentRowData({
      installment: makeInstallmentDetail({ state: "late" }),
      countryOfService: "FR",
      isLast: false,
    }),
  },
};

export const LastItem: Story = {
  args: {
    installment: toInstallmentRowData({
      installment: makeInstallmentDetail({ state: "pending" }),
      countryOfService: "FR",
      isLast: true,
    }),
  },
};
