import { getCountryConfig } from "@/lib/country-config";

const MILLISECONDS_PER_SECOND = 1000;

type DateFormat = "long" | "short";

const DATE_FORMAT_OPTIONS: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  long: { day: "numeric", month: "long", year: "numeric" },
  short: { day: "numeric", month: "short" },
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

interface GetFormatterParams {
  locale: string;
  timezone: string;
  format: DateFormat;
}

function getFormatter({ locale, timezone, format }: GetFormatterParams): Intl.DateTimeFormat {
  const key = `${locale}-${timezone}-${format}`;
  const cached = formatterCache.get(key);

  if (cached) return cached;

  const formatter = new Intl.DateTimeFormat(locale, {
    ...DATE_FORMAT_OPTIONS[format],
    timeZone: timezone,
  });

  formatterCache.set(key, formatter);
  return formatter;
}

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

  return getFormatter({ locale, timezone, format }).format(
    new Date(timestamp * MILLISECONDS_PER_SECOND),
  );
}
