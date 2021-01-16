import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import Home from './components/Home.vue'
import Imports from './components/Imports.vue'
import Expenses from './components/Expenses.vue'
import Users from './components/Users.vue'
import Reports from './components/Reports.vue'
import { format } from 'date-fns'

Vue.use(VueRouter)

Vue.config.productionTip = false

const myTransformResponse = (data) => {
  if (data.length) {
    data.map(x => {
      if (x.createdAt || x.updatedAt) {
        x.createdAt = format(new Date(x.createdAt), 'dd-MM-yyyy hh:mm')
        x.updatedAt = format(new Date(x.updatedAt), 'dd-MM-yyyy hh:mm')
      }
    })
  }
  return data
}

Vue.prototype.$http = Axios.create({
  baseURL: 'http://localhost:3000',
  transformResponse: [].concat(Axios.defaults.transformResponse, myTransformResponse)
})

Vue.filter('parseCurrency', function(value) {
  if (value) {
    return parseFloat(value).toFixed(2)
  }
})

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return format(new Date(value), 'dd-MM-yyyy hh:mm')
  }
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return format(new Date(value), 'dd-MM-yyyy')
  }
})

const routes = [
  { path: '/', component: Home },
  { path: '/imports', component: Imports },
  { path: '/expenses', component: Expenses },
  { path: '/users', component: Users },
  { path: '/reports', component: Reports },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
