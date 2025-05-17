import { Component, inject } from '@angular/core'
import { rxResource, toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { ProductsService } from '@products/services/products.service'
import { map } from 'rxjs'
import ProductCardComponent from '../../../products/components/product-card/product-card.component'
import PaginationComponent from '../../../shared/components/pagination/pagination.component'
import { PaginationService } from '@shared/components/pagination/pagination.service'

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html'
})
export default class GenderPageComponent {
  activatedRoute = inject(ActivatedRoute)
  productsService = inject(ProductsService)
  paginationService = inject(PaginationService)

  gender = toSignal(
    this.activatedRoute.params.pipe(map(({ gender }) => gender))
  )

  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      gender: this.gender()
    }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: request.page * 9,
        gender: request.gender
      })
    }
  })
}
