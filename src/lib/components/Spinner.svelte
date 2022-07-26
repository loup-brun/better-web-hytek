<script>
  // props
  export let size = 14;

  let borderSize = Math.ceil(size / 7);
</script>

<span
  class="Spinner"
  style="--spinnerSize: {size}px; --borderSize: {borderSize}px;"
></span>

<style>
  .Spinner {
    height: var(--spinnerSize, 14px);
    width: var(--spinnerSize, 14px);
    border: var(--borderSize, 2px) solid var(--themeColor, #ff6900);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;

    animation: spin .45s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  }
</style>
