<template>
  <v-app>
    <v-app-bar app color="indigo darken-3">
      <div class="d-flex align-center" height="100">
        <v-icon large class="mr-4" color="white">
          mdi-gamepad-variant-outline
        </v-icon>

        <v-btn id="btn" color="secondary" to="/">Home</v-btn>
        <v-btn id="btn" color="secondary" to="/users">Użytkownicy</v-btn>
        <v-btn id="btn" color="secondary" to="/game-types">Typy gier</v-btn>
        <v-btn id="btn" color="secondary" to="/games">Rozgrywki</v-btn>
        <v-btn id="btn" color="secondary" to="/ranks">Rankingi</v-btn>
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
