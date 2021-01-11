<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            class="ma-2"
            style="width: 350px"
            color="indigo darken-3"
            :placeholder="placeholder"
            :single-line="true"
            :filled="true"
            :clearable="true"
            :flat="true"
            :dense="true"
          />
        </v-col>
        <v-col>
          <div class="d-flex flex-row-reverse">
            <v-btn
              color="secondary"
              width="310"
              class="ma-2"
              @click.stop="createTag = true"
            >Create new Tag</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-dialog v-model="editTag" max-width="600">
        <v-card>
          <v-card-title class="headline">Tag Editor</v-card-title>
          <v-text-field
            v-model="newTagName"
            class="mx-3"
            color="indigo darken-3"
            label="Name"
            required
          />

          <v-card-actions>
            <v-btn
              color="secondary"
              outlined
              @click="
                editTag = false
                tagToChange = []
              "
            >
              Cancel
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              :disabled="!newTagName"
              @click="changeTag(tagToChange, newTagName)"
            >Change</v-btn>
          </v-card-actions>
          <v-alert
            :value="tagNameAlert"
            transition="v-expand-transition"
            class="ma-0"
            dense
            border="left"
            type="warning"
          >
            Tag with that name already exist
          </v-alert>
        </v-card>
      </v-dialog>

      <v-dialog v-model="tagDelete" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure you want to delete that tag?</v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="
                tagDel(tagToDel)
                tagDelete = false
              "
            >Yes</v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="
                tagToDel = []
                tagDelete = false
              "
            >No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="createTag" max-width="600">
        <v-card>
          <v-card-title class="headline">Tag Creator</v-card-title>
          <v-text-field
            v-model="tagName"
            class="mx-3"
            color="indigo darken-3"
            label="Name"
            required
          />
          <v-card-actions>
            <v-btn color="secondary" outlined @click="createTag = false">
              Cancel
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              :disabled="!tagName"
              @click="addTag(tagName)"
            >Add</v-btn>
          </v-card-actions>
          <v-alert
            v-model="tagAddAlert"
            transition="v-expand-transition"
            class="ma-0"
            dense
            border="left"
            type="warning"
          >
            Tag with that name already exist
          </v-alert>
        </v-card>
      </v-dialog>

      <v-simple-table class="elevation-1">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Name</th>
              <th class="text-left">Created at</th>
              <th class="text-left">Updated at</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="tag in tags" :key="tag.id">
              <td>{{ tag.id }}</td>
              <td>{{ tag.name }}</td>
              <td>{{ tag.createdAt | formatDateTime }}</td>
              <td>{{ tag.updatedAt | formatDateTime }}</td>
              <td style="width: 15%">
                <v-btn
                  color="secondary"
                  outlined
                  class="mx-1"
                  @click="
                    newTagName = tag.name
                    tagToChange = tag.id
                    editTag = true
                  "
                >Edit</v-btn>
                <v-btn
                  color="secondary"
                  outlined
                  class="mx-1"
                  @click="
                    tagToDel = tag.id
                    tagDelete = true
                  "
                >Delete</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="text-center">
        <v-pagination
          v-model="pagination"
          class="ma-2"
          :length="pages"
          :next="fetchData()"
        />
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Tags',
  data: () => ({
    tags: [
      { text: 'ID', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Created at', value: 'createdAt' },
      { text: 'Updated at', value: 'updatedAt' }
    ],
    search: '',
    placeholder: 'Search',
    pagination: 1,
    pages: 1,
    perPage: 10,
    data: 0,
    confirmation: false,
    createTag: false,
    tagDelete: false,
    editTag: false,
    tagToDel: [],
    tagToChange: [],
    tagName: '',
    newTagName: '',
    tagNameAlert: false,
    tagAddAlert: false
  }),
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const params = {
        page: this.pagination - 1,
        perPage: this.perPage
      }

      if (this.search !== '') {
        params.query = this.search
      }

      const { data } = await this.$http.get(`/tags`, {
        params
      })
      this.pages = Math.ceil(data.total / this.perPage)
      this.tags = data.results
    },
    async addTag(tagName) {
      const name = tagName
      try {
        await this.$http.post(`/tags`, { name })
        this.createTag = false
      } catch (error) {
        // @TODO: Forward backend errors -> error.response
        this.tagAddAlert = true
        setTimeout(() => {
          this.tagAddAlert = false
        }, 3000)
      }
      this.tagName = ''
      this.fetchData()
    },
    async tagDel(tagId) {
      await this.$http.delete(`/tags/${tagId}`)
      this.fetchData()
    },
    async changeTag(tagId, newTagName) {
      try {
        await this.$http.patch(`/tags/${tagId}`, {
          name: `${newTagName}`
        })
        newTagName = ''
        this.editTag = false
        this.fetchData()
      } catch (error) {
        this.tagNameAlert = true
        setTimeout(() => {
          this.tagNameAlert = false
        }, 3000)
      }
    }
  }
}
</script>
