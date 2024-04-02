<template>
  <v-app>
    <v-app-bar v-if="isLoggin === true"
      app
      color="primary"
    >
      <v-spacer></v-spacer>
      <v-btn @click="logout()">
        <v-icon>
          mdi-logout
        </v-icon>
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    logout(){
     this.$store.commit('LOGGIN', false);
     this.$router.push("/login");
    }
  },
      computed : {
        ...mapState(['isLoggin']),
    }
};
</script>