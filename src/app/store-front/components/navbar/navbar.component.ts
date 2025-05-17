import { Component, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export default class NavbarComponent {
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
