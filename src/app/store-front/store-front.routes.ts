import { Routes } from '@angular/router'
import StoreFrontLayoutComponent from './layout/store-front-layout/store-front-layout.component'

const StoreFrontRoutes: Routes = [
  {
    path: '',
    // title: 'Store Front',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: '',
        title: 'Home',
        loadComponent: () => import('./pages/home-page/home-page.component')
      },
      {
        path: 'gender/:gender',
        title: 'Genero',
        loadComponent: () => import('./pages/gender-page/gender-page.component')
      },
      {
        path: 'product/:idSlug',
        title: 'Producto',
        loadComponent: () =>
          import('./pages/product-page/product-page.component')
      },
      {
        path: '**',
        title: '404',
        loadComponent: () =>
          import('./pages/not-found-page/not-found-page.component')
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
    // pathMatch: 'full'
  }
]

export default StoreFrontRoutes
