<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Expenses</h1>

        <v-card class="mb-3">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Tag</th>
                  <th class="text-left">Amount</th>
                </tr>
              </thead>
              <tbody v-for="[name, value] in tagsTotals" :key="name">
                <tr>
                  <th>{{ name }}</th>
                  <th>{{ value | parseCurrency }} PLN</th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>Total</th>
                  <th>{{ tagsTotal | parseCurrency }} PLN</th>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>

        <v-card>
          <v-btn color="secondary" width="310" class="ma-3" @click="del">Delete selected Expenses</v-btn>
          <v-dialog v-model="syncTags" width="500" persistent>
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" width="310" class="ma-3" v-on="on">Edit Selected Tags</v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Change Tags</v-card-title>

              <v-divider />
              <v-select
                v-model="selectedTagIds"
                :items="tags.results"
                solo
                chips
                multiple
                label="Select tags"
                class="ma-2"
                item-key="id"
                item-value="id"
                item-text="name"
              />

              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click="syncTags = false">Cancel</v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="
                    syncTags = false
                    syncExpensesWithTags(selectedTagIds)
                  "
                >Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="modal" width="290" persistent>
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" width="310" class="ma-3" v-on="on">Set Date Filter</v-btn>
            </template>

            <v-card>
              <v-date-picker v-model="dates" range scrollable>
                <v-spacer />
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="filterDates(dates)">OK</v-btn>
              </v-date-picker>
            </v-card>
          </v-dialog>

          <v-btn color="secondary" width="310" class="ma-3" @click="resetDate">Clear Date Filter</v-btn>

          <v-dialog v-model="filterByTags" width="500" persistent>
            <template v-slot:activator="{ on }">
              <v-btn @click="
                filteredTags = []
                updateTagFilter()"
              >RESET</v-btn>
              <v-btn color="secondary" width="310" class="ma-3" v-on="on">Filter by tags</v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Pick tags, You would like to filter by</v-card-title>
              <v-container class="pl-5" :style="{display: 'inline-flex', alignItems:'center'}">
                <v-switch v-model="preciseFiltering" :label="`Precise mode: ${preciseFiltering ? 'ON' : 'OFF'}`"/>
                <v-tooltip top max-width="500">
                  <template v-slot:activator="{ on }">
                    <v-icon class="ml-auto pr-3" v-on="on" >mdi-help-circle-outline</v-icon>
                  </template>
                  <span>Toggle this option to filter Your data in more controlled manner. When switch is ON, only expenses with exactly the same tags will show up. Otherwise, when toggled OFF, the result will be, expenses containing at least one filtered tag.</span>
                </v-tooltip>
              </v-container>
              <v-divider />
              <v-select
                v-model="filteredTags"
                :items="tags.results"
                solo
                chips
                multiple
                label="Select tags"
                class="ma-2"
                item-key="id"
                item-value="id"
                item-text="name"
              />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  text
                  @click="
                    filterByTags = false
                    filteredTags = []
                  "
                >Cancel</v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="
                    updateTagFilter()
                    filterByTags = false
                  "
                >Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="editRow" max-width="600">
            <v-card>
              <v-card-title class="headline">Tag Editor</v-card-title>
              <v-select
                v-model="selectedTagIds"
                :items="tags.results"
                chips
                multiple
                label="Select tags"
                class="ma-2"
                item-key="id"
                item-value="id"
                item-text="name"
              />

              <v-card-actions>
                <v-btn
                  color="secondary"
                  outlined
                  @click="
                    editRow = false
                    selectedTagIds = []
                  "
                >Cancel</v-btn>
                <v-btn
                  color="secondary"
                  outlined
                  @click="
                    saveOne(rowId, selectedTagIds)
                    editRow = false
                  "
                >Change</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="filteredExpenses.length ? filteredExpenses : expenses"
            :items-per-page="15"
            class="elevation-1"
            item-key="id"
            show-select
          >
            <template v-slot:item.date="{ item }">{{ item.date | formatDate }}</template>
            <template v-slot:item.createdAt="{ item }">{{ item.createdAt | formatDateTime }}</template>
            <template v-slot:item.updatedAt="{ item }">{{ item.updatedAt | formatDateTime }}</template>

            <template v-slot:item.description="props">
              <v-edit-dialog
                :return-value.sync="props.item.description"
                persistent
                large
                @save="editDescription(props.item.id, descriptionToSet)"
                @cancel="cancelEditDescription()"
              >
                {{ props.item.description }}
                <template v-slot:input>
                  <v-text-field v-model="descriptionToSet" :rules="[max30chars]" label="Edit Description" single-line counter />
                </template>
              </v-edit-dialog>
            </template>

            <template v-slot:item.tags="{ item }">
              <div v-for="tag in item.tags" :key="tag.id">{{ tag.name }}</div>
            </template>
            <template v-slot:item.edit="{ item }">
              <v-btn
                text
                @click="
                  editRow = true
                  selectedTagIds = item.tags.id
                  rowId = item.id
                  setUsedTags()
                "
              >Edit</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { isWithinInterval } from 'date-fns'
