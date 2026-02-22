const translations = {
  "error.generic.title": "Une erreur est survenue",
  "error.generic.description": "Veuillez réessayer ultérieurement.",
  "error.backToHome": "Retour à mes paiements",
  "payment.progressBar.ariaLabel": "{{paid}} échéances payées sur {{total}}",
  "payments.list.card.lateBanner": "Paiement en retard",
  "payments.list.card.nextPayment": "Prochain paiement",
  "payments.list.card.dueDateLabel": "Échéance due",
  "payments.list.card.datePrefix": "le",
  "payments.list.card.completed": "✓ Payé",
  "payments.list.empty.active.title": "Aucun paiement en cours",
  "payments.list.empty.active.description": "Vous n'avez aucun échéancier actif pour le moment.",
  "payments.list.empty.completed.title": "Aucun paiement terminé",
  "payments.list.empty.completed.description": "Vos paiements terminés apparaîtront ici.",
  "payments.list.error.message": "Impossible de charger vos paiements.",
  "payments.list.error.retry": "Réessayer",
  "payments.list.title": "Mes paiements",
  "payments.list.tabs.active": "En cours",
  "payments.list.tabs.completed": "Terminés",
  "payments.list.totalRemaining": "Montant restant à payer",
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
