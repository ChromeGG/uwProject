<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" class="mb-2" @click="createNewGameTypeDialog = true">
          Stwórz nowy typ gry
        </v-btn>
        <v-dialog v-model="createNewGameTypeDialog" max-width="520">
          <v-card>
            <v-card-title>
              Stwórz nowy typ gry
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  v-model.trim="name"
                  label="Nazwa"
                  counter="30"
                  filled
                  clearable
                  :rules="[
                    (v) => !!v || 'Nazwa jest wymagana',
                    (v) => !(v && v.length < 3) || 'Nazwa musi mieć przynajmniej 3 znaki',
                    (v) => !(v && v.length > 30) || 'Nazwa nie może mieć więcej niż 30 znaków'
                  ]"
                />
                <v-text-field
                  v-model.number="weight"
                  label="Waga"
                  min="1"
                  max="100"
                  step="1"
                  filled
                  suffix="%"
                  clearable
                  :rules="[
                    (v) => !!v || 'Waga jest wymagana',
                    (v) => v >= 1 || 'Waga musi być większa lub równa 1',
                    (v) => v < 100 || 'Waga musi być mniejsza lub równa 100'
                  ]"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="createNewGameTypeDialog = false">
                Anuluj
              </v-btn>
              <v-btn color="primary" :disabled="!valid" @click="createNewGametype()">
                Stwórz
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="gameTypes" />
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
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Nazwa',
          value: 'name'
        },
        {
          text: 'Waga(%)',
          value: 'weight'
        },
        { text: 'Stworzono', value: 'createdAt' }
      ],
      gameTypes: [],
      createNewGameTypeDialog: false,
      name: null,
      weight: 10,
      valid: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await this.$http.get('/game-types')
      this.gameTypes = data
    },
    async createNewGametype() {
      const { name, weight } = this
      try {
        await this.$http.post(`/game-types`, { name, weight })
      } catch (error) {
        console.log(error)
      }
      this.fetchData()
      this.createNewGameTypeDialog = false
    }
  }
}
</script>
