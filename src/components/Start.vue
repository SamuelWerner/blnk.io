<template>
  <main>
    <div class="container-fluid">
      <!--
      <div style="text-align: left; margin: 2rem 0; padding: 2rem 2rem 2rem 5rem; background-color: #343a40">
        <img src="../assets/Logo-BLNK.svg" style="width: 40%" />
      </div>
      -->
      <div class="banner">
        <img style="max-width: 1088px;" src="../assets/Blnk-Logo.png" />
      </div>
      <div class="container">
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
                   <md-field class="inputBox">
                     <form id="form" @submit.prevent="saveDoc">
                       <label>Titel eingeben...</label><md-input type="text" v-model="model.title" maxlength="20"></md-input>
                     </form>
                   </md-field>
                <md-dialog-actions>
                  <md-button class="md-primary" @click="showDialog = false">Abbruch</md-button>
                  <md-button type="submit" form="form" class="md-primary" @click="showDialog = false">Erstellen</md-button>
                </md-dialog-actions>
              </md-dialog>
              <md-button class="md-primary md-raised" @click="showDialog = true">+</md-button>
            </div>
          </div>
        </div>

        <div class="docList">
          <ul>
            <li v-for="doc in docs" :key="doc.hash">
              <div class="liDiv">
                <img class="docWidgetSec" src="../assets/outline-insert_drive_file-24px.svg" /><hr>
                <span class="docTitle">{{ doc.title }}</span><br>

                <div class="liButtons">
                  <span class="updatedAt">geändert: {{doc.updatedAt | formatDate}}</span><br>
                  <md-button class="md-primary md-raised md-dense" @click.prevent="openDoc(doc.hash)">Öffnen</md-button><br>
                  <md-button class="md-danger md-dense" @click.prevent="deleteDoc(doc.hash)">Löschen</md-button>
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
    <div id="footer" >&copy; THM | <a href="/impress">Impressum</a></div>
  </main>
</template>


<script>
  import api from '@/api'
  export default {
    name: 'Start',
    data () {
      return {
        showDialog: false,
        docs: [],
        model: {}
      }
    },
    async created () {
      this.refreshDocs()
    },
    methods: {
      async refreshDocs () {
        this.docs = await api.getDocs()
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
      }
    }
  }
</script>

<!-- Style Allgemein -->
<style>
  #footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color: #f7f7f7;
    background-color: #2e3338;
    font-size: 0.8rem;
    padding: 0.6rem 0;
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

  .card {
    margin: 0 10px;
    min-width: 220px;
  }

  .mobileDocList {
    display: none;
  }

  ul {
    margin: 1.5rem 0 0 0;
    padding: 0;
    list-style-type: none;
    width: 100%;
  }

  ul li {
    padding: 0 10px 20px 10px;
    width: 20%;
    float: left;
    min-width: 210px;
  }

  .liDiv {
    position: relative;
    padding: 20px 10px 10px 10px;
    border-radius: calc(0.25rem - 1px);
    background-color: #fff/*#f7f7f7*/;
    min-height: 17.5rem;
    float: left;
    text-align: center;
    word-wrap: break-word;
    transition: box-shadow 0.2s ease-out;
    width: 100%;
  }

  .liDiv:hover {
    -webkit-box-shadow: 5px 5px 22px 2px rgba(0,0,0,1);
    -moz-box-shadow: 5px 5px 22px 2px rgba(0,0,0,1);
    box-shadow: 5px 5px 22px 2px rgba(0,0,0,1);
    transition: box-shadow 0.2s ease-in-out;
  }

  .updatedAt {
    font-size: 9px;
    margin-bottom: 10px;
  }

  .dialog {
    text-align: center;
    width: 30rem;
    padding: 0 2rem;
  }

  .docTitle {
    font-weight: normal;
    margin: 0 5px 20px 5px;
  }

  li .md-button {
    font-size: 0.8rem;
  }

  li img {
    width: 33px;
  }

  .banner {
    text-align: center;
    padding: 3rem 2rem 2rem 2rem;
    margin-bottom: 0.7rem;
  }

  .banner img {
    width: 30%;
  }

  .liButtons {
    position: absolute;
    bottom: 0;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }

  .docWidgetMain {
    width: 80px;
  }

  .docWidgetSec {
    width: 50px;
  }


  @media (max-width: 1200px) {
    ul li {
      width: 25%;
    }
    .banner {
      padding: 1.3rem;
    }
  }

  @media (max-width: 991px) {
    ul li {
      width: 33.3%;
    }
    .banner {
      padding: 0.7rem;
    }
  }

  @media (max-width: 767px) {
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
      padding: 0.7rem 0 0 0;
    }
    .docWidgetMain {
      width: 60px;
    }
    .docWidgetSec {
      width: 45px;
    }
  }

  @media (max-width: 450px) {
    .docList {
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
