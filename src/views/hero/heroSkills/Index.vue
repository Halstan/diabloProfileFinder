<template>
  <div class="skills-wrapper mt-5">
    <h2 class="font-diablo">Skills</h2>
    <hr class="bg-white" />

    <b-nav pills small>
      <b-nav-item
        :active="!isPassiveSkillsActive"
        @click="changeComponent('ActiveSkills')"
        >Active</b-nav-item
      >
      <b-nav-item
        :active="isPassiveSkillsActive"
        @click="changeComponent('PassiveSkills')"
        >Passive</b-nav-item
      >
    </b-nav>

    <keep-alive>
      <component :is="activeComponent" :skills="componentProps" />
    </keep-alive>
    <!--<ActiveSkills :skills="skills.active" />
    <hr />
    <passive-skills :skills="skills.passive" />-->
  </div>
</template>

<script>
export default {
  name: "HeroSkills",
  data() {
    return {
      activeComponent: "ActiveSkills"
    };
  },
  components: {
    ActiveSkills: () =>
      import(/* webpackChunkName: "ActiveSkills" */ "./ActiveSkills"),
    PassiveSkills: () =>
      import(/* webpackChunkName: "PassiveSkills" */ "./PassiveSkills")
  },
  props: {
    skills: {
      required: true,
      type: Object
    }
  },
  methods: {
    changeComponent(component) {
      this.activeComponent = component;
    }
  },
  computed: {
    componentProps() {
      return this.activeComponent === "ActiveSkills"
        ? this.skills.active
        : this.skills.passive;
    },
    // Nos dice si el componente "HabilidadesPasivas" está activo o no
    isPassiveSkillsActive() {
      return this.activeComponent === "PassiveSkills";
    }
  }
};
</script>
