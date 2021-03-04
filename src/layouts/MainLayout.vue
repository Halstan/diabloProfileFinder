<template>
  <div class="container">
    <HeaderBar />
    <router-view></router-view>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from "@/components/headerBar/Index";
import FooterBar from "@/components/footer/Index";

export default {
  name: "MainLayout",
  components: {
    HeaderBar,
    FooterBar
  }
};
</script>
