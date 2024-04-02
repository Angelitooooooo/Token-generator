<template>
  <v-container fluid>
        <v-card flat dense>
          <v-card-title >Welcome</v-card-title>
          <v-card-text>
            <v-alert :value="alert" type="success" >
              You have successfully logged in!
            </v-alert>
          </v-card-text>
        </v-card>

  </v-container>
</template>

<script>
export default {
  data : () => ({
    alert:true

  }),

}
</script>

<style>

</style>