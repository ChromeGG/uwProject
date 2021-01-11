<template>
  <div class="container custom-style">
    <line-chart v-if="loaded" :chart-data="chartdata" :options="options" />
    <v-dialog v-model="displayDataFilter" width="290" persistent>
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" width="310" class="ma-3" v-on="on">
          Set Date Filter
        </v-btn>
      </template>

      <v-card>
        <v-date-picker v-model="dates" range scrollable>
          <v-spacer />
          <v-btn text color="primary" @click="displayDataFilter = false">Cancel</v-btn>
          <v-btn text color="primary" @click="filterDates(dates)">OK</v-btn>
        </v-date-picker>
      </v-card>
    </v-dialog>
    <v-btn color="secondary" width="310" class="ma-3" @click="resetDate">Clear Date Filter</v-btn>
  </div>
</template>

<script>
import LineChart from './Chart.vue'

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    options: null,
    displayDataFilter: false,
    dates: []
  }),
  async mounted() {
    this.createChart()
  },
  methods: {
    async createChart() {
      let dataset = await this.fetchReportData()

      dataset = this.completeNullDaysWithZeros(dataset)

      this.chartdata = {
        datasets: [...dataset]
      }

      this.options = {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                parser: 'YYYY-MM-DD',
                unit: 'day'
              }
            }
          ]
        },
        title: {
          display: true,
          text: 'Chart of expenses with tags'
        }
      }

      this.loaded = true
    },
    createColor: function(str) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }
      let colour = '#'
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        colour += ('00' + value.toString(16)).substr(-2)
      }
      return colour
    },
    completeNullDaysWithZeros(dataset) {
      const totalDayRange = dataset.find(x => x.label === 'total')
      const startDay = new Date(totalDayRange.data[0].x)
      const endDay = new Date(
        totalDayRange.data[totalDayRange.data.length - 1].x
      )

      for (const singleDataset of dataset) {
        const newData = []

        let loop = new Date(startDay)
        while (loop <= endDay) {
          const day = singleDataset.data.find(
            e => e.x === loop.toISOString().substring(0, 10)
          )
          if (day) {
            newData.push(day)
          } else {
            newData.push({ x: loop.toISOString().substring(0, 10), y: 0 })
          }

          const newDate = loop.setDate(loop.getDate() + 1)
          loop = new Date(newDate)
        }
        singleDataset.data = newData
      }
      return dataset
    },
    async fetchReportData() {
      try {
        const {
          data: { series }
        } = await this.$http.get('reports')

        const dataset = []

        for (const { label, data } of series) {
          for (const [index, { x, y }] of data.entries()) {
            data[index] = { x, y: Math.abs(y) }
          }

          const backgroundColor = this.createColor(label)
          dataset.push({
            label,
            fill: false,
            borderColor: backgroundColor,
            data
          })
        }
        return dataset
      } catch (error) {
        alert('Somethink goes wrong with fetch data')
      }
    },
    async filterDates(dates) {
      const dataset = await this.fetchReportData()
      dates.sort()

      this.loaded = false

      this.chartdata = {
        datasets: [...dataset]
      }

      // without this 'if' statments, if you pick only one day chart.js will add rest of days from dataset
      if (dates.length <= 2) {
        dates.push(dates[0])
      }

      this.options = {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                parser: 'YYYY-MM-DD',
                unit: 'day'
              },
              ticks: {
                min: dates[0],
                max: dates[1]
              }
            }
          ]
        },
        title: {
          display: true,
          text: 'Chart of expenses with tags'
        }
      }

      this.loaded = true
      this.displayDataFilter = false
    },
    resetDate() {
      this.dates = []
      this.createChart()
    }
  }
}
</script>

<style scoped>
.custom-style {
  width: 45vw;
}
</style>
