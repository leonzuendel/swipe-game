<template>
  <div id="login">
    <div class="login-form">
      <button class="log-in-button" @click="loginWithGoogle">
        Mit Google anmelden
      </button>
      <!--<button class="button" @click="login">Anmelden</button>-->
      <button class="log-out-button" @click="logout">Abmelden</button>

      <p>{{ userId }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState(["user"]),
    userId() {
      return this.$store.getters.userId;
    }
  },
  methods: {
    async login() {
      let errored = false;
      let loggedUser = null;
      await this.$fireAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          loggedUser = result.user;
          errored = false;
        })
        .catch((err) => {
          errored = true;
          alert(err.message);
        });
      if (errored !== true) {
        await this.$store.dispatch("logInUser", loggedUser);
        this.$router.push("/");
      }
    },
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
      }
    },
    async loginWithGoogle() {
      let errored = false;
      let loggedUser = null;
      const provider = new this.$fireAuthObj.GoogleAuthProvider();
      await this.$fireAuth
        .signInWithPopup(provider)
        .then(function(result) {
          // The signed-in user info.
          loggedUser = result.user;
          // ...
        })
        .catch(function(err) {
          errored = true;
          alert(err.message);
        });
      if (errored !== true) {
        this.$store.dispatch("logInUser", loggedUser);
        this.$router.push("/");
      }
    }
  }
};
</script>
