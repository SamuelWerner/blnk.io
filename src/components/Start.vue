<template>
  <main>
    <div class="container-fluid">
      <div class="box products position-relative overflow-hidden py-5 text-center">
        <div id="productsScroll" class="col-md-12 py-lg-5 px-0 mx-auto my-5" style="transition: 1s">
          <h1 class="display-1 font-weight-bold mb-md-4 mb-sm-2 line-1 anim-typewriter">BL_NK.IO</h1>
          <p class="subtitle lead font-weight-normal m-0 anim-subtitle">Google Docs von uns</p>
        </div>
        <div class="product-example product-example-1"></div>
        <div class="product-example product-example-2"></div>
        <div class="product-example product-example-3"></div>
        <div class="product-example product-example-4"></div>
      </div>

      <!-- BOX Login -->
      <div class="container" style="margin-bottom: 4rem;">
        <div class="row text-center mb-md-3 mb-sm-3 mb-3">
          <div class="col-lg-4 col-md-6 col-sm-6 col-6 col-left">
            <div class="box boxModule boxLogin p-md-5 p-sm-3 p-3">
              <p><img class="docWidgetMain" src="../assets/baseline-exit_to_app-24px.svg" /></p>
              <h2 class="display-5 text-uppercase">Login</h2>
              <p class="lead font-weight-normal">Melde dich an.</p>
              <md-button class="md-primary md-raised" disabled> Login </md-button>
              <div class="helper">
                <md-button class="md-icon-button" @click="showDialogHelper = true" disabled>
                  <i class="fas fa-question"></i>
                </md-button>
              </div>
            </div>
          </div>

          <!-- BOX Profil -->
          <div class="col-lg-8 col-md-6 col-sm-6 col-6 col-right">
            <div class="box boxModule boxProfil p-md-5 p-sm-3 p-3">
              <p><img class="docWidgetMain" src="../assets/baseline-person-24px.svg" /></p>
              <h2 class="display-5 text-uppercase">Profil</h2>
              <p class="lead font-weight-normal">Besuche dein Profil.</p>
              <md-button class="md-primary md-raised" disabled> Profil </md-button>
              <div class="helper">
                <md-button class="md-icon-button" @click="showDialogHelper = true" disabled>
                  <i class="fas fa-question"></i>
                </md-button>
              </div>
            </div>
          </div>
        </div>

        <!-- BOX Neues Doc -->
        <div class="row text-center">
          <div class="col-lg-8 col-md-6 col-sm-6 col-6 col-left">
            <div class="box boxModule boxNeu p-md-5 p-sm-3 p-3">
              <p><img class="docWidgetMain" src="../assets/outline-insert_drive_file-24px.svg" /></p>
              <h2 class="display-5 text-uppercase">Neu</h2>
              <p class="lead font-weight-normal mb-4">Lege ein neues Dokument an und bearbeite es.</p>
              <md-button class="md-primary md-raised" @click="showDialog = true"> Neu </md-button>
              <div class="helper">
                <md-button class="md-icon-button" @click="showDialogHelper = true">
                  <i class="fas fa-question"></i>
                </md-button>
              </div>
            </div>
            <md-dialog class="dialog" :md-active.sync="showDialog">
              <md-dialog-title>Neues Dokument anlegen</md-dialog-title>
              <md-field class="inputBox" md-clearable>
                <form id="form" @submit.prevent="saveDoc">
                  <label>Titel eingeben...</label>
                  <md-input type="text" v-model="model.title" maxlength="30"></md-input>
                </form>
              </md-field>
              <p style="display: none" class="dialog-helper"></p>
              <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Abbruch</md-button>
                <md-button type="submit" form="form" class="md-primary" @click="showDialog = false">Erstellen</md-button>
              </md-dialog-actions>
            </md-dialog>
          </div>

          <!-- BOX Doc suchen -->
          <div class="col-lg-4 col-md-6 col-sm-6 col-6 col-right">
            <div class="box boxModule boxSuchen p-md-5 p-sm-3 p-3">
              <p id="search-icon"><img class="docWidgetMain" src="../assets/baseline-search-24px.svg" /></p>
              <h2 class="display-5 text-uppercase">Suchen</h2>
              <p class="lead font-weight-normal">nach einem Dokument.</p>
              <md-field id="search-field">
                <form id="formSearch" @submit.prevent="searchDocs">
                  <label>Name</label>
                  <md-input v-model="model.searchString" ></md-input>
                </form>
              </md-field>
              <md-button type="submit" form="formSearch" class="md-icon-button md-dense md-secondary search-buttons">
                <md-icon>search</md-icon>
                <md-tooltip md-direction="bottom">Suchen</md-tooltip>
              </md-button>
              <md-button @click="refreshDocs" class="md-icon-button md-dense md-secondary search-buttons">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="bottom">Suche zurücksetzen</md-tooltip>
              </md-button>
              <div class="helper">
                <md-button class="md-icon-button" @click="showDialogHelper = true">
                  <i class="fas fa-question"></i>
                </md-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Helper Dialog -->
      <md-dialog :md-active.sync="showDialogHelper">
        <md-dialog-title>Hilfe</md-dialog-title>

        <div class="container-fluid">
          <md-tabs class="md-transparent" md-dynamic-height md-elevation="1" md-alignment="fixed" md-active-tab="tab3">
            <md-tab md-label="Login/Registrieren">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate.</p>
            </md-tab>
            <md-tab md-label="Profil">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate.</p>
            </md-tab>
            <md-tab id="tab3" md-label="Doc erstellen">
              <p>Über <em>NEU</em> ein Neues Dokument anlegen und benennen.<br>Das Dokument wird in der Ansicht weiter unten aufgelistet und kann dort geöffnet werden.</p>
            </md-tab>
            <md-tab md-label="Doc suchen">
              <p>Nach einem bereits vorhandenen Dokument suchen:<br>Namen des Dokuments oder Teile des Namens eingeben und Suche starten.</p>
              <p>Die Suche kann über den zweiten Button wieder zurückgesetzt werden.</p>
            </md-tab>
          </md-tabs>
        </div>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogHelper = false">Schließen</md-button>
        </md-dialog-actions>
      </md-dialog>

      <div class="container" style="padding: 0 5px;">

        <div id="containerSpinner">
          <md-progress-spinner :md-diameter="50" :md-stroke="5" md-mode="indeterminate"></md-progress-spinner>
        </div>

        <!-- Doclist -->
        <div id="docList">
          <div class="row">
            <div class="col-md-6 col-sm-6 col-12">
              <p>Zuletzt verwendete Dokumente:</p>
            </div>
            <div class="col-md-6 col-sm-6 d-none d-sm-block">
            </div>
          </div>

          <ul id="ul">
            <li>
              <div class="liDiv liDivDefault" @click="showDialog = true">
                <div>
                  <i class="material-icons">add</i>
                </div>
              </div>
            </li>
            <li id="li" v-for="doc in docs" :key="doc.hash">
              <div class="liDiv">
                <div class="liDivOpen" @click.prevent="openDoc(doc.hash)">
                  <img class="docWidgetSec" src="../assets/outline-insert_drive_file-24px.svg" /><hr>
                  <span class="docTitle">{{ doc.title }}</span><br>
                  <div class="liDivUpdatedAt">
                    <span class="updatedAt">zuletzt: {{doc.updatedAt | formatDate}}</span>
                  </div>
                </div>

                <div class="liButtons">
                  <md-button class="md-primary md-raised md-dense" @click.prevent="openDoc(doc.hash)" style="margin-bottom: 15px;">Öffnen</md-button>
                </div>
                <md-button class="md-icon-button button-delete" @click.prevent="deleteDoc(doc.hash)">
                  <md-icon>delete</md-icon>
                </md-button>
              </div>
            </li>
          </ul>
        </div>
        <div style="clear: left"></div>

        <!-- Doclist Mobile -->
        <div class="mobileDocList">
          <ul>
            <li v-for="doc in docs" :key="doc.hash">
              <div class="liDiv">
                <img class="docWidgetSec" src="../assets/outline-insert_drive_file-24px.svg" />
                <span class="docTitle">{{ doc.title }}</span><br>

                <div class="liButtons">
                  <span class="updatedAt">{{doc.updatedAt | formatDate}}</span>
                  <md-button class="md-icon-button button-delete-mobile" @click.prevent="deleteDoc(doc.hash)"><md-icon>delete</md-icon></md-button>
                  <md-button class="md-primary md-raised md-dense" @click.prevent="openDoc(doc.hash)">Öffnen</md-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div style="clear: left"></div>
      </div>
    </div>

    <a id="scrollTop" v-scroll-to="'#pageTop'"><img src="../assets/baseline-keyboard_arrow_up-24px.svg" alt=""></a>
  </main>
