<template>
  <div id="bottom-bar">
    <Logout />
    Aktuelle Position im Stapel: {{ this.$store.state.currentCardCount }} von
    {{ this.$store.state.deckLength }}<br />
    Aktueller Stapel (ID-Array): {{ this.$store.state.deck }}
  </div>
</template>

<script>
import Logout from "@/layouts/partials/logout.vue";
export default {
  components: {
    Logout
  },
  methods: {}
};
</script>

<style></style>
