<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<pre>Better HyTek Results
====================

Sélectionnez une épreuve dans
le menu latéral pour débuter.

</pre>

<div class="box | mt-4 p-3 text-xs text-zinc-400">
  <div class="content">
    <hr>

    {#if data.timingCompany}
      <p>
        Chronométrage par
        {#if data.timingCompanyUrl}
          <a href="{data.timingCompanyUrl}" target="_blank" rel="noreferrer">{data.timingCompany}</a>
        {:else}
          {data.timingCompany}
        {/if}
      </p>
    {/if}

    {#if data.hostingProvider}
    <p>
      Résultats hébergés par
      {#if data.hostingProviderUrl}
        <a href="{data.hostingProviderUrl}" target="_blank" rel="noreferrer">{data.hostingProvider}</a>
      {:else}
        {data.hostingProvider}
      {/if}
    </p>
    {/if}

    <!-- dev credits ;) -->
    <p>
      Interface par <a href="https://www.loupbrun.ca" target="_blank" rel="noreferrer">Louis-Olivier Brassard</a>
    </p>
  </div>
</div>

<style lang="postcss">
  pre {
    margin: 0 auto;
    padding: 8px;
    font-family: 'Courier New', Courier, monospace; /* default mono fonts */
    font-weight: normal;
    font-size: 14px;
  }
  @media (min-width: 1056px) {
    pre {
      font-size: 14px;
    }
  }
  .content a {
    @apply border-b border-current transition duration-150;
  }
  .content a:hover {
    @apply text-zinc-900;
  }
  @media (prefers-color-scheme: dark) {
    .content a:hover {
      color: theme('colors.zinc.100');
    }
  }
  .content p {
    @apply mb-3;
  }
  .content hr {
    @apply my-6;
  }
</style>
