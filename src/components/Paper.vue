<!--  omment for test commit -->
<template>
  <main class="container" style="height:100%">
    <h1>{{ doc.title }}</h1>
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
        doc: [],
        model: {},
        body: []
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
      onDivInput: function (e, doc) {
        var copydoc = doc
        if (copydoc.id) {
          console.log('update')
          copydoc.body = e.target.innerHTML
          api.updateDoc(copydoc.id, copydoc)
        }
      }
    }
  }
</script>


<style>

  main, body, main{
    height: 100%;
  }

  .paper {
    min-height:1000px;
    padding: 70px !important;
  }

  body{
    background-color:#f3f2f1;
  }



</style>
