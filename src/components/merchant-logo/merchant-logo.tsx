import type { LogoSize } from "./merchant-logo.constants";
import { LOGO_SIZES } from "./merchant-logo.constants";

interface MerchantLogoProps {
  name: string;
  url?: string | null;
  size?: LogoSize;
}

export function MerchantLogo({ url, name, size = "md" }: MerchantLogoProps) {
  const pixels = LOGO_SIZES[size];

  if (url) {
    return (
      <div
        className="shrink-0 overflow-hidden rounded-lg"
        style={{ width: pixels, height: pixels }}
      >
        <img src={url} alt={name} className="h-full w-full object-cover" />
      </div>
    );
  }

  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-lg bg-violet-100 font-bold text-violet-600"
      style={{ width: pixels, height: pixels, fontSize: pixels * 0.4 }}
    >
      {initial}
    </div>
  );
}
