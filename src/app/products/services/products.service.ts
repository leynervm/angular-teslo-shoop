import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { User } from '@auth/interfaces/user.interface'
import {
  Gender,
  Product,
  ProductsResponse
} from '@products/interfaces/product.interface'
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs'
import { environment } from 'src/environments/environment'

interface Options {
  limit?: number
  offset?: number
  gender?: string
}

const baseUrl = environment.baseUrl

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient)
  private productsCache = new Map<string, ProductsResponse>()
  private productCache = new Map<string, Product>()

  getProducts (options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options
    const key = `${limit}-${offset}-${gender}`

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!)
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender
        }
      })
      .pipe(
        tap(response => console.log(response)),
        tap(res => this.productsCache.set(key, res))
      )
  }

  getProductByIdSlug (idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!)
    }
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      tap(prod => console.log(prod)),
      tap(res => this.productCache.set(idSlug, res))
    )
  }

  getProductById (idProduct: string): Observable<Product> {
    if (idProduct == 'new') {
      return of(emptyProduct)
    }

    if (this.productCache.has(idProduct)) {
      return of(this.productCache.get(idProduct)!)
    }
    return this.http.get<Product>(`${baseUrl}/products/${idProduct}`).pipe(
      tap(prod => console.log(prod)),
      tap(res => this.productCache.set(idProduct, res))
    )
  }

  // Partial : marcar todas las propiedades del Product como opcionales.
  updateProduct (
    id: string,
    product: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    const currentImages = product.images ?? []
    return this.uploadImages(imageFileList).pipe(
      map(imageNames => ({
        ...product,
        images: [...currentImages, ...imageNames]
      })),
      switchMap(updatedProduct =>
        this.http.patch<Product>(`${baseUrl}/products/${id}`, updatedProduct)
      ),
      tap(product => this.updateProductCache(product))
    )

    // return this.http
    //   .patch<Product>(`${baseUrl}/products/${id}`, product)
    //   .pipe(tap(product => this.updateProductCache(product)))
  }

  createProduct (
    product: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    const ProductLike = {
      ...product,
      images: imageFileList ?? []
    }
    return this.uploadImages(imageFileList).pipe(
      map(imageNames => ({
        ...product,
        images: [...imageNames]
      })),
      switchMap(product =>
        this.http.post<Product>(`${baseUrl}/products`, product)
      ),
      tap(product => this.updateProductCache(product))
    )
    // return this.http
    //   .post<Product>(`${baseUrl}/products`, product)
    //   .pipe(tap(product => this.updateProductCache(product)))
  }

  uploadImages (images?: FileList): Observable<string[]> {
    if (!images) return of([])
    const uploadObservables = Array.from(images).map(file =>
      this.uploadImage(file)
    )

    // Procesa un array de observables
    return forkJoin(uploadObservables).pipe(
      tap(imageNames => console.log(imageNames))
    )
  }

  uploadImage (imageFile: File): Observable<string> {
    const formData = new FormData()
    formData.append('file', imageFile)

    return this.http
      .post<{ fileName: string }>(`${baseUrl}/files/product`, formData)
      .pipe(map(res => res.fileName))
  }

  updateProductCache (product: Product) {
    const productId = product.id
    this.productCache.set(productId, product)
    this.productsCache.forEach(productsResponse => {
      productsResponse.products = productsResponse.products.map(
        currentProduct =>
          currentProduct.id == productId ? product : currentProduct
      )
    })
    // console.log('Cache updated')
  }
}
