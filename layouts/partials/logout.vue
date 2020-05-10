<template>
  <button class="log-out-button" @click="logout">Abmelden</button>
</template>

<script>
export default {
  computed: {},
  methods: {
    async logout() {
      await this.$store.dispatch("logOutUser");
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
