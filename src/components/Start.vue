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
        </div>
      </div>
    </div>

    <span v-if="value">Value: {{ value }}</span>

  </main>
</template>

<script>
  export default {
    name: 'Start',
    data: () => ({
      active: false,
      value: null
    })
  }
</script>

<style scoped>
  main, body, main{
    height: 100%;
  }

  main{
    width: 70%;
    margin: 0 auto;
    margin-top: 10%;
  }

  .btn:hover {
    text-decoration: none;
  }

  .btn {
    color: white !important;
  }
</style>
