import { Component, effect, inject } from '@angular/core'
import { rxResource, toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductsService } from '@products/services/products.service'
import { map } from 'rxjs'
import ProductDetailComponent from '../products-admin-page/product-detail/product-detail.component'

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailComponent],
  templateUrl: './product-admin-page.component.html'
})
export default class ProductAdminPageComponent {
  productService = inject(ProductsService)
  router = inject(Router)
  ActivatedRoute = inject(ActivatedRoute)
  productId = toSignal(
    this.ActivatedRoute.params.pipe(map(params => params['id']))
  )

  productResource = rxResource({
    request: () => ({ id: this.productId() }),
    loader: ({ request }) => {
      return this.productService.getProductById(request.id)
    }
  })

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products'])
    }
  })
}
