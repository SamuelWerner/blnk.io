<template>
  <main>
    <div class="container-fluid" style="max-width: 2200px">
      <!--
      <div style="text-align: left; margin: 2rem 0; padding: 2rem 2rem 2rem 5rem; background-color: #343a40">
        <img src="../assets/Logo-BLNK.svg" style="width: 40%" />
      </div>
      -->
      <!--
      <div class="banner">
        <a href="/"><img src="../assets/Blnk-Logo.png" /></a>
      </div>
      -->

      <div class="box products position-relative overflow-hidden p-5 text-center" style="margin-bottom: 4.5rem;">
        <div class="col-md-12 py-lg-5 mx-auto my-5">
          <h1 class="display-1 font-weight-bold mb-4 line-1 anim-typewriter">BL_NK.IO</h1>
          <p class="lead font-weight-normal m-0">Google Docs von uns</p>
        </div>
        <div class="product-example product-example-1"></div>
        <div class="product-example product-example-2"></div>
        <div class="product-example product-example-3"></div>
        <div class="product-example product-example-4"></div>
      </div>

      <!--
      <div class="row text-center" style="margin-bottom: 6rem;">
        <div class="col-lg-3 col-md-12 col-left">
          <div class="box procedure">
            <p class="lead font-weight-normal m-0">Dokumente erstellen.</p>
            <div class="box-arrow-right">
              <i class="material-icons">keyboard_arrow_right</i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-12 col-center">
          <div class="box procedure">
            <p class="lead font-weight-normal m-0">Dokumente bearbeiten.</p>
            <div class="box-arrow-right">
              <i class="material-icons">keyboard_arrow_right</i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-12 col-center">
          <div class="box procedure">
            <p class="lead font-weight-normal m-0">Dokumente teilen.</p>
            <div class="box-arrow-right">
              <i class="material-icons">keyboard_arrow_right</i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-12 col-right">
          <div class="box procedure">
            <p class="lead font-weight-normal m-0">Gemeinsam bearbeiten.</p>
          </div>
        </div>
      </div>
      -->

      <div class="container" style="margin-bottom: 4rem;">
        <div class="row text-center mb-md-3">
          <div class="col-lg-4 col-md-12 col-left">
            <div class="box p-5">
              <p><img class="docWidgetMain" src="../assets/baseline-exit_to_app-24px.svg" /></p>
              <h2 class="display-5 text-uppercase">Login</h2>
              <p class="lead font-weight-normal">Melde dich an.</p>
              <md-button class="md-primary md-raised"> Login </md-button>
              <div class="helper">
                <md-button class="md-icon-button md-raised" @click="showDialogHelper = true">
                  <i class="fas fa-question"></i>
                </md-button>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-12 col-right">
            <div class="box p-5">
              <p><img class="docWidgetMain" src="../assets/baseline-person-24px.svg" /></p>
              <h2 class="display-5 text-uppercase">Profil</h2>
              <p class="lead font-weight-normal">Besuche dein Profil.</p>
              <md-button class="md-primary md-raised"> Profil </md-button>
              <div class="helper">
                <md-button class="md-icon-button md-raised" @click="showDialogHelper = true">
                  <i class="fas fa-question"></i>
                </md-button>
              </div>
            </div>
          </div>
          <!--
          <div class="col-lg-4 col-md-12 col-right">
            <div class="box p-5">
              <p><img class="docWidgetMain" style="transform: scale(-1)" src="../assets/baseline-enter_to_app-24px.svg" /></p>
              <h2 class="display-5 text-uppercase">Logout</h2>
              <p class="lead font-weight-normal">Melde dich ab.</p>
              <md-button class="md-primary md-raised" disabled> Logout </md-button>
              <div class="helper">
                <md-button class="md-icon-button md-raised" @click="showDialogHelper = true">
                  <i class="fas fa-question"></i>
                </md-button>
              </div>
            </div>
          </div>
          -->
        </div>

        <div class="row text-center">
          <div class="col-lg-8 col-md-12 col-left">
            <div class="box p-5">
              <p><img class="docWidgetMain" src="../assets/outline-insert_drive_file-24px.svg" /></p>
              <h2 class="display-5 text-uppercase">Neu</h2>
              <p class="lead font-weight-normal">Lege ein neues Dokument an und bearbeite es.</p>
              <md-button class="md-primary md-raised" @click="showDialog = true"> Neu </md-button>
              <div class="helper">
                <md-button class="md-icon-button md-raised" @click="showDialogHelper = true">
                  <i class="fas fa-question"></i>
                </md-button>
              </div>
            </div>
            <md-dialog class="dialog" :md-active.sync="showDialog">
              <md-dialog-title>Neues Dokument anlegen</md-dialog-title>
              <md-field class="inputBox" md-clearable>
                <form id="form" @submit.prevent="saveDoc">
                  <label>Titel eingeben...</label><md-textarea type="text" v-model="model.title" maxlength="30" md-autogrow></md-textarea>
                </form>
              </md-field>
              <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Abbruch</md-button>
                <md-button type="submit" form="form" class="md-primary" @click="showDialog = false">Erstellen</md-button>
              </md-dialog-actions>
            </md-dialog>
          </div>
          <div class="col-lg-4 col-md-12 col-right">
            <div class="box p-5">
              <p><img class="docWidgetMain" src="../assets/baseline-search-24px.svg" /></p>
              <h2 class="display-5 text-uppercase">Suchen</h2>
              <p class="lead font-weight-normal">nach einem Dokument.</p>
              <md-field style="width: 60%; margin: 0 auto;">
                <label>Name / Inhalt</label>
                <md-input></md-input>
              </md-field>
              <div class="helper">
                <md-button class="md-icon-button md-raised" @click="showDialogHelper = true">
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

        <md-tabs md-dynamic-height>
          <md-tab md-label="Login">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          </md-tab>
          <md-tab md-label="Profil">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          </md-tab>
          <md-tab md-label="Logout">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          </md-tab>
          <md-tab md-label="Neues Dokument">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          </md-tab>
          <md-tab md-label="Dokument suchen">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          </md-tab>
        </md-tabs>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialogHelper = false">Schließen</md-button>
        </md-dialog-actions>
      </md-dialog>

      <div class="container" style="padding: 0 5px;">
        <!--
        <div class="card text-center">
          <div class="card-header">
            Featured
          </div>
          <div class="card-body">
            <p><img class="docWidgetMain" src="../assets/outline-insert_drive_file-24px.svg" /></p>
            <h5 class="card-title">Neues Dokument anlegen</h5>
            <p class="card-text">Lege ein neues Dokument an und bearbeite es.</p>

            <div>
              <md-dialog class="dialog" :md-active.sync="showDialog">
                <md-dialog-title>Neues Dokument anlegen</md-dialog-title>
                   <md-field class="inputBox" md-clearable>
                     <form id="form" @submit.prevent="saveDoc">
                       <label>Titel eingeben...</label><md-textarea type="text" v-model="model.title" maxlength="30" md-autogrow></md-textarea>
                     </form>
                   </md-field>
                <md-dialog-actions>
                  <md-button class="md-primary" @click="showDialog = false">Abbruch</md-button>
                  <md-button type="submit" form="form" class="md-primary" @click="showDialog = false">Erstellen</md-button>
                </md-dialog-actions>
              </md-dialog>
              <div style="width: max-content; margin: 0 auto;">
                <md-button class="md-primary md-raised" @click="showDialog = true">+</md-button>
              </div>
            </div>
          </div>
        </div>
        -->

        <div id="containerSpinner">
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>


        <div id="docList">
          <div class="row">
            <div class="col-6">
              <p class="">Zuletzt verwendete Dokumente:</p>
            </div>
            <div class="col-6">
              <!--
              <div class="md-layout-item" style="display: none">
                <md-field>
                  <md-select name="eigentuemer" id="eigentuemer" placeholder="Eigentümer">
                    <md-option value="australia">Beliebiger Eigentümer</md-option>
                    <md-option value="brazil">Ich bin Eigentümer</md-option>
                    <md-option value="japan">Ich bin nicht Eigentümer</md-option>
                  </md-select>
                </md-field>
              </div>
              -->
              <select class="form-control form-eigentuemer">
                <option>Beliebiger Eigentümer</option>
                <option>Ich bin Eigentümer</option>
                <option>Ich bin nicht Eigentümer</option>
              </select>
            </div>
          </div>

          <ul id="ul">
            <li id="li" v-for="doc in docs" :key="doc.hash">
              <div class="liDiv">
                <div @click.prevent="openDoc(doc.hash)" style="cursor: pointer;">
                  <img class="docWidgetSec" src="../assets/outline-insert_drive_file-24px.svg" /><hr>
                  <span class="docTitle">{{ doc.title }}</span><br>
                </div>

                <div class="liButtons">
                  <span class="updatedAt">geändert: {{doc.updatedAt | formatDate}}</span><br>
                  <md-button class="md-primary md-raised md-dense" @click.prevent="openDoc(doc.hash)" style="margin-bottom: 15px;">Öffnen</md-button>
                  <md-button class="md-icon-button button-delete" @click.prevent="deleteDoc(doc.hash)">
                    <md-icon>delete</md-icon>
                  </md-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div style="clear: left"></div>

        <div class="mobileDocList">
          <ul>
            <li v-for="doc in docs" :key="doc.hash">
              <div class="liDiv">
                <img class="docWidgetSec" src="../assets/outline-insert_drive_file-24px.svg" />
                <span class="docTitle">{{ doc.title }}</span><br>

                <div class="liButtons">
                  <span class="updatedAt">{{doc.updatedAt | formatDate}}</span>
                  <md-button class="md-secondary md-raised md-dense" @click.prevent="deleteDoc(doc.hash)">Löschen</md-button>
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

    <div id="footer" >&copy; THM &nbsp;|&nbsp; <a href="/impress">Impressum</a></div>
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
    async beforeCreate () {
      // this.startCss()
    },
    async created () {
      await this.refreshDocs()
      document.getElementById('containerSpinner').style.display = 'none'
      document.getElementById('docList').style.display = 'inline' /* in mobile nicht anzeigen */
      this.onScroll()
    },
    methods: {
      async refreshDocs () {
        this.docs = await api.getDocs()
        return true
      },
      async saveDoc () {
        await api.createDoc(this.model)
        this.model = {} // reset form
        await this.refreshDocs()
      },
      async deleteDoc (hash) {
        if (confirm('Wirklich löschen?')) {
          if (this.model.hash === hash) {
            this.model = {}
          }
          await api.deleteDoc(hash)
          await this.refreshDocs()
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
      }
    }
  }
