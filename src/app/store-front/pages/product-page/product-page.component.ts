import { Component, inject, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { ProductsService } from '@products/services/products.service'
import ProductCarouselComponent from '../../../products/components/product-carousel/product-carousel.component'

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html'
})
export default class ProductPageComponent {
  productsService = inject(ProductsService)
  activatedRoute = inject(ActivatedRoute)
  idSlug = this.activatedRoute.snapshot.params['idSlug']

  productResource = rxResource({
    request: () => ({ idSlug: this.idSlug }),
    loader: ({ request }) => {
      return this.productsService.getProductByIdSlug(request.idSlug)
    }
  })
}
