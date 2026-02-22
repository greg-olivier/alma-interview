import { getCountryConfig } from "@/lib/country-config";

const CENTIMES_PER_UNIT = 100;
const FRACTION_DIGITS_FULL = 2;
const FRACTION_DIGITS_NONE = 0;

interface FormatCentsToCurrencyParams {
  cents: number;
  countryOfService?: string;
  compact?: boolean;
}

export function formatCentsToCurrency({
  cents,
  countryOfService,
  compact = false,
}: FormatCentsToCurrencyParams): string {
  const { locale, currency } = getCountryConfig(countryOfService);
  const value = cents / CENTIMES_PER_UNIT;

  const hasCentimes = value % 1 !== 0;
  const minimumFractionDigits =
    compact && !hasCentimes ? FRACTION_DIGITS_NONE : FRACTION_DIGITS_FULL;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits: FRACTION_DIGITS_FULL,
  }).format(value);
}