</script>

<!-- Style Allgemein -->
<style>
  form {
    width: 100% !important;
  }

  .md-textarea {
    width: 100% !important;
  }

  .dialog {
    text-align: center;
    width: 30rem;
    padding: 0 2rem;
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
    justify-content: center;
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
    padding-bottom: 7rem;
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
    z-index: 200;
    text-shadow: 0px 0px 30px rgba(255, 255, 255, 1);
  }

  /* Animation */
  .anim-typewriter {
    animation:  typewriter 1.4s steps(16) 0.5s 1 normal both,
                blinkTextCursor 600ms steps(16) 5 normal;
  }
  @keyframes typewriter {
    from {width: 0;}
    to {width: 544px;}
  }
  @keyframes blinkTextCursor {
    from {border-right-color: black;}
    to {border-right-color: transparent;}
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
    z-index: 50;
  }

  .product-example-2 {
    transform: rotate(22deg);
    right: 6%;
    bottom: -25%;
    background-image: url("../assets/produkt1.jpg");
    z-index: 50;
  }

  .product-example-3 {
    transform: rotate(-10deg) scale(0.7);
    right: 12%;
    top: -25%;
    background-image: url("../assets/produkt2.jpg");
    z-index: 40;
    opacity: 0.7;
  }

  .product-example-4 {
    transform: rotate(-5deg) scale(0.8);
    left: 5%;
    bottom: -25%;
    background-image: url("../assets/produkt1.jpg");
    z-index: 40;
    opacity: 0.7;
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

  .helper {
    position: absolute;
    right: 15px;
    top: 5px;
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

  .form-control.form-eigentuemer {
    height: auto;
  }

  select.form-eigentuemer {
    text-align-last: right;
  }

  .form-eigentuemer {
    width: auto;
    float: right;
    background-color: transparent;
    margin-right: 8px;
    border: 0;
    color: #fff;
    padding-top: 0;
    padding-bottom: 0;
  }

  .form-eigentuemer option {
    color: black;
    text-align: right;
  }

  .liDiv {
    position: relative;
    padding: 20px 10px 10px 10px;
    border-radius: 1px;
    background-color: #fff/*#f7f7f7*/;
    min-height: 17rem;
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
    transition: box-shadow 0.1s ease-in-out;
  }

  .liDiv hr {
    margin-bottom: 1.4rem;
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
  }

  #scrollTop img {
    filter: invert(0);
  }


  @media (max-width: 1200px) {
    ul li {
      width: 25%;
    }

    .banner {
      padding: 4rem 1.3rem 1.3rem 1.3rem;
    }
  }

  @media (max-width: 991px) {
    ul li {
      width: 33.3%;
    }
    .banner {
      padding: 2.5rem 0.7rem 0.7rem 0.7rem;
    }

    .col-left,
    .col-center {
      padding-right: 15px;
    }

    .col-right,
    .col-center {
      padding-left: 15px;
    }

    .box-arrow-right {
      display: none;
    }

  }

  @media (max-width: 767px) {
    main {
      padding-bottom: 4rem;
    }
    ul li {
      width: 50%;
    }
    .banner {
      display: none;
    }
    .container {
      padding: 6px;
    }
    .container-fluid {
      padding: 2rem 0 0 0;
    }
    .docWidgetMain {
      width: 60px;
    }
    .docWidgetSec {
      width: 45px;
    }
  }

  @media (max-width: 450px) {
    main {
      padding-bottom: 3rem;
    }

    .container-fluid {
      padding: 1rem 0 0 0;
    }

    #docList {
      display: none;
    }

    .mobileDocList {
      display: inline;
    }

    ul li {
      width: 100%;
      height: auto;
      padding-bottom: 10px;
    }

    .docWidgetSec {
      width: 30px;
    }

    .liDiv {
      padding: 12px 8px 8px 10px;
      min-height: 0;
      text-align: left;
    }

    .docTitle {
      margin-top: 5px;
    }

    .liButtons {
      position: relative;
      text-align: right;
    }

    .updatedAt {
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 0;
    }
  }
</style>
