<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">blnk.io</b-navbar-brand>
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

</style>
