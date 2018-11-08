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

          <!--
          <div>
            <md-dialog-prompt
              :md-active.sync="active"
              v-model="value"
              md-title="Neues Dokument erstellen"
              md-input-maxlength="30"
              md-input-placeholder="Namen eingeben..."
              md-confirm-text="Erstellen"
              md-cancel-text="Abbruch"/>

            <md-button class="md-primary md-raised" @click="active = true">+</md-button> <br>
          </div>
          -->

          <div>
            <md-dialog :md-active.sync="showDialog">
              <md-dialog-title>Neues Dokument erstellen</md-dialog-title>
                 <md-field class="inputBox">
                   <form id="form" @submit.prevent="addDoc">
                     <md-input type="text" placeholder="Namen eingeben..." v-model="doc" maxlength="20"></md-input>
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
      <li v-for="(data, index) in docs" :key='index'>
        <img style="width: 30px" src="../assets/outline-insert_drive_file-24px.svg" /><hr>
        {{ data.doc }}
      </li>
    </ul>

  </main>
</template>


<script>
  export default {
    name: 'Start',
    data () {
      return {
        active: false,
        value: null,
        showDialog: false,
        docs: [
          { 'doc': 'default doc' }
        ]
      }
    },
    methods: {
      addDoc () {
        this.docs.push({doc: this.doc})
        this.doc = ''
      }
    }
  }
</script>


<style scoped>
  main, body, main{
    height: 100%;
  }

  main{
    width: 70%;
    margin: 0 auto;
    margin-top: 5%;
  }

  .inputBox {
    margin-left: 24px;
    width: 80%;
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
    height: 13rem;
    float: left;
    text-align: center;
    word-wrap: break-word;
  }
</style>
