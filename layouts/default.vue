<template>
  <div id="container">
    <topBar />

    <nuxt />

    <template v-if="!online">
      <div>Bitte stelle eine Internetverbindung her</div>
    </template>
    <bottomBar />
  </div>
</template>

<script>
import topBar from "@/layouts/partials/topBar.vue";
import bottomBar from "@/layouts/partials/bottomBar.vue";
export default {
  components: {
    topBar,
    bottomBar
  },
  data() {
    return {};
  },
  computed: {
    online() {
      if (process.client) {
        return navigator.onLine;
      } else {
        return false;
      }
    }
  },
  async beforeMount() {
    await this.$store.dispatch("logInUser", this.$fireAuth.currentUser);
    await this.$store.dispatch("loadData");
    const loggedIn = await this.$store.getters.loggedIn;
    if (loggedIn !== true) {
      this.$router.push("/login");
    }
  },
  methods: {}
};
</script>

<style></style>
