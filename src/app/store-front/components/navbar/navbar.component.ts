import { Component, inject, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export default class NavbarComponent {
  authService = inject(AuthService)
  
  routes = signal([
    {
      path: '/gender/men',
      title: 'Hombres'
    },
    {
      path: '/gender/women',
      title: 'Mujeres'
    },
    {
      path: '/gender/kid',
      title: 'Kids'
    }
  ])
}
