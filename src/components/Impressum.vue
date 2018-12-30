<template>
   <main>
     <div class="container">
       <h3>Impressum</h3>
       <p>Kontakt: ...</p>
       <p>...</p>
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

  #footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-top: 4rem;
    text-align: center;
    color: #f7f7f7;
    background-color: #2e3338;
    font-size: 0.8rem;
    padding: 0.6rem 0;
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
