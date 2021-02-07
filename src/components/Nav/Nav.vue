<template>
  <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
    <b-navbar-brand to="/"
      ><b-icon icon="house-door" aria-hidden="true" /> Start</b-navbar-brand
    >

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/login" v-if="!login"
          ><b-icon icon="lock-fill" aria-hidden="true" /> Zaloguj</b-nav-item
        >
        <b-nav-item to="/register" v-if="!login"
          ><b-icon icon="file-person" aria-hidden="true" />
          Zarejestruj</b-nav-item
        >
        <b-nav-item @click="logOut()" v-if="login"
          ><b-icon icon="power" aria-hidden="true" /> Wyloguj</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Nav",
  watch: {
    $route: function() {
      if (localStorage.login) {
        this.login = localStorage.login;
      }
    },
  },
  data() {
    return {
      login: null,
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.login = null;
      this.$router.push("/login");
    },
    token() {
      return localStorage.login;
    },
  },
  beforeMount() {
    this.login = localStorage.login;
  },
};
</script>

<style></style>
