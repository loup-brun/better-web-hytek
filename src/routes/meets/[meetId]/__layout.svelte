 <script context="module">
   export async function load({ fetch, params }) {
     const { meetId } = params;
     let meetConfig;

     try {
       const res = await fetch(`/meets/${meetId}/config`);
       meetConfig = await res.json();

       if (res.ok) {
         return {
           stuff: { meetConfig }
         };
       } else {
         return {
           status: 404
         }
       }
     } catch (e) {
       console.error('Error fetching meet config', e);
     }
   }
 </script>
 <slot></slot>
