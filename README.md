# Alma Payments

Portail client permettant de consulter et suivre ses paiements en plusieurs fois.

## Démarrage

```bash
npm install
cp .env.example .env
npm run dev
```

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run test:run` | Tests unitaires et intégration |
| `npm run storybook` | Documentation visuelle des composants |
| `npm run lint` | Vérification ESLint + Prettier |
| `npx tsc --noEmit` | Vérification des types |

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

**Husky + lint-staged** : chaque commit déclenche automatiquement ESLint, Prettier et Vitest (sur les fichiers de test) uniquement sur les fichiers stagés.

**Commitlint** : les messages de commit suivent la convention [Conventional Commits](https://www.conventionalcommits.org/), garantissant un historique lisible et exploitable.

## Choix de conception

**Colocation.** Chaque fichier vit au plus proche de son consommateur. Les composants spécifiques à une page vivent dans son dossier, pas dans un dossier global. Seuls les composants partagés entre plusieurs pages vivent dans `src/components/`.

**Découplage API / UI.** Chaque composant définit sa propre interface de données. Un mapper pur fait la transformation depuis les types API. Si l'API change, seul le mapper est impacté.

**i18n-ready.** Les textes sont centralisés derrière une fonction `t()` typée dont l'API est compatible avec i18next. La migration se ferait en remplaçant l'import.

**Configuration par pays.** Un mapping centralisé `country_of_service` → locale, timezone, currency. Quand l'info n'est pas disponible (endpoint liste), fallback sur `navigator.language` et `Intl.DateTimeFormat().resolvedOptions().timeZone`.

**Gestion des erreurs.** ErrorBoundary pour les crashs de rendu, ErrorPage pour les erreurs de routing et 404, états `isError` de TanStack Query pour les erreurs API.

## Améliorations possibles

- **Checkpoints de progression** — remplacer la barre par des points visuels par échéance, sans changer l'interface du composant
- **Logger d'erreurs** — centraliser les erreurs vers un service type Sentry
- **Virtualisation** — `@tanstack/react-virtual` pour les longues listes (non pertinent avec 3 paiements dans le mock)
- **Dark mode** — supporté nativement par shadcn, nécessite un toggle de thème
