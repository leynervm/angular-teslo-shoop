import { Pipe, PipeTransform } from '@angular/core'
import { environment } from 'src/environments/environment'

const host = environment.host
const baseUrl = environment.baseUrl

@Pipe({ name: 'productImage' })
export class ProductImagePipe implements PipeTransform {
  transform (value: null | string | string[]): any {
    if (value == null || value.length == 0) {
      return `${host}/assets/images/no-image.jpg`
    }

    if (typeof value == 'string' && value.startsWith('blob:')) {
      return value
    }

    switch (typeof value) {
      case 'string':
        return `${baseUrl}/files/product/${value}`
      case 'object':
        return `${baseUrl}/files/product/${value?.at(0)}`
      default:
        return `${host}/assets/images/no-image.jpg`
    }
  }
}
