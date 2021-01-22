<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" class="mb-2" @click="createNewUserDialog = true">
          Stwórz nowego gracza
        </v-btn>
        <v-dialog v-model="createNewUserDialog" max-width="520">
          <v-card>
            <v-card-title>
              Stwórz nowego gracza
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  v-model.trim="newUserNickname"
                  label="Nazwa"
                  counter="30"
                  filled
                  clearable
                  :rules="[
                    (v) => !!v || 'Nazwa jest wymagana',
                    (v) => !(v && v.length < 3) || 'Nazwa musi mieć przynajmniej 3 znaki',
                    (v) => !(v && v.length > 30) || 'Nazwa nie może mieć więcej niż 30 znaków',
                  ]"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="createNewUserDialog = false">
                Anuluj
              </v-btn>
              <v-btn color="primary" :disabled="!valid" @click="createNewUser()">
                Stwórz
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="users" />
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
          value: 'nickname'
        },
        { text: 'Stworzono', value: 'createdAt' }
      ],
      users: [],
      createNewUserDialog: false,
      newUserNickname: null,
      valid: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await this.$http.get('/users')
      this.users = data
    },
    async createNewUser() {
      const nickname = this.newUserNickname
      try {
        await this.$http.post(`/users`, { nickname })
      } catch (error) {
        console.log(error)
      }
      this.fetchData()
      this.createNewUserDialog = false
    }
  }
}
</script>
