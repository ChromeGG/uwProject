<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="createNewGameDialog = true">
          Dodaj rozgrywkę
        </v-btn>
        <v-btn color="primary" class="ml-2" @click="expandMoves = !expandMoves">
          {{ expandMoves ? 'Ukryj ruchy' : 'Pokaż ruchy' }}
        </v-btn>
        <v-dialog v-model="createNewGameDialog" max-width="600">
          <v-card>
            <v-card-title>
              Dodaj rozgrywkę
            </v-card-title>
            <v-form v-model="valid">
              <v-card-text>
                <v-select
                  v-model="selectedGameType"
                  label="Typ gry"
                  :items="gameTypes"
                  item-text="name"
                  clearable
                  :rules="[(v) => !!v || 'Typ gry jest wymagany']"
                  return-object
                  filled
                />

                <v-dialog v-model="addUserDialog" max-width="600">
                  <v-card>
                    <v-form v-model="userValidation">
                      <v-card-title>
                        Dodaj uczestnika
                      </v-card-title>
                      <v-card-text>
                        <div class="mb-2">Miejsce {{ place }}</div>
                        <v-select
                          v-if="users.length"
                          v-model="selectedUser"
                          item-text="nickname"
                          return-object
                          label="Uczestnicy"
                          filled
                          :rules="[(v) => !!v || 'Użytkownik jest wymagany']"
                          :items="avaibleUsers"
                        />
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="addUserDialog = false">
                          Anuluj
                        </v-btn>
                        <v-btn color="primary" :diabled="userValidation" @click="addUser()">
                          Dodaj
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-card-text>
              <v-card-text>
                <v-data-table :headers="selectedUsersHeaders" :items="selectedUsers" hide-default-footer>
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Uczestnicy</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical />
                      <v-btn color="primary" class="ml-auto" @click="addUserDialog = true">
                        Dodaj uczestnika
                      </v-btn>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-card-text>
              <v-card-text class="d-flex justify-center">
                <v-date-picker v-model="date" width="400" color="primary" header-color="primary" />
              </v-card-text>
              <v-card-text>
                <v-textarea
                  v-model.trim="moves"
                  clearable
                  label="Ruchy"
                  filled
                  :rules="[(v) => !!v || 'Ruchy są wymagane']"
                />
              </v-card-text>
            </v-form>
            <v-card-actions>
              <v-btn @click="createNewGameDialog = false">
                Anuluj
              </v-btn>
              <v-btn color="primary" :disabled="!valid || selectedUsers.length < 2" @click="createNewGame()">
                Stwórz
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="games">
          <template v-slot:item.users="{ item }">
            <v-chip v-for="user in item.users" :key="user.id">
              {{ user.nickname }}
            </v-chip>
          </template>
          <template v-slot:item.moves="{ item }">
            <div style="max-width: 150px;" :class="{ 'text-truncate': !expandMoves, 'text-pre-wrap': expandMoves }">
              {{ item.moves }}
            </div>
          </template>
          <template v-slot:item.date="{ item, value }">
            {{ item.date.substring(0, 10) }}
          </template>
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
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Typ Gry',
          value: 'name'
        },
        {
          text: 'Uczestnicy',
          value: 'users'
        },
        {
          text: 'Ruchy',
          value: 'moves'
        },
        {
          text: 'Data',
          value: 'date'
        },
        { text: 'Stworzono', value: 'createdAt' }
      ],
      games: [],
      createNewGameDialog: false,
      gameTypes: [],
      selectedGameType: null,
      selectedUsersHeaders: [
        {
          text: 'Miejsce',
          value: 'place'
        },
        {
          text: 'Nazwa',
          value: 'nickname'
        }
      ],
      users: [],
      addUserDialog: false,
      place: 1,
      selectedUsers: [],
      selectedUser: null,
      moves: null,
      expandMoves: false,
      date: new Date().toISOString().substr(0, 10),
      valid: false,
      userValidation: false
    }
  },
  computed: {
    avaibleUsers() {
      const { users, selectedUsers } = this
      const avaibles = []
      for (const user of users) {
        if (!selectedUsers.some(({ id }) => id === user.id)) {
          avaibles.push(user)
        }
      }
      return avaibles
    }
  },
  created() {
    this.fetchGames()
    this.fetchUsers()
    this.fetchGameTypes()
  },
  methods: {
    async fetchGames() {
      const { data } = await this.$http.get('/games')
      this.games = data
    },
    async fetchUsers() {
      const { data } = await this.$http.get('/users')
      this.users = data
    },
    async fetchGameTypes() {
      const { data } = await this.$http.get('/game-types')
      this.gameTypes = data
    },
    async createNewGame() {
      const { selectedGameType, selectedUsers, date, moves } = this
      const users = []
      for (const { id, place } of selectedUsers) {
        users.push({ id, place })
      }

      const result = {
        gameTypeId: selectedGameType.id,
        users,
        date,
        moves
      }

      try {
        await this.$http.post(`/games`, result)
      } catch (error) {
        console.log(error)
      }
      this.fetchGames()
      this.createNewGameDialog = false
    },
    addUser() {
      const { selectedUser, place } = this

      this.selectedUsers.push({ nickname: selectedUser.nickname, place, id: selectedUser.id })
      this.place++
      this.addUserDialog = false
      this.selectedUser = null
    }
  }
}
</script>
