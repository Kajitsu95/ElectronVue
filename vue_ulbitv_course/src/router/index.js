import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostsView from '../views/PostsView.vue'
import EditPostView from '../views/EditPostView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostsView
  },
  {
    path: '/posts/:id',
    name: 'postid',
    component: EditPostView
  },
  //{
  //  path: '/about',
  //  name: 'about',
  //  component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
