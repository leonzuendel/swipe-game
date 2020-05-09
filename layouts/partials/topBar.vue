<template>
  <div id="top-bar">
    <template v-show="!userName && !userEmail">
      Eingeloggt: <br />
      Display Name: {{ userName }} <br />
      Email: {{ userEmail }}
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    }
  }
};
</script>

<style></style>
