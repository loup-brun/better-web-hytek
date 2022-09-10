<script>
  /** @type {import('./$types').PageData} */
  export let data;
  const { meetConfig } = data;
</script>

<pre>Better HyTek Results
====================

Sélectionnez un événement dans le menu latéral pour débuter.

</pre>

<div class="box | mt-4 p-3 text-xs text-zinc-400">
  <div class="content">
    <hr>

    {#if meetConfig.timingCompany}
      <p>
        Chronométrage par
        {#if meetConfig.timingCompanyUrl}
          <a href="{meetConfig.timingCompanyUrl}" target="_blank">{meetConfig.timingCompany}</a>
        {:else}
          {meetConfig.timingCompany}
        {/if}
      </p>
    {/if}

    {#if meetConfig.hostingProvider}
    <p>
      Résultats hébergés par
      {#if meetConfig.hostingProviderUrl}
        <a href="{meetConfig.hostingProviderUrl}" target="_blank">{meetConfig.hostingProvider}</a>
      {:else}
        {meetConfig.hostingProvider}
      {/if}
    </p>
    {/if}

    <!-- dev credits ;) -->
    <p>
      Interface par <a href="https://www.loupbrun.ca" target="_blank">Louis-Olivier Brassard</a>
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
  .content p {
    @apply mb-3;
  }
  .content hr {
    @apply my-6;
  }
</style>
