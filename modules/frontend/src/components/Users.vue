<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Create user btn -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="users"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Tags',
  data() {
    return {
      headers: [
        {
          text: 'ID', value: 'id'
        },
        {
          text: 'Nazwa', value: 'nickname'
        },
        { text: 'Stworzono', value: 'createdAt' },
        { text: 'Zaktualizowano', value: 'updatedAt' }
      ],
      users: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await this.$http.get('/users')
      // a
      this.users = data
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
