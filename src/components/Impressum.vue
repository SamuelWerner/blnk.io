<template>
   <main class="container-fluid">
     <div class="container">
       <md-tabs class="md-transparent" md-alignment="fixed" md-dynamic-height="right">
         <md-tab id="tab-imprint" md-label="Impressum">
           <md-card md-with-hover>
             <md-ripple>
               <md-card-header>
                 <div class="md-title">Impressum</div>
                 <div class="md-subhead"></div>
               </md-card-header>

               <md-card-content>
                  <p>Die Inhalte der Website werden von Studenten der <a href="https://www.thm.de/" target="_blank">Technischen Hochschule Mittelhessen</a> unverbindlich und unter Ausschluss jeglicher Garantien oder Zusicherungen angeboten.
                   Gleiches gilt auch für alle Websites, auf die mittels (Hyper-)Link verwiesen wird.</p>
                  <p>Die Technische Hochschule Mittelhessen übernimmt keine Verantwortung für den Auftritt und den Inhalt der Website.</p>
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
                 <div class="md-subhead"></div>
               </md-card-header>

               <md-card-content>
                 <p>Im folgenden werden die Quellen genannt, von welchen Bilder oder ähnliches für das Projekt übernommen wurde.</p>
                 <ul>
                   <li>Icons: <a href="https://material.io/tools/icons/?style=baseline" target="_blank">https://material.io/tools/icons/?style=baseline</a></li>
                   <li>Logo BLNK.io: Eigenerstellung</li>
                 </ul>
               </md-card-content>
             </md-ripple>
           </md-card>

         </md-tab>
         <md-tab id="tab-data" md-label="Datenschutz">
           <md-card md-with-hover>
             <md-ripple>
               <md-card-header>
                 <div class="md-title">Datenschutz</div>
                 <div class="md-subhead"></div>
               </md-card-header>

               <md-card-content>
                 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                 Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
               </md-card-content>
             </md-ripple>
           </md-card>
         </md-tab>
       </md-tabs>
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

<style>
  body {
    background-color: #f3f2f1 !important;
  }
</style>

<style scoped>
  .container {
    margin-top: 3rem;
  }

  p {
    margin: 0;
  }

  ul {
    padding-left: 20px;
    margin: 4px 0;
  }

  .md-dense {
    margin-top: 2rem;
  }

  .md-dense:hover {
    text-decoration: none;
  }

  .md-tab {
    background-color: #f3f2f1 !important;
  }

  .md-card {
    margin: 15px 0;
    cursor: auto;
    padding: 0 10px;
  }

  .md-button {
    margin: 0 0 0 16px;
  }
</style>
