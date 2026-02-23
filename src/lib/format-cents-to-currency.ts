import { getCountryConfig } from "@/lib/country-config";

const CENTIMES_PER_UNIT = 100;
const FRACTION_DIGITS_FULL = 2;
const FRACTION_DIGITS_NONE = 0;

const formatterCache = new Map<string, Intl.NumberFormat>();

interface GetFormatterParams {
  locale: string;
  currency: string;
  minimumFractionDigits: number;
}

function getFormatter({
  locale,
  currency,
  minimumFractionDigits,
}: GetFormatterParams): Intl.NumberFormat {
  const key = `${locale}-${currency}-${minimumFractionDigits}`;
  const cached = formatterCache.get(key);

  if (cached) return cached;

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits: FRACTION_DIGITS_FULL,
  });

  formatterCache.set(key, formatter);
  return formatter;
}

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

  return getFormatter({ locale, currency, minimumFractionDigits }).format(value);
}
