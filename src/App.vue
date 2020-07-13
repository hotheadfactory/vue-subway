<template>
  <div id="wrapper">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/admin/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style>
@import "../public/admin/css/admin-app.css";
</style>
