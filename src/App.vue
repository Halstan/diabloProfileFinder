<template>
  <div id="app">
    <load-layout v-if="isLoading">
      <loading />
    </load-layout>
    <main-layout v-else></main-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "./components/Loading.vue";
import LoadLayout from "./layouts/LoadLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

export default {
  name: "App",
  components: { MainLayout, LoadLayout, Loading },
  computed: {
    ...mapState("loading", {
      isLoading: "isLoading"
    })
  }
};
</script>

<style lang="stylus">
#app {
  padding: 60px 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff; // Le ponemos un color de letra blanco para que resalte
  background-color: #15202b; // Le cambiamos el color de fondo por un azul marino oscuro
}
</style>
