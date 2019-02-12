<template>
  <div id="app">
    <a id="pageTop"></a>
    <b-navbar id="nav" toggleable="md" type="dark" variant="dark" fixed=""> <!-- fixed="top" -->
      <!--<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>-->
      <b-navbar-brand id="logo-brand" href="/">BL_NK.IO</b-navbar-brand>
      <!--<b-navbar-brand to="/"><img src="./assets/Logo-Blnk.png" width="150"/></b-navbar-brand>-->
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <!--<b-nav-item to="/posts-manager">CRUD Example</b-nav-item>-->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
                <img style="filter: invert(1); margin-bottom: 2px;" src="../src/assets/baseline-person-24px.svg" alt="BV">
            </template>
            <b-dropdown-item href="#">Profil</b-dropdown-item>
            <b-dropdown-item href="#">Abmelden</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />
    <!-- Footer -->
    <div id="footer" >
      <a href="mailto:info@blnk.io.de?subject=Report%20Bug%20-%20BLNK.IO&amp;body=Hallo%20BLNK.IO%20Team,%0D%0A%0D%0AZusammenfassung:%0D%0A%0D%0ASchritte%20zum%20Nachvollziehen:%0D%0A%0D%0AErwartetes%20Ergebnis:%0D%0A%0D%0AErhaltenes%20Ergebnis:%0D%0A%0D%0AMehr%20Informationen:%0D%0A%0D%0A" title="Report Bug by E-Mail">
        <div class="reportBug">
          <i class="material-icons">report</i>
          Report Bug
        </div>
      </a>
      &copy; BL_NK.IO &nbsp;|&nbsp; <a href="/impress">Impressum</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    title: 'BLNK.io',
    data () {
      return {
        activeUser: null
      }
    },
    methods: {
      async logout () {
        await this.$auth.logout()
        await this.refreshActiveUser()
        this.$router.push('/')
      }
    }
  }
</script>

<style>
  html {
    font-size: 100%;
  }

  #logo-brand {
    font-family: Franklin Gothic Heavy, sans-serif;
    font-size: 2.2rem;
    color: white;
    padding: 0;
    text-decoration: none;
  }

  #footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color: #f7f7f7;
    background-color: #2e3338;
    font-size: 0.8rem;
    padding: 0.8rem 0;
    border-top: 1px solid #575b5f;
  }

  a div.reportBug {
    color: white;
  }

  a div.reportBug:hover {
    color: #448aff;
    text-decoration: none;
  }

  a div.reportBug:hover i {
    color: white;
  }

  .reportBug {
    position: absolute;
    left: 12px;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  .reportBug i {
    font-size: 1.1rem;
    margin-right: 5px;
    margin-top: 2px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #888888;
    width: 100px;
  }

  @media (max-width: 450px) {
    .reportBug {
      display: none;
    }
  }
</style>

<style scoped>
</style>
