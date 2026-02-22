import { getCountryConfig } from "@/lib/country-config";

const MILLISECONDS_PER_SECOND = 1000;

type DateFormat = "long" | "short";

const DATE_FORMAT_OPTIONS: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  long: { day: "numeric", month: "long", year: "numeric" },
  short: { day: "numeric", month: "short" },
};

interface FormatDateParams {
  timestamp: number;
  format?: DateFormat;
  countryOfService?: string;
}

export function formatDate({
  timestamp,
  format = "long",
  countryOfService,
}: FormatDateParams): string {
  const { locale, timezone } = getCountryConfig(countryOfService);

  return new Intl.DateTimeFormat(locale, {
    ...DATE_FORMAT_OPTIONS[format],
    timeZone: timezone,
  }).format(new Date(timestamp * MILLISECONDS_PER_SECOND));
}
