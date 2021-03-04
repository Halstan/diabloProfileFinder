<template>
  <div class="home">
    <home-title></home-title>
    <home-form></home-form>
  </div>
</template>

<script>
import HomeForm from "./HomeForm.vue";
import HomeTitle from "./HomeTitle.vue";
// @ is an alias to /src

export default {
  components: { HomeTitle, HomeForm },
  name: "Home"
};
</script>
