<template>
  <div id="app">
    <a id="pageTop"></a>
    <b-navbar id="nav" toggleable="md" type="dark" variant="dark" fixed=""> <!-- fixed="top" -->
      <!--<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>-->
      <b-navbar-brand id="logo-brand" href="/">BLNK.IO</b-navbar-brand>
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
    padding: 0.6rem 0;
    box-shadow: 0 -1rem 5rem -0.5rem #000;
    border-top: 1px solid #575b5f;
  }
</style>

<style scoped>
  #nav {
    box-shadow: 0 1rem 5rem -0.5rem #000;
    border-bottom: 1px solid #575b5f;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>
