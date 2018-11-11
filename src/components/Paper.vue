<template>
  <main class="container" style="height:100%">
    <div class="row">
      <div class="col-9">
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light">Datei</button>
          <button type="button" class="btn btn-light">Bearbeiten</button>
          <button type="button" class="btn btn-light">Ansicht</button>
          <button type="button" class="btn btn-light">Einfügen</button>
          <button type="button" class="btn btn-light">Format</button>
          <button type="button" class="btn btn-light">Tools</button>
        </div><br>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light"><b>F</b></button>
          <button type="button" class="btn btn-light"><i>I</i></button>
          <button type="button" class="btn btn-light"><u>U</u></button>
        </div>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light">Links</button>
          <button type="button" class="btn btn-light">Zentriert</button>
          <button type="button" class="btn btn-light">Rechts</button>
        </div>
      </div>
      <div class="col-3">
        <md-button style="margin-top: 1rem; float: right" type="button" onClick="history.go(-1);return true;" class="md-default md-raised md-dense">zurück</md-button>
        <md-button style="margin-top: 1rem; float: right" type="button" @click="showDialog = true" disabled="true" class="md-default md-raised md-dense">umbenennen</md-button>
      </div>
    </div>


    <md-dialog class="dialog" :md-active.sync="showDialog">
      <md-dialog-title>Neuen Namen eingeben</md-dialog-title>

      <md-field class="inputBox">
        <form id="form" @submit.prevent="updateName">
          <label>{{ doc.title }}</label><md-input type="text" v-model="model.title" maxlength="30"></md-input>
        </form>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Abbruch</md-button>
        <md-button class="md-primary" @click="showDialog = false" type="submit" form="form">Umbenennen</md-button>
      </md-dialog-actions>
    </md-dialog>


    <h1 style="margin-top: 3rem;">{{ doc.title }}</h1>    <b-alert class="saving" :show="saveAlert" variant="info">speichert...</b-alert>
    <div style="outline:none" contenteditable="true"
       class="my-3 bg-white rounded shadow-lg paper"
       @input="onDivInput($event, doc)"
       v-html="body" :disabled="1">
    </div>

  </main>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'Paper',
    data () {
      return {
        name: 'Delay',
        showDialog: false,
        doc: [],
        model: {},
        body: [],
        saving: false,
        saveAlert: false
      }
    },
    async created () {
      this.refreshDocs()
    },

    methods: {
      async refreshDocs () {
        this.doc = await api.getDoc(this.$route.params.docID)
        this.body = this.doc.body
      },
      async updateDoc (doc) {
        console.log(doc.id)
        if (doc.id) {
          await api.updateDoc(doc.id, doc)
        }
      },
      async onDivInput (e, doc) {
        if (this.saving) return
        if (doc.id) {
          this.saving = true
          await this.Sleep(3000)
          this.saveAlert = true
          doc.body = e.target.innerHTML
          await api.updateDoc(doc.id, doc)
          await this.Sleep(1000)
          this.saveAlert = false
          this.saving = false
        }
      },
      Sleep (milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
    }
  }
</script>


<style>
  main, body, main{
    height: 100%;
  }

  .saving {
    display: inline;
    float: right;
    top: -55px;
  }

  .paper {
    min-height:1000px;
    padding: 100px !important;
  }

  body{
    background-color:#f3f2f1;
  }

  .btn-group {
    margin: 0.3rem 0.3rem 0 0;
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
