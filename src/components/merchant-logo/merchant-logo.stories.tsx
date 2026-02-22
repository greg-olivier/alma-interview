import type { Meta, StoryObj } from "@storybook/react-vite";
import { MerchantLogo } from "./merchant-logo";
import { type LogoSize } from "./merchant-logo.constants";
import { LOGO_SIZES } from "./merchant-logo.constants";

const meta: Meta<typeof MerchantLogo> = {
  title: "Components/MerchantLogo",
  component: MerchantLogo,
};

export default meta;
type Story = StoryObj<typeof MerchantLogo>;

export const WithImage: Story = {
  args: {
    url: "https://cdn-icons-png.freepik.com/512/8312/8312956.png",
    name: "France Merchant",
  },
};

export const WithFallback: Story = {
  args: {
    url: null,
    name: "France Merchant",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(Object.keys(LOGO_SIZES) as LogoSize[]).map((size) => (
        <MerchantLogo key={size} url={null} name="France Merchant" size={size} />
      ))}
    </div>
  ),
};
