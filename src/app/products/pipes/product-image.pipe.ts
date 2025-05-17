import { Pipe, PipeTransform } from '@angular/core'
import { environment } from 'src/environments/environment'

@Pipe({ name: 'productImage' })
export class ProductImagePipe implements PipeTransform {
  transform (value: string | string[]): any {
    switch (typeof value) {
      case 'string':
        return `${environment.baseUrl}/files/product/${value}`
      case 'object':
        return `${environment.baseUrl}/files/product/${value[0]}`
      default:
        return `http://localhost:3000/assets/images/no-image.png`
    }
  }
}