// import { groupBy } from 'ramda'
export default {
  name: 'Expenses',
  data: () => ({
    headers: [
      {
        align: 'left',
        sortable: true,
        value: 'name'
      },
      { text: 'ID', value: 'id' },
      { text: 'Import Id', value: 'importId' },
      {
        text: 'Date',
        value: 'date'
      },
      { text: 'Operation', value: 'operation' },
      { text: 'Description', value: 'description' },
      { text: 'Details', value: 'details' },
      { text: 'Value', value: 'value' },
      { text: 'Tags', value: 'tags' },
      { text: 'Created at', value: 'createdAt' },
      { text: 'Updated at', value: 'updatedAt' },
      {
        sortable: false,
        value: 'edit'
      }
    ],
    tags: [],
    selectedTagIds: [],
    expenses: [],
    selected: [],
    dates: [],
    descriptionToSet: '',
    tagsTotal: 0,
    tagsTotals: [],
    rowId: [],
    modal: '',
    filterByTags: false,
    filteredTags: [],
    filteredExpenses: [],
    preciseFiltering: false,
    tag1: '',
    tag2: '',
    statement: '',
    singleSelect: true,
    alert: false,
    closeOnContentClick: false,
    syncTags: false,
    max30chars: v => v.length <= 30 || 'Input too long!',
    editRow: false
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const [{ data: expenses }, { data: tags }] = await Promise.all([
        this.$http.get('/expenses'),
        this.$http.get('/tags', { params: { perPage: 100 } }) // @TODO: Hardcoded for now
      ])
      this.tags = tags
      this.expenses = expenses
      this.calculateTagSum()
    },
    async del() {
      const promisesDel = this.selected.map(({ id }) =>
        this.$http.delete(`/expenses/${id}`)
      )
      await Promise.all(promisesDel)
      this.fetchData()
    },
    async syncExpensesWithTags(selectedTagIds) {
      const tagIds = Array.from(selectedTagIds)
      const promisesPatch = this.selected.map(({ id }) =>
        this.$http.put(`/expenses/${id}/tags`, { tagIds })
      )
      await Promise.all(promisesPatch)
      this.selectedTagIds = []
      this.fetchData()
    },
    cancelEditDescription() {
      this.descriptionToSet = ''
    },
    async editDescription(expenseId, description) {
      await this.$http.patch(`/expenses/${expenseId}`, {
        description
      })
      this.descriptionToSet = ''
      this.fetchData()
    },
    async saveOne(id, tags) {
      let tagIds = []
      if (tags && tags.length > 0) {
        tagIds = tags
      }
      await this.$http.put(`/expenses/${id}/tags`, { tagIds })
      this.selectedTagIds = []
      this.fetchData()
    },
    calculateTagSum() {
      let total = 0
      const tagsTotals = {}

      for (const expense of this.expenses) {
        total = total + expense.value
        for (const tag of expense.tags) {
          if (tagsTotals[tag.name] === undefined) {
            tagsTotals[tag.name] = expense.value
          } else {
            tagsTotals[tag.name] = tagsTotals[tag.name] + expense.value
          }
        }
      }
      this.tagsTotal = total
      this.tagsTotals = Object.entries(tagsTotals)
    },
    async filterDates(dates) {
      await this.fetchData()
      const sortedDates = dates.sort()
      if (sortedDates.length === 1) {
        sortedDates.push(sortedDates[0])
      }
      this.expenses = this.expenses.filter(({ date }) => {
        return isWithinInterval(new Date(date), {
          start: new Date(sortedDates[0]),
          end: new Date(sortedDates[1])
        })
      })
      this.modal = false
    },
    resetDate() {
      this.dates = []
      this.fetchData()
    },
    setUsedTags() {
      const expenseWithRowId = item => item.id === this.rowId
      const matchingExpense =
        this.rowId.length || this.expenses.find(expenseWithRowId)
      const rowExpenseTagIds = matchingExpense
        ? matchingExpense.tags.map(tag => tag.id)
        : []

      this.selectedTagIds = rowExpenseTagIds
    },
    updateTagFilter() {
      const filteredExpenses = this.expenses.filter(item => {
        const itemTagsIds = item.tags.map(tag => tag.id)
        const searchedTags = this.filteredTags.sort()
        const isInFilteredTags = itemId =>
          itemId && searchedTags.includes(itemId)
        if (itemTagsIds.length) {
          if (this.preciseFiltering) {
            const currentItemArray = itemTagsIds
            const searchedTagsArray = searchedTags
            const areLengthsEqual =
              currentItemArray.length === searchedTagsArray.length
            const areValuesEqual = currentItemArray.every(
              (val, index) => val === searchedTagsArray[index]
            )
            return areLengthsEqual && areValuesEqual
          }
          return itemTagsIds.some(isInFilteredTags)
        }
        return false
      })
      this.filteredExpenses = filteredExpenses
    }
  }
}
</script>
