import Vue from 'vue'
import Router from 'vue-router'
import Paper from '@/components/Paper'
import PostsManager from '@/components/PostsManager'
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
      path: '/paper/:docID',
      name: 'Paper',
      component: Paper
    },
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/posts-manager',
      name: 'PostsManager',
      component: PostsManager
    }
  ]
})

export default router
