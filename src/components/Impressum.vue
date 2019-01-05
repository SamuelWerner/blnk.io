<template>
   <main>
     <div class="container">
       <h3>Impressum</h3>
       <p>Kontakt: ...</p>
       <p>Bildquellen:</p>
       <ul>
         <li>Icons: <a href="https://material.io/tools/icons/?style=baseline" target="_blank">https://material.io/tools/icons/?style=baseline</a></li>
         <li>...</li>
       </ul>
       <md-button class="md-raised md-dense" href="/">zurück</md-button>
     </div>
     <div id="footer" >&copy; THM | <a href="/impress">Impressum</a></div>
   </main>
</template>

<script>
  export default {
    name: 'Impressum'
  }
</script>

<style scoped>
  .container {
    margin-top: 3rem;
  }

  p {
    margin: 0;
  }

  .md-dense {
    margin-top: 2rem;
  }

  .md-dense:hover {
    text-decoration: none;
  }
</style>
