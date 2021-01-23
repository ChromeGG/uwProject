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
          <br >
          Możemy dodawać użytkowników i typy gier.
          <br >
          Użytkownicy mogą dodawać rozegrane gry między sobą.
          <br >
          Na podstawie zajętych miejsc wyliczany jest ranking.
          <br >
          <code>
            <pre>
            Ranking_formula
            currentRanking + 50 / place
            for i in range(number_of_players):
              for j in range(i + 1, number_of_players):
                if (loser_ranking > current_player_ranking):
                current_player_ranking += difference * WEIGHT
                loser_player _ranking -= difference * WEIGHT
            </pre>
          </code>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>
