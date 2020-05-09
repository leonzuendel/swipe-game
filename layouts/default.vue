<template>
  <div id="container">
    <topBar />
    <template v-if="online">
      <nuxt />
    </template>
    <template v-else>
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
  created() {
    if (this.$store.state.loggedIn !== true) {
      this.$router.push("/login");
    }
  },
  methods: {}
};
</script>

<style></style>
