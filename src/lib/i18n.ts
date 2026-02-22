const translations = {
  "payment.card.lateBanner": "Paiement en retard",
  "payment.card.nextPayment": "Prochain paiement",
  "payment.card.dueDateLabel": "Échéance due",
  "payment.card.datePrefix": "le",
  "payment.card.completed": "✓ Payé",
  "payment.progressBar.ariaLabel": "{{paid}} échéances payées sur {{total}}",
} as const;

type TranslationKey = keyof typeof translations;

type ExtractParams<T extends string> = T extends `${string}{{${infer Param}}}${infer Rest}`
  ? Param | ExtractParams<Rest>
  : never;

type TranslationParams<K extends TranslationKey> =
  ExtractParams<(typeof translations)[K]> extends never
    ? undefined
    : Record<ExtractParams<(typeof translations)[K]>, string | number>;

export function t<K extends TranslationKey>(key: K, params?: TranslationParams<K>): string {
  let value: string = translations[key];

  if (params) {
    Object.entries(params).forEach(([param, replacement]) => {
      value = value.replaceAll(`{{${param}}}`, String(replacement));
    });
  }

  return value;
}
