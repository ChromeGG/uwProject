<template>
  <v-container>
    <v-layout text-center wrap theme-dark>
      <v-flex mb-4 theme-dark>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Imports
        </h1>
        <v-data-table
          :headers="headers"
          :items="imports"
          :items-per-page="10"
          class="elevation-1 my-4"
        >
          <template v-slot:item.action="{ item }">
            <v-icon small @click="deleteItem(item)">
              Delete
            </v-icon>
          </template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Do you want to delete import?</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="no">NO</v-btn>
              <v-btn color="blue darken-1" text @click="yes">YES</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-file-input
            v-model="file"
            label="File input"
            :error-messages="fileErrors"
            required
            @change="$v.file.$touch()"
            @blur="$v.file.$touch()"
          />
          <v-btn class="mr-4" @click="submit">submit</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Imports',
  mixins: [validationMixin],
  validations: {
    file: { required }
  },
  data: () => ({
    file: null,
    headers: [
      {
        align: 'left',
        sortable: true,
        value: 'name'
      },
      { text: 'ID', value: 'id' },
      { text: 'File Name', value: 'fileName' },
      { text: 'Created at', value: 'createdAt' },
      { text: 'Updated at', value: 'updatedAt' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    imports: [],
    valid: true,
    dialog: false,
    importIdToDelete: null
  }),
  computed: {
    fileErrors() {
      const errors = []
      if (!this.$v.file.$dirty) {
        return errors
      }
      !this.$v.file.checked && errors.push('You must select file to continue!')
      return errors
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await this.$http.get('/imports')
      this.imports = data
    },
    async submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const formData = new FormData()
        formData.append('name', this.file.name)
        formData.append('file', this.file)
        await this.$http.post('/imports', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        this.$v.$reset()
        this.file = null
        return this.fetchData()
      }
    },
    async deleteItem({ id }) {
      this.importIdToDelete = id
      this.dialog = true
    },
    async yes() {
      try {
        await this.$http.delete(`/imports/${this.importIdToDelete}`)
        this.importIdToDelete = null
        this.dialog = false
        this.fetchData()
      } catch (error) {
        this.importIdToDelete = null
        this.dialog = false
        console.error(error)
      }
    },
    no() {
      this.importIdToDelete = null
      this.dialog = false
    }
  }
}
</script>
