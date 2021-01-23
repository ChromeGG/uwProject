<template>
  <v-container>
    <v-layout text-center wrap align-center justify-center column fill-height>
      <v-flex col-12>
        <h1 class="display-2 font-weight-bold mb-3">
          Games Stats
        </h1>
        <h2 class="headline font-weight-bold mb-3">Opis</h2>
        <div class="subheading font-weight-regular">
          Games stats to prosta aplikacja webowa z bazą danych.
          <br>
          Możemy dodawać użytkowników i typy gier.
          <br>
          Użytkownicy mogą dodawać rozegrane gry między sobą.
          <br>
          Na podstawie zajętych miejsc wyliczany jest ranking.
          <br>
          <code> Ranking = ???</code>
        </div>
      </v-flex>

      <v-flex col-12>
        <h2 class="headline font-weight-bold mb-3">Przydatne komendy</h2>
        <code>
          ./dev start <br >
          ./dev stop <br >
          ./dev logs <br >
          ./dev logs &#60;app/db&#62; <br >
          ./dev reset <br >
          ./dev restart <br >
          ./dev ps <br >
          ./dev yarn knex <br >
          ./dev yarn test <br >
        </code>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>
