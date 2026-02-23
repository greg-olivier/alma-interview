# Alma Payments

Portail client permettant de consulter et suivre ses paiements en plusieurs fois.

## Démarrage

### Prérequis

- Node.js ≥ 18
- [Mockoon](https://mockoon.com/download/) (serveur d'API mock)

### Lancer le serveur d'API

1. Installer et ouvrir Mockoon
2. Importer le fichier `alma-test-server-november-2025.json` via **Open local environment**
3. Démarrer le serveur (port `3001` par défaut)

### Lancer l'application

```bash
npm install
cp .env.example .env    # VITE_API_BASE_URL=http://localhost:3001
npm run dev             # → http://localhost:5173
```

### Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run test:run` | Tests unitaires et intégration |
| `npm run storybook` | Documentation visuelle des composants |
| `npm run lint` | Vérification ESLint + Prettier |
| `npm run tsc` | Vérification des types |

## Stack technique

| Outil | Justification |
|-------|---------------|
| **Vite + React + TypeScript strict** | Standard moderne, `noUncheckedIndexedAccess` activé pour un maximum de sûreté |
| **Tailwind + shadcn/ui** | Composants copiés dans le projet et modifiables, pas de dépendance externe à maintenir |
| **React Router** | Navigation pleine page, pas de layout master-detail |
| **TanStack Query** | Cache, états de chargement/erreur, pattern `queryOptions` pour découpler la config des queries de leur consommation |
| **Vitest + Testing Library + MSW** | Tests orientés comportement utilisateur, mocks réseau réalistes colocalisés avec leur domaine |
| **Storybook** | Développement et review des composants en isolation |

## Qualité & DX

- **Husky + lint-staged** : chaque commit déclenche automatiquement ESLint, Prettier et Vitest uniquement sur les fichiers stagés.

- **Commitlint** : les messages de commit suivent la convention [Conventional Commits](https://www.conventionalcommits.org/), garantissant un historique lisible et exploitable.

## Choix de conception

- **Colocation.** Chaque fichier vit au plus proche de son consommateur. Les composants spécifiques à une page vivent dans son dossier, pas dans un dossier global. Seuls les composants partagés entre plusieurs pages vivent dans `src/components/`.

- **Découplage API / UI.** Chaque composant définit sa propre interface de données. Un mapper pur fait la transformation depuis les types API. Si l'API change, seul le mapper est impacté.

- **i18n-ready.** Les textes sont centralisés derrière une fonction `t()` typée dont l'API est compatible avec i18next. La migration se ferait en remplaçant l'import.

- **Configuration par pays.** Un mapping centralisé `country_of_service` → locale, timezone, currency. Quand l'info n'est pas disponible (endpoint liste), fallback sur `navigator.language` et `Intl.DateTimeFormat().resolvedOptions().timeZone`.

- **Gestion des erreurs.** ErrorBoundary pour les crashs de rendu, ErrorPage pour les erreurs de routing et 404, états `isError` de TanStack Query pour les erreurs API. Un logger centralisé (`src/lib/logger.ts`) est appelé par l'ErrorBoundary, l'ErrorPage et le QueryCache. L'implémentation actuelle log en console, prête à être remplacée par un service type Sentry.

- **Cache des formatters.** Les instances `Intl.NumberFormat` et `Intl.DateTimeFormat` sont cachées par clé (locale, currency, options) pour éviter de recréer un formatter à chaque appel, notamment sur la page détail avec ses multiples échéances.

## Améliorations possibles

- **Checkpoints de progression** — remplacer la barre par des points visuels par échéance, sans changer l'interface du composant

- **Virtualisation** — `@tanstack/react-virtual` pour les longues listes (non pertinent avec 3 paiements dans le mock)

- **Action de report** — `customer_can_postpone_until` est présent dans l'API mais aucun endpoint POST/PUT n'est disponible dans le mock. Avec un vrai backend, un bouton "Reporter" permettrait à l'utilisateur de décaler une échéance depuis la page détail

- **Dark mode** — supporté nativement par shadcn, nécessite un toggle de thème et l'ajout de `color-scheme` / `<meta name="theme-color">`. Certains composants utilisent encore des couleurs Tailwind brutes (`green-600`, `blue-600`, `violet-600`) qui nécessiteraient des tokens custom (`--color-success`, `--color-info`, `--color-brand`)

- **Pattern Page/PageWithData/PageView** — séparer le data fetching (Page), les interactions (PageWithData) et le rendu pur (PageView) permettrait de tester les interactions sans mocker l'API et de créer des stories sur la View sans providers. Non implémenté car les pages actuelles sont suffisamment simples pour ne pas justifier ce découpage

- **Tests E2E** — Playwright sur les parcours critiques (liste → détail → échéancier, états d'erreur, navigation retour). Non implémenté car les tests d'intégration Testing Library + MSW couvrent déjà ces scénarios sans navigateur, et le volume de l'application (2 pages, 3 paiements mock) ne justifie pas le surcoût d'infrastructure

## Limitations

- **Paiement différé** — les champs `deferred_trigger`, `deferred_days` et `deferred_months` sont à `false`/`0` dans le mock et ne sont pas exploités dans l'UI

- **Remboursements et recouvrement** — `refunds` et `recovery` sont présents dans la réponse API mais non affichés, faute de spécification sur leur rendu

- **Internationalisation** — l'UI est en français uniquement, les textes sont prêts pour une migration i18next via la fonction `t()`

- **Report d'échéance** — `customer_can_postpone_until` est disponible sur chaque échéance mais aucun endpoint POST/PUT n'est exposé dans le mock pour effectuer l'action

- **Formatage sur la page liste** — l'endpoint `/payments` ne fournit pas `country_of_service`, contrairement à `/payment/:id`. Sur la page liste, la locale et la timezone sont déduites du navigateur avec fallback `fr-FR` / `Europe/Paris`. Sur la page détail, le `country_of_service` est utilisé pour un formatage précis
