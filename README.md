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
