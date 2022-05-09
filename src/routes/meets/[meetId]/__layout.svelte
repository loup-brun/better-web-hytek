<script>
  // components
  import Navbar from '$lib/components/Navbar.svelte';
  // vars
  let navbarHeight = 0;
  let sidebarWidth = 0;
</script>

<div
  class="MeetLayout | flex flex-col"
  style="--navbarHeight: {navbarHeight}px; --sidebarWidth: {sidebarWidth}px;"
>
  <Navbar
    bind:navbarHeight
  />

  <div class="MeetLayout__inner">

    <slot></slot>
  </div>
</div>

<style>
  .MeetLayout {
    padding-top: var(--navbarHeight, 100px);
    height: 100vh;
    width: 100vw;
  }
  .MeetLayout__inner {
  }
</style>
