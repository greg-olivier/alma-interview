export interface CountryConfig {
  locale: string;
  timezone: string;
  currency: string;
}

const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  FR: { locale: "fr-FR", timezone: "Europe/Paris", currency: "EUR" },
  DE: { locale: "de-DE", timezone: "Europe/Berlin", currency: "EUR" },
};

const DEFAULT_CURRENCY = "EUR";
const FALLBACK_LOCALE = "fr-FR";
const FALLBACK_TIMEZONE = "Europe/Paris";

function getDefaultLocale(): string {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return FALLBACK_LOCALE;
}

function getDefaultTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return FALLBACK_TIMEZONE;
  }
}

export function getCountryConfig(countryOfService?: string): CountryConfig {
  if (!countryOfService) {
    return {
      locale: getDefaultLocale(),
      timezone: getDefaultTimezone(),
      currency: DEFAULT_CURRENCY,
    };
  }

  return (
    COUNTRY_CONFIGS[countryOfService] ?? {
      locale: getDefaultLocale(),
      timezone: getDefaultTimezone(),
      currency: DEFAULT_CURRENCY,
    }
  );
}
