<template>
  <div id="top-bar">
    <!-- <template v-show="!userName && !userEmail">
      Eingeloggt: <br />
      Display Name: {{ userName }} <br />
      Email: {{ userEmail }}
    </template> -->

    <div v-for="entry in resourcesByIds(userResources)" :key="entry.res">
      <template v-if="resource(entry.res) != null">
        <i :class="resource(entry.res).icon"></i>
        {{ entry.amount }}
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userResources", "resources"]),
    userName() {
      return this.$store.getters.userName;
    },
    userEmail() {
      return this.$store.getters.userEmail;
    }
  },
  methods: {
    resourcesByIds(res) {
      const output = Object.entries(res).map(([res, amount]) => ({
        res,
        amount
      }));
      return output;
    },
    resource(id) {
      const res = this.resources.filter((res) => res.id === parseInt(id))[0];
      if (res != null) {
        return res;
      }
    }
  }
};
</script>

<style></style>
