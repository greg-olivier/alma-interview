export const LOGO_SIZES = {
  sm: 32,
  md: 38,
  lg: 48,
} as const;

export type LogoSize = keyof typeof LOGO_SIZES;
