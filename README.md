# better-web-hytek
Hy-Tek Meet Manager web results interface, improved.

Technical instructions are written in English; documentation is written in French.

## À propos de cette interface

Le logiciel HyTek Meet Manager propose une présentation HTML d’une grande résilience et d’une remarquable simplicité.
Toutefois, elle n’est pas très jolie, peu sémantique et peu adaptative.
Elle correspond mal aux attentes qu’on a du Web aujourd’hui.

La présente solution cherche à améliorer l’expérience utilisateur, en particulier sur les appareils mobiles, tout en maintenant une faible empreinte numérique pour l’utilisateur·trice.

Quelques points clés :

- patterns visuels familiers (comme la liste des épreuves sur la gauche);
- utiliser les standards du Web;
- respecter les actions de base du navigateur (ex. bouton retour en arrière du navigateur);
- interface réactive;
- vues addressables par URL;
- configurable (pour s’harmoniser avec le contexte de chaque événement, comme l’a fait [Benoit](https://github.com/vermetteb/) pour Sherbrooke);
- _progressive enhancement_ – augmenter l’expérience de base sans lui nuire.

## Installation

Requirements:

- [Node.js](https://nodejs.org/) (current LTS version, v18+ recommended) and its package manager (npm, [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), ...)
- Web hosting provider compatible with a [SvelteKit](https://kit.svelte.dev/) app, such as Cloudflare Pages, Vercel, Netlify, etc.

### Environment variables

All environment variables _must_ be set, even when empty.

- **DB_TYPE**: `file` | `baserow` (more to come in the future)
  - `file`: file-based storage within the repository. The storage file is located at `src/lib/db.json` (path is not configurable at this time).
  - `baserow`: a Baserow instance (cloud-hosted at baserow.io or self-hosted) is required. See the [template demo information](https://github.com/loup-brun/better-web-hytek/pull/27#issuecomment-2218038896).
- **BASEROW_URL**: Baserow instance URL, without the ending slash, e.g. `https://baserow.io`
- **BASEROW_DATABASE_ID**: number, e.g. 123
- **BASEROW_INSTANCE_ROW_ID**: number, e.g. 1
- **BASEROW_INSTANCE_TABLE_ID**: number, e.g. 1234
- **BASEROW_MEETS_TABLE_ID**: number, e.g. 5678
- **BASEROW_TOKEN**: string, e.g. A12bC3D4e5

## Ideas

- improve overall ergonomy and respond to device screen size
- very simple configuration: fork and change 1 param (e.g.: HyTek FTP location), deploy anywhere
- retain similar UI pattern (e.g.: event list on the left-hand side)
- respect basic browser actions (e.g.: browser history when hitting the 'back' button)
- bonus: each event could be addressable in URL param/hash, allowing to jump to event directly through a shared link (like an SPA) – would work with above (browser behavior)

## Technology & Implementation

- [Svelte](https://svelte.dev/) for component pattern design, reactive interface, low-footprint build and excellent dev experience + [kit](https://kit.svelte.dev/) for building a complete web experience.
- [Tailwind CSS](https://tailwindcss.com/) for quickly building user interfaces.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev # or pnpm
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Licence

Unless otherwise noted, code is under GPL v3.
