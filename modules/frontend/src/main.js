import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import Home from './views/Home.vue'
import Users from './views/Users.vue'
import GameTypes from './views/GameTypes.vue'
import Games from './views/Games.vue'
import Ranks from './views/Ranks.vue'
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

const routes = [
  { path: '/', component: Home },
  { path: '/users', component: Users },
  { path: '/game-types', component: GameTypes },
  { path: '/games', component: Games },
  { path: '/ranks', component: Ranks },
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
