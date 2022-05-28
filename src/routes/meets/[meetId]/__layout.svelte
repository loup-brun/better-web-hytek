 <script context="module">
   export async function load({ fetch, params }) {
     const { meetId } = params;

     try {
       const res = await fetch(`/meets/${meetId}/config`);
       const { meetConfig } = await res.json();

       if (res.ok) {
         return {
           // pass down the meet config to child layouts
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
