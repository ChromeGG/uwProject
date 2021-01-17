<template>
  <v-app>
    <v-app-bar app color="indigo darken-3">
      <div class="d-flex align-center" height="100">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-btn id="btn" color="secondary" to="/">Home</v-btn>
        <v-btn id="btn" color="secondary" to="/users">Użytkownicy</v-btn>
        <v-btn id="btn" color="secondary" to="/game-types">Typy gier</v-btn>
      </div>
    </v-app-bar>
    <router-view id="view" />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({})
}
</script>

<style>
#btn {
  margin-right: 2px;
  color: whitesmoke;
}
#view {
  margin-top: 65px;
}
</style>
