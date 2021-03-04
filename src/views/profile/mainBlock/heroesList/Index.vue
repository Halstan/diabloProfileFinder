<template>
  <div>
    <h1>Hero List</h1>
    <!--<b-form-checkbox v-model="isDark">Darks</b-form-checkbox>-->
    <b-table
      :dark="isDark"
      hover
      small
      striped
      stacked="sm"
      :items="heroes"
      :fields="fields"
    >
      <template v-slot:cell(name)="data">
        <hero-ico :hero="data.item" />
      </template>

      <template v-slot:cell(class)="data">
        <hero-class-level
          :hero="{ classSlug: data.item.classSlug, level: data.item.level }"
        />
      </template>
      <template v-slot:cell(kills)="data">
        <span>{{ data.item.kills.elites | formatNumber }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import HeroClassLevel from "./HeroClassLevel.vue";
import HeroIco from "./HeroIco.vue";
import { formatNumber } from "@/filters/numeral";

export default {
  components: { HeroIco, HeroClassLevel },
  name: "HeroesList",
  filters: {
    formatNumber
  },
  data() {
    return {
      isDark: true,
      fields: [
        {
          key: "name",
          label: "Name"
        },
        {
          key: "class",
          label: "Class",
          sortable: true
        },
        {
          key: "kills",
          label: "Elite Kills",
          sortable: true
        }
      ]
    };
  },
  props: {
    heroes: {
      required: true,
      type: Array
    }
  },
  watch: {
    isDark: function(val) {
      return console.log(val);
    }
  }
};
</script>
