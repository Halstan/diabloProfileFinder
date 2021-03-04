<template>
  <div>
    <loading v-if="isLoadingHero"></loading>
    <hero-detail-header
      v-if="hero"
      :detail="detailsHeader"
    ></hero-detail-header>
    <b-row>
      <!-- 12 columnas de 'xs' -> 'md', 8 columnas desde 'lg' hacia arriba  -->
      <!-- En 'lg' orden 2 -->
      <b-col md="12" lg="8" order-lg="2">
        <loading v-if="isLoadingItems" />

        <hero-items v-if="items" :items="items"></hero-items>
      </b-col>

      <!-- 12 columnas de 'xs' -> 'md', 4 columnas desde 'lg' hacia arriba -->
      <!-- En 'lg' orden 1 -->
      <b-col md="12" lg="4" order-lg="1">
        <template v-if="hero">
          <HeroAttributes :attributes="detailStats" />
          <HeroSkills v-if="hero.skills" :skills="hero.skills" />
        </template>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import setError from "@/mixins/setError";
import Loading from "@/components/Loading";
import { getApiHero, getApiDetailedHeroItems } from "../../api/search";
import HeroDetailHeader from "./HeroDetailHeader.vue";
import HeroAttributes from "./heroAttributes/Index";
import HeroSkills from "./heroSkills/Index";
import HeroItems from "./heroItems/Index";

export default {
  name: "HeroView",
  mixins: [setError],
  components: {
    Loading,
    HeroDetailHeader,
    HeroAttributes,
    HeroSkills,
    HeroItems
  },
  data() {
    return {
      isLoadingHero: false,
      isLoadingItems: false,
      hero: null,
      items: null
    };
  },
  computed: {
    detailsHeader() {
      const {
        name,
        // valor: alias
        class: classSlug,
        gender,
        level,
        hardcore,
        seasonal,
        paragonLevel,
        alive,
        seasonCreated
      } = this.hero;

      return {
        name,
        classSlug,
        gender,
        level,
        hardcore,
        seasonal,
        paragonLevel,
        alive,
        seasonCreated
      };
    },
    detailStats() {
      // Devuelve el contenido de stats y agrega classSlug
      return { ...this.hero.stats, classSlug: this.hero.class };
    }
  },
  created() {
    this.isLoadingHero = true;
    this.isLoadingItems = true;
    const { region, battleTag: account, heroId } = this.$route.params;

    getApiHero({ region, account, heroId })
      .then(({ data }) => {
        this.hero = data;
      })
      .catch(err => {
        this.hero = null;
        const errObj = {
          routeParams: this.$route.params,
          message: err.message
        };
        if (err.response) {
          errObj.data = err.response.data;
          errObj.status = err.response.status;
        }
        this.setApiErr(errObj);
        this.$router.push({ name: "Error" });
      })
      .finally(() => {
        this.isLoadingHero = false;
      });

    getApiDetailedHeroItems({ region, account, heroId })
      .then(({ data }) => {
        this.items = data;
      })
      .catch(err => {
        this.items = null;
        console.log(err);
      })
      .finally(() => {
        this.isLoadingItems = false;
      });
  }
};
</script>
