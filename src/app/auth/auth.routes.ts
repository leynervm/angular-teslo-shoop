import { Routes } from '@angular/router'

const authRoutes: Routes = [
  {
    path: '',
    title: 'Iniciar Sesión',
    loadComponent: () => import('./layout/auth-layout/auth-layout.component'),
    children: [
      {
        path: 'login',
        title: 'Iniciar Sesión',
        loadComponent: () => import('./pages/login-page/login-page.component')
      },
      {
        path: 'register',
        title: 'Registrarse',
        loadComponent: () =>
          import('./pages/register-page/register-page.component')
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
]

export default authRoutes
