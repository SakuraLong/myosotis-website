import { createRouter, createWebHistory } from 'vue-router'
import Douc from '@/views/Docu'
import Edit from '@/views/Edit'
import Home from '@/views/Home'
import Intr from '@/views/Intr'

import Document from '@/Document'
import documents from './documents'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/docu',
    name: 'docu',
    component: Douc,
    redirect: '/docu/docu',
    children: documents.documents
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/intr',
    name: 'intr',
    component: Intr
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  model: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
