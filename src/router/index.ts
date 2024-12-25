import { createRouter, createWebHistory } from 'vue-router'
import UserView from '@/views/User/UserView.vue'
import TodoView from '@/views/Todos/TodosView.vue'
import PostsView from '@/views/Posts/PostsView.vue'
import AlbumsView from '@/views/Albums/AlbumsView.vue'

const routes = [
  {
    path: '/',
    name: 'UserView',
    component: UserView,
  },
  {
    path: '/todos/:userId',
    name: 'TodoView',
    component: TodoView,
  },
  {
    path: '/posts/:userId',
    name: 'PostView',
    component: PostsView,
  },
  {
    path: '/albums/:userId',
    name: 'AlbumView',
    component: AlbumsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
