<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <div v-if="loading == true">
        <center>
          <v-progress-circular
            :size="100"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <h1>Loading</h1>
        </center>
      </div>
      <v-flex xs12 sm8 md4 v-else>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form  @submit.prevent="login">
              <v-text-field
                v-model="users.username"
                prepend-icon="mdi-account"
                name="Username"
                 :rules="usernameRules"
                label="Username"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="users.password"
                id="password"
                 :rules="passwordRules"
                @keyup.enter="login()"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2'
export default {
  name: "",
  data: () => ({
    users: {},
    loading: false,
    baseUrl: "http://localhost:5000/user/",
          usernameRules: [
        value => !!value || 'Username is required',
      ],
      passwordRules: [
        value => !!value || 'Password is required',
      ]
  }),
  methods: {
    login() {
      if(!this.users.username){
        Swal.fire({
            position: "center",
            icon: "error",
            title:'Please Insert Username',
            showConfirmButton: false,
            timer: 1500
        });
        return false

      }
      if(!this.users.password){
          Swal.fire({
            position: "center",
            icon: "error",
            title:'Please Insert Password',
            showConfirmButton: false,
            timer: 1500
        });

        return false
      }
      axios({
        method: "POST",
        url: `${this.baseUrl}login`,
        data: this.users,
      })
        .then((res) => {
          if (res.status == 200) {
            this.$store.commit('LOGGIN', true);
            this.$store.commit('UPDATE_TOKEN', res.data.token);
            this.$router.push("/");
          }
        })
        .catch((error) => {
            if (error.response) {
                 Swal.fire({
                      position: "center",
                      icon: "error",
                      title:error.response.data.message,
                      showConfirmButton: false,
                      timer: 1500
                  });
                } else {
                  console.error(error);
             }
        });
    },
  },
};
</script>
<style></style>
