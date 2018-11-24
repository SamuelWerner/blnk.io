import Vue from 'vue'
import Router from 'vue-router'
import Paper from '@/components/Paper'
import Start from '@/components/Start'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(Router)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/paper/:hash',
      name: 'Paper',
      component: Paper
    },
    {
      path: '/',
      name: 'Start',
      component: Start
    }
  ]
})

export default router
