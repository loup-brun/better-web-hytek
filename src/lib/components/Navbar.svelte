<script>
  import { onMount } from 'svelte';

  // props
  export let navbarHeight;

  // vars
  let navbar;

  onMount(() => {
    navbarHeight = navbar.getBoundingClientRect().height;
  })
</script>

<header
  class="Navbar | flex flex-row items-stretch bg-stone-900 text-stone-200 text-sm"
  bind:this={navbar}
>
  <slot></slot>
</header>
