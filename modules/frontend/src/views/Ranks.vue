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
        <v-data-table :headers="headers" :items="rank">
          <!-- <template v-slot:item.users="{ item }">
            <v-chip v-for="user in item.users" :key="user.id">
              {{ user.nickname }}
            </v-chip>
          </template> -->
        </v-data-table>
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
          text: 'Użytkownik',
          value: 'users'
        },
        {
          text: 'Wynik',
          value: 'rank'
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
      const { data } = await this.$http.get('/rank', { gameTypeId: this.selectedGameType.id })
      console.log(data)
      this.gameTypes = data
    }
  }
}
</script>
