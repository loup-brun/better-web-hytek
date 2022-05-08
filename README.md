# better-web-hytek
Hy-Tek Meet Manager web results interface, improved.

Requires a base directory where HyTek web results files are uploaded.

## Ideas

- improve overall ergonomy and respond to device screen size
- very simple configuration: fork and change 1 param (e.g.: HyTek FTP location), deploy anywhere
- retain similar UI pattern (e.g.: event list on the left-hand side)
- respect basic browser actions (e.g.: browser history when hitting the 'back' button)
- bonus: each event could be addressable in URL param/hash, allowing to jump to event directly through a shared link (like an SPA) – would work with above (browser behavior)

## Technology

- [svelte](https://svelte.dev/) for component pattern design, reactive interface, low-footprint build and excellent dev experience + [kit](https://kit.svelte.dev/) for building a complete web experience.
- components/styles: TODO but importing a design system (IBM Carbon, Google Material Design, etc.) adds a lot of code for little functionality needed and less flexible UI language.
- theming: brand/color for separate events. Like intended by Benoit for Sherbrooke in pwa-results.

## Implementation

Implementation with the SvelteKit framework.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
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