</template>


<script>
  import api from '@/api'
  export default {
    name: 'Start',
    data () {
      return {
        showDialog: false,
        showDialogHelper: false,
        docs: [],
        model: {},
        initial: 'Dok'
      }
    },
    async created () {
      await this.refreshDocs()
      this.hideSpinner()
      this.onScroll()
    },
    methods: {
      async refreshDocs () {
        this.docs = await api.getDocs()
        return true
      },
      async searchDocs () {
        this.showSpinner()
        this.docs = await api.getDocs()
        var tmpDocs = []
        for (var i = 0; i < this.docs.length; i++) {
          if (this.docs[i].title.includes(this.model.searchString)) {
            tmpDocs.push(this.docs[i])
          }
        }
        this.docs = tmpDocs
        this.hideSpinner()
        this.onScroll()
      },
      async saveDoc () {
        this.showSpinner()
        await api.createDoc(this.model)
        this.model = {} // reset form
        await this.refreshDocs()
        this.hideSpinner()
      },
      async deleteDoc (hash) {
        if (confirm('Dokument wirklich löschen?')) {
          if (this.model.hash === hash) {
            this.model = {}
          }
          this.showSpinner()
          await api.deleteDoc(hash)
          await this.refreshDocs()
          this.hideSpinner()
        }
      },
      async openDoc (id) {
        this.$router.push('/paper/' + id)
      },
      onScroll () {
        var scrollToTop = document.getElementById('scrollTop')
        window.onscroll = function () {
          if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollToTop.style.visibility = 'visible'
            scrollToTop.style.opacity = '1'
          } else {
            scrollToTop.style.visibility = 'hidden'
            scrollToTop.style.opacity = '0'
          }
        }
      },
      hideSpinner () {
        document.getElementById('containerSpinner').style.display = 'none'
        if (window.innerWidth < 450) {
          document.getElementById('docList').style.display = 'none'
        } else {
          document.getElementById('docList').style.display = 'inline'
        }
      },
      showSpinner () {
        document.getElementById('containerSpinner').style.display = 'inline'
        document.getElementById('docList').style.display = 'none'
      }
    }
  }
