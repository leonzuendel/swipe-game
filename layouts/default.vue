<template>
  <div id="container">
    <topBar />
    <nuxt />
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
  methods: {}
};
</script>

<style></style>
