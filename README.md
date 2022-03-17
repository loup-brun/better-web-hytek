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


