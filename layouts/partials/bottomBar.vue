<template>
  <div id="bottom-bar">
    <button class="log-out-button" @click="logout">Abmelden</button>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      let loggedOut = false;
      await this.$fireAuth.signOut().then(
        function() {
          loggedOut = true;
        },
        function(err) {
          alert(err.message);
        }
      );
      if (loggedOut === true) {
        await this.$store.dispatch("logOutUser");
        const loggedIn = await this.$store.getters.loggedIn;
        if (loggedIn !== true) {
          this.$router.push("/login");
        }
      }
    }
  }
};
</script>

<style></style>
