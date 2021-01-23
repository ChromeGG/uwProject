<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedGameType"
          label="Typ gry"
          :items="gameTypes"
          item-text="name"
          clearable
          :rules="[(v) => !!v || 'Typ gry jest wymagany']"
          return-object
          filled
          @change="fetchRank"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="rank" :sort-by="['rank']" :sort-desc="[true]"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      headers: [
        {
          text: 'Wynik',
          value: 'rank'
        },
        {
          text: 'Użytkownik',
          value: 'nickname'
        }
      ],
      gameTypes: [],
      selectedGameType: null,
      rank: []
    }
  },
  created() {
    this.fetchGameTypes()
  },
  methods: {
    async fetchGameTypes() {
      const { data } = await this.$http.get('/game-types')
      this.gameTypes = data
    },
    async fetchRank() {
      const { data } = await this.$http.get('/rank', { params: { gameTypeId: this.selectedGameType.id } })
      this.rank = data
    }
  }
}
</script>
