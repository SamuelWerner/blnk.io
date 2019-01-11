import Vue from 'vue'
import Router from 'vue-router'
import Paper from '@/components/Paper'
import Start from '@/components/Start'
import Impressum from '@/components/Impressum'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

Vue.use(Router)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
// Vue.use(Vuetify)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/paper/:hash',
      name: 'Paper',
      component: Paper
    },
    {
      path: '/paper/',
      name: 'Start',
      component: Start
    },
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/impress',
      name: 'Impressum',
      component: Impressum
    }
  ]
})

export default router
