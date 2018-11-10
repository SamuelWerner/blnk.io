<template>
  <main class="container" style="height:100%">
    <h1 class="h1">blnk.io</h1>
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
                     <md-input type="text" placeholder="Titel eingeben..." v-model="model.title" maxlength="30"></md-input>
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

    <ul>
      <li v-for="doc in docs" :key="doc.id">
        <img style="width: 30px" src="../assets/outline-insert_drive_file-24px.svg" /><hr>
        {{ doc.title }}
        <md-button class="md-danger" @click.prevent="deleteDoc(doc.id)">Löschen</md-button>
        <md-button class="md-primary" @click.prevent="openDoc(doc.id)">Öffnen</md-button>
      </li>
    </ul>

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
      async deleteDoc (id) {
        if (confirm('Wirklich löschen?')) {
          if (this.model.id === id) {
            this.model = {}
          }
          await api.deleteDoc(id)
          await this.refreshDocs()
        }
      },
      async openDoc (id) {
        this.$router.push('/paper/' + id)
      }
    }
  }
</script>


<style scoped>
  main, body, main {
    height: 100%;
  }

  main{
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
    padding: 12px 20px;
    margin: 1rem 1rem 0 0;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: calc(0.25rem - 1px);
    background-color: rgba(0, 0, 0, 0.03);
    width: 16%;
    min-width: 160px;
    height: 13rem;
    float: left;
    text-align: center;
    word-wrap: break-word;
  }

  .dialog {
    text-align: center;
    width: 30rem;
    padding: 0 2rem;
  }

  input {
    width: 416px;
  }
</style>
