<template>
  <div>
    <loading v-if="isLoading"></loading>
    <template v-if="profileData != null">
      <main-block :profile-data="profileData"></main-block>
      <artisans-block :artisans-data="artisansData"></artisans-block>
    </template>
  </div>
</template>

<script>
import setError from "@/mixins/setError";
import { getApiAccount } from "@/api/search";
import MainBlock from "./mainBlock/Index";
import Loading from "../../components/Loading.vue";
import ArtisansBlock from "./artisansBlock/Index";

export default {
  components: { Loading, MainBlock, ArtisansBlock },
  name: "ProfileView",
  data() {
    return {
      isLoading: false,
      profileData: null
    };
  },
  mixins: [setError],
  created() {
    this.isLoading = true;
    this.fetchData();
  },
  methods: {
    /**
     * Obtener los datos de la API
     * Guardarlos en 'profileData'
     * @param region {String}
     * @param account {String}
     */
    fetchData() {
      const { region, battleTag: account } = this.$route.params;

      getApiAccount({ region, account })
        .then(({ data }) => {
          this.profileData = data;
        })
        .catch(err => {
          this.profileData = null;

          const errObj = {
            routeParams: this.$route.params,
            message: err.message
          };

          if (err.response) {
            errObj.data = err.response.data;
            errObj.status = err.response.status;
          }
          // Hacemos uso del Mixin
          // Guardamos el objeto en el Store
          this.setApiErr(errObj);
          // Navegamos a la ruta de nombre 'Error'
          this.$router.push({ name: "Error" });
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  computed: {
    artisansData() {
      return {
        blacksmith: this.profileData.blacksmith,
        blacksmithHardcore: this.profileData.blacksmithHardcore,
        jeweler: this.profileData.jeweler,
        jewelerHardcore: this.profileData.jewelerHardcore,
        mystic: this.profileData.mystic,
        mysticHardcore: this.profileData.mysticHardcore
      };
    }
  }
};
</script>
