<template>
   <main>
     <div class="container">
       <md-tabs md-alignment="fixed">
         <md-tab id="tab-imprint" md-label="Impressum">
           <md-card md-with-hover>
             <md-ripple>
               <md-card-header>
                 <div class="md-title">Impressum</div>
                 <div class="md-subhead"></div>
               </md-card-header>

               <md-card-content>
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
               </md-card-content>
             </md-ripple>
           </md-card>
           <md-card md-with-hover>
             <md-ripple>
               <md-card-header>
                 <div class="md-title">Kontakt</div>
                 <div class="md-subhead"></div>
               </md-card-header>

               <md-card-content>
                 christopher.sang -at- gmx.de
               </md-card-content>
             </md-ripple>
           </md-card>
           <md-card md-with-hover>
             <md-ripple>
               <md-card-header>
                 <div class="md-title">Quellen</div>
                 <div class="md-subhead">Bildquellen</div>
               </md-card-header>

               <md-card-content>
                 <ul>
                   <li>Icons: <a href="https://material.io/tools/icons/?style=baseline" target="_blank">https://material.io/tools/icons/?style=baseline</a></li>
                   <li>...</li>
                 </ul>
               </md-card-content>
             </md-ripple>
           </md-card>


           <md-button class="md-raised md-dense" href="/">zurück</md-button>
         </md-tab>
         <md-tab id="tab-data" md-label="Datenschutz">
           <md-card md-with-hover>
             <md-ripple>
               <md-card-header>
                 <div class="md-title">Datenschutz</div>
                 <div class="md-subhead"></div>
               </md-card-header>

               <md-card-content>
                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
               </md-card-content>
             </md-ripple>
           </md-card>
           <md-button class="md-raised md-dense" href="/">zurück</md-button>
         </md-tab>
       </md-tabs>
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

  .md-card {
    margin-bottom: 15px;
  }

  .md-button {
    margin: 20px 0 0 0;
  }
</style>
