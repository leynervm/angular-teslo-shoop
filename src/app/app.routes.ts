import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
    // Guards
  },

  {
    path: '',
    title: 'Store Front',
    loadChildren: () => import('./store-front/store-front.routes')
  }
]