</script>

<!-- Style Allgemein -->
<style>
  form {
    width: 100% !important;
  }

  .md-textarea,
  .md-input {
    width: 100% !important;
  }

  .dialog {
    text-align: center;
    width: 30rem;
    padding: 0 2rem;
  }

  .dialog-helper {
    text-align: right;
    font-size: 0.7rem;
    margin-top: 1rem;
  }

  .dialog-helper::before {
    content: "Dies kann einen kurzen Moment dauern."
  }

  #scrollTop {
    display: flex;;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #343a40;
    -webkit-transition: all 0.3s linear;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
    z-index: 9999;
  }

  #scrollTop:hover {
    opacity: 0.5;
  }

  #scrollTop img {
    filter: invert(1);
    -webkit-transition: all 0.1s linear;
    -moz-transition: all 0.1s ease;
    -ms-transition: all 0.1s ease;
    -o-transition: all 0.1s ease;
    transition: all 0.1s ease;
  }

  @media (max-width: 500px) {
    .dialog {
      width: auto;
    }
  }
</style>


<!-- Style nur diese Komponente -->
<style scoped>
  main {
    background-color: #343a40 !important;
    margin: 0 auto;
    min-height: calc(100vh - 68px);
    padding-bottom: 9rem;
  }

  .box {
    background-color: #fff;
    height: 100%;
    padding: 1.5rem 1.5rem;
    transition: 1s;
  }

  .box:hover .helper {
    visibility: visible;
    opacity: 1;
  }

  .procedure {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .helper {
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    position: absolute;
    right: 15px;
    top: 5px;
  }

  .helper .md-icon-button {
    width: 35px;
    min-width: 35px;
    height: 35px;
    min-height: 35px;
  }

  .col-left,
  .col-center {
    padding-right: 8px;
  }

  .col-right,
  .col-center {
    padding-left: 8px;
  }

  .products {
    overflow: hidden;
    cursor: default;
    margin-bottom: 4.5rem;
  }

  .product-example {
    position: absolute;
    width: 300px;
    height: 480px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .05);
  }

  .product-example-1 {
    transform: rotate(-15deg);
    left: 10%;
    top: -13%;
    background-image: url("../assets/produkt2.jpg");
    z-index: 4;
  }

  .product-example-2 {
    transform: rotate(22deg);
    right: 6%;
    bottom: -25%;
    background-image: url("../assets/produkt1.jpg");
    z-index: 4;
  }

  .product-example-3 {
    transform: rotate(-10deg) scale(0.7);
    right: 12%;
    top: -25%;
    background-image: url("../assets/produkt2.jpg");
    z-index: 3;
    opacity: 0.7;
  }

  .product-example-4 {
    transform: rotate(-5deg) scale(0.8);
    left: 5%;
    bottom: -25%;
    background-image: url("../assets/produkt1.jpg");
    z-index: 3;
    opacity: 0.7;
  }

  h1.display-1 {
    font-size: 7rem;
    margin-top: 0 !important;
  }

  .line-1{
    position: relative;
    margin: 0 auto;
    border-right: 2px solid black;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    z-index: 5;
    text-shadow: 0px 0px 30px rgba(255, 255, 255, 1);
  }

  .subtitle {
    position: relative;
    z-index: 5;
    text-shadow: 0px 0px 30px rgba(255, 255, 255, 1);
  }

  /* Animation line-1 */
  .anim-typewriter {
    /* animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, animation-fill-mode */
    animation:  typewriter 1.4s steps(16) 0.6s 1 normal both,
                blinkTextCursor 0.8s steps(2, start) 0s 6 normal,
                cursorTransparent .1s ease 4s infinite;
  }
  @keyframes typewriter {
    from {width: 0;}
    to {width: 544px;}
  }
  @keyframes blinkTextCursor {
    from {border-right-color: black;}
    to {border-right-color: transparent;}
  }
  @keyframes cursorTransparent {
    from {border-right: 2px solid transparent;}
    to {border-right: 2px solid transparent;}
  }

  /* Animation Subtitle */
  .anim-subtitle {
    color: transparent;
    animation:  subtitleFadeIn 1s ease-in 2s 1 normal,
                subtitleStayIn .1s linear 3s infinite;
  }
  @keyframes subtitleFadeIn {
    from {color: transparent;}
    to {color: black;}
  }
  @keyframes subtitleStayIn {
    from {color: black;}
    to {color: black;}
  }

  .box-arrow-right {
    position: absolute;
    right: -9px;
    top: calc((100% - 35px)/2);
    border: 0px solid #343a40;
    border-radius: 50%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #343a40;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    color: white;
  }

  .card {
    margin: 0 10px;
    min-width: 220px;
    border-radius: 0;
  }

  #docList p {
    color: white;
    padding: 0 10px;
  }

  .mobileDocList {
    display: none;
  }

  ul {
    padding: 0;
    list-style-type: none;
    width: 100%;
  }

  ul li {
    padding: 0 8px 16px 8px;
    width: 20%;
    float: left;
    min-width: 210px;
  }

  #docList {
    display: none;
  }

  #docList .md-field {
    padding-top: 0;
    min-height: 0;
    width: 50%;
    float: right;
    margin-right: 8px;
  }

  .liDivDefault {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .liDivDefault i {
    font-size: 5rem;
    color: #448aff;
    text-shadow: 1px 1px 5px #ccc;
  }

  .liDivDefault:hover i {
    text-shadow: none;
  }

  .liDiv {
    position: relative;
    border-radius: 1px;
    background-color: #fff/*#f7f7f7*/;
    height: 18rem;
    float: left;
    text-align: center;
    word-wrap: break-word;
    transition: box-shadow 0.2s ease-out;
    width: 100%;
  }

  .liDiv:hover {
    -webkit-box-shadow: inset 0px 0px 0px 3px rgba(68,138,255,1);
    -moz-box-shadow: inset 0px 0px 0px 3px rgba(68,138,255,1);
    box-shadow: inset 0px 0px 0px 3px rgba(68,138,255,1);
  }

  .liDiv hr {
    margin-bottom: 1.4rem;
  }

  .liDivOpen {
    padding: 20px 10px 0 10px;
    cursor: pointer;
    height: 100%;
  }

  .liDivUpdatedAt {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: 55px;
  }

  .updatedAt {
    font-size: 10px;
    margin-bottom: 10px;
  }

  .docTitle {
    font-size: 1rem;
  }

  li .md-button {
    font-size: 0.8rem;
  }

  li img {
    width: 33px;
  }

  .banner {
    text-align: center;
    padding: 4rem;
    margin-bottom: 0.7rem;
  }

  .banner img {
    width: 35%;
    max-width: 1088px;
  }

  .liButtons {
    position: absolute;
    bottom: 0;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: max-content;
  }

  .button-delete {
    position: absolute;
    right: 0;
    bottom: 5px;
    transition: .2s;
    visibility: hidden;
    opacity: 0;
  }

  .liDiv:hover .button-delete {
    opacity: 1;
    visibility: visible;
  }

  .docWidgetMain {
    width: 70px;
  }

  .docWidgetSec {
    width: 50px;
  }

  #containerSpinner {
    width: 100%;
    text-align: center;
    margin-top: 44px;
  }

  #scrollTop {
    background-color: white;
    color: black;
    z-index: 4;
  }

  #scrollTop img {
    filter: invert(0);
  }

  #search-field {
    width: 55%;
    display: inline-block;
    margin-bottom: 5px;
  }

  .search-buttons {
    margin-top: 20px;
    margin-right: 0;
    margin-left: 0;
  }

  @media (max-width: 1500px) {
    .product-example-3,
    .product-example-4 {
      display: none;
    }
    .product-example-1 {
      left: -5%;
      transform: rotate(22deg);
      top: -24%;
    }
    .product-example-2 {
      right: -2%;
      bottom: -20%;
    }
  }


  @media (max-width: 1200px) {
    .product-example-1 {
      left: -10%;
      transform: rotate(22deg);
    }
    .product-example-2 {
      right: -5%;
      bottom: -20%;
    }
    ul li {
      width: 25%;
    }
  }

  @media (max-width: 991px) {
    .products {
      margin-bottom: 2rem;
    }
    .product-example-1 {
      left: -20%;
    }
    .product-example-2 {
      right: -15%;
      bottom: -40%;
    }
    ul li {
      width: 33.3%;
    }
  }

  @media (max-width: 767px) {
    main {
      padding-bottom: 4rem;
    }
    .products {
      padding: 0;
    }
    .product-example {
      transform: rotate(15deg);
    }
    .product-example-1 {
      left: -30%;
      top: -30%;
    }
    .product-example-2 {
      right: -25%;
      bottom: -40%;
    }
    h1.display-1 {
      font-size: 5rem;
      border-right: 0;
    }
    .anim-typewriter,
    .anim-subtitle {
      animation: none;
      color: #212529;
    }
    .col-sm-12 {
      margin-bottom: 0.5rem;
    }
    ul li {
      width: 50%;
    }
    .container {
      padding-top: 15px;
    }
    .container-fluid {
      padding: 0;
    }
    .docWidgetMain {
      width: 60px;
    }
    .docWidgetSec {
      width: 45px;
    }
    .md-tooltip {
      display: none !important;
    }
  }

  @media (max-width: 450px) {
    #docList,
    .product-example-2,
    .helper {
      display: none;
    }

    main {
      padding-bottom: 3rem;
    }

    .container {
      margin-bottom: 2rem !important;
    }

    .products {
      margin-bottom: 0;
    }

    .product-example-1 {
      top: -10%;
      left: 10%;
      opacity: 0.2;
    }

    h1.display-1 {
      font-size: 4rem;
    }

    .mobileDocList {
      display: inline;
    }

    .boxProfil,
    .boxLogin {
      padding-bottom: 1.5rem !important;
    }

    .boxNeu {
      padding-top: 1.5rem !important;
    }

    .boxModule p img {
      width: 50px;
      margin: 10px 0 0 0;
    }

    .boxModule h2,
    .boxModule p.lead {
      display: none;
    }

    .boxModule h2 {
      font-size: 1.3rem;
    }

    .md-field {
      width: 80% !important;
    }

    #search-icon {
      margin-bottom: 0;
    }

    #search-field {
      margin: 0 0 5px;
      width: 90% !important;
      display: inline-block;
    }

    .search-buttons {
      margin: 0;
    }

    .search-buttons i {
      font-size: 22px !important;
    }

    ul li {
      width: 100%;
      height: auto;
      padding-bottom: 8px;
      padding-left: 10px;
      padding-right: 10px;
    }

    .docWidgetSec {
      width: 30px;
      margin-right: 3px;
    }

    .liDiv {
      padding: 12px 8px 8px 10px;
      height: auto;
      text-align: left;
    }

    .docTitle {
      margin-top: 5px;
    }

    .liButtons {
      position: relative;
      text-align: right;
      margin-left: 0;
      margin-right: 0;
      width: 100%;
    }

    .md-button {
      margin-bottom: 0;
    }

    .button-delete-mobile {
      position: relative;
      margin: 0;
    }

    .updatedAt {
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 0;
    }
  }
</style>
