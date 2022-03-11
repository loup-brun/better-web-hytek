<script>
  import { APP_CONFIG } from '../config';
  import Navbar from '$lib/components/Navbar.svelte';
  import Main from '$lib/components/Main.svelte';
</script>
  
<Navbar />
  
<Main>
  <h2>À propos de cette interface</h2>
  <p>
    Cette interface vise à offrir une meilleure expérience des résultats HyTek, notamment sur les appareils mobiles. Elle est développée par <a href="mailto:louis@corsaire-chaparral.org">Louis-Olivier Brassard</a> du club d’athlétisme Corsaire-Chaparral.
  </p>
</Main>

<style>
  h2 {
    margin-bottom: 1rem;
  }
</style>