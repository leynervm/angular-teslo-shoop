import { Component, inject, signal } from '@angular/core'
import ProductTableComponent from '../../../products/components/product-table/product-table.component'
import { ProductsService } from '@products/services/products.service'
import { rxResource } from '@angular/core/rxjs-interop'
import { DecimalPipe, JsonPipe } from '@angular/common'
import { PaginationService } from '@shared/components/pagination/pagination.service'
import PaginationComponent from '../../../shared/components/pagination/pagination.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-products-admin-page',
  imports: [
    ProductTableComponent,
    PaginationComponent,
    RouterLink
  ],
  templateUrl: './products-admin-page.component.html'
})
export default class ProductsAdminPageComponent {
  productService = inject(ProductsService)
  paginationService = inject(PaginationService)
  limit = signal<number>(10)

  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.limit()
    }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        offset: request.page * request.limit,
        limit: request.limit
      })
    }
  })
}
