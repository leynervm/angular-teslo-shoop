import { Routes } from '@angular/router'
import AdminDashboardLayoutComponent from './layouts/admin-dashboard-layout/admin-dashboard-layout.component'

const adminDashboardRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () =>
      import(
        './layouts/admin-dashboard-layout/admin-dashboard-layout.component'
      ),
    children: [
      {
        path: 'products',
        title: 'Administrar Productos',
        loadComponent: () =>
          import('./pages/products-admin-page/products-admin-page.component')
      },
      {
        path: 'products/:id',
        title: 'Ver Producto',
        loadComponent: () =>
          import('./pages/product-admin-page/product-admin-page.component')
      },
      {
        path: '**',
        redirectTo: 'products'
      }
    ]
  }
]

export default adminDashboardRoutes
