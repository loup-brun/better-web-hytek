# better-web-hytek
Hy-Tek Meet Manager web results interface, improved.

Requires a base directory where HyTek web results files are uploaded.

## Ideas

- imrpove overall ergonomy and respond to device screen size
- very simple configuration: fork and change 1 param, deploy anywhere (esp. vercel or netlify, super easy)
- retain similar design pattern (e.g.: event list on the left-hand side)
- respect basic browser actions (e.g.: browser history when triggering the back button)
- bonus: single event addressable in URL param/hash, allowing to jump to event directly through a shared link

## Technology

- [svelte](https://svelte.dev/) for component pattern design, reactive interface, low-footprint build and excellent dev experience
- material design? with many available libs and styled components, similar to what Benoit has done in pwa-results
- stylable? for theming events according to local club/sponsor colors. Link intended by Benoit for Sherbrooke.
