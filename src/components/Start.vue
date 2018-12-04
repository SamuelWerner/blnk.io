<template>
  <main class="container" style="height:100%">
    <div>
      <div class="card text-center">
        <div class="card-header">
          Featured
        </div>
        <div class="card-body">
          <p><img style="width: 60px" src="../assets/outline-insert_drive_file-24px.svg" /></p>
          <h5 class="card-title">Neues Dokument anlegen</h5>
          <p class="card-text">Lege ein neues Dokument an und bearbeite es.</p>

          <div>
            <md-dialog class="dialog" :md-active.sync="showDialog">
              <md-dialog-title>Neues Dokument anlegen</md-dialog-title>
                 <md-field class="inputBox">
                   <form id="form" @submit.prevent="saveDoc">
                     <label>Titel eingeben...</label><md-input type="text" v-model="model.title" maxlength="30"></md-input>
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
    </div>

    <div>
      <ul>
        <li v-for="doc in docs" :key="doc.hash">
          <img style="" src="../assets/outline-insert_drive_file-24px.svg" /><hr>
          <span class="docTitle">{{ doc.title }}</span><br>
          <span class="updatedAt">{{doc.updatedAt | formatDate}}</span>
          <md-button class="md-primary md-raised md-dense" @click.prevent="openDoc(doc.hash)">Öffnen</md-button><br>
          <md-button class="md-danger md-dense" @click.prevent="deleteDoc(doc.hash)">Löschen</md-button>
        </li>
      </ul>
    </div>
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
  body {
    background-color: #f3f2f1 !important;
  }
</style>

<!-- Style nur diese Komponente -->
<style scoped>
  main, body, main {
    height: 100%;
  }

  main {
    width: 70%;
    margin: 0 auto;
    margin-top: 5rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    width: 100%;
  }

  ul li {
    padding: 20px 10px 10px 10px;
    margin: 1rem 1rem 0 0;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: calc(0.25rem - 1px);
    background-color: #fff/*#f7f7f7*/;
    width: 12rem;
    min-height: 15rem;
    float: left;
    text-align: center;
    word-wrap: break-word;
    transition: box-shadow 0.2s ease-out;
  }

  ul li:hover {
    -webkit-box-shadow: 2px 4px 15px 1px rgba(189,189,189,1);
    -moz-box-shadow: 2px 4px 15px 1px rgba(189,189,189,1);
    box-shadow: 2px 4px 15px 1px rgba(189,189,189,1);
    transition: box-shadow 0.2s ease-in-out;
  }

  .updatedAt {
    font-size: 9px;
  }

  .dialog {
    text-align: center;
    width: 30rem;
    padding: 0 2rem;
  }

  input {
    width: 416px;
  }

  .docTitle {
    margin: 0;
    font-weight: normal;
    margin: 0 5px;
  }

  li .md-button {
    font-size: 0.8rem;
  }

  li img {
    width: 33px;
  }
</style>
