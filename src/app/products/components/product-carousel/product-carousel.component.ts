import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild
} from '@angular/core'
import Swiper from 'swiper'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ProductImagePipe } from '@products/pipes/product-image.pipe'

@Component({
  selector: 'app-product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html'
})
export default class ProductCarouselComponent implements AfterViewInit {
  images = input<string[]>([])
  swiperDiv = viewChild.required<ElementRef>('swiperDiv')

  ngAfterViewInit (): void {
    if (!this.swiperDiv().nativeElement) return
    const element = this.swiperDiv().nativeElement

    const swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,
      modules: [Pagination, Navigation, Scrollbar],
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      scrollbar: {
        el: '.swiper-scrollbar'
      }
    })
  }
}
