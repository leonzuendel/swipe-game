<template>
  <div id="content">
    <cardView :card="testCard" />
  </div>
</template>

<script>
import cardView from "@/layouts/partials/cardView.vue";
export default {
  components: {
    cardView
  },
  data() {
    return {
      testCard: {
        title: "Test Card"
      }
    };
  },
  methods: {}
};
</script>

<style></style>
