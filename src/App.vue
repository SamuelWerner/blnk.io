<template>
  <div id="app">
    <a id="pageTop"></a>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed=""> <!-- fixed="top" -->
      <!--<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>-->
      <b-navbar-brand id="logo-brand" to="/">BLNK.IO</b-navbar-brand>
      <!--<b-navbar-brand to="/"><img src="./assets/Logo-Blnk.png" width="150"/></b-navbar-brand>-->
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <!--<b-nav-item to="/posts-manager">CRUD Example</b-nav-item>-->
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
  }
</style>
