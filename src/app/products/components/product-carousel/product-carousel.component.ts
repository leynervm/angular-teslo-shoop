import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
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
export default class ProductCarouselComponent
  implements AfterViewInit, OnChanges
{
  images = input<string[]>([])
  swiperDiv = viewChild.required<ElementRef>('swiperDiv')
  swiper: Swiper | undefined = undefined

  ngOnChanges (changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return
    }
    console.log('change')
    if (!this.swiper) return

    this.swiper.destroy(true, true)

    const paginationEl: HTMLDivElement =
      this.swiperDiv().nativeElement?.querySelector('.swiper-pagination')
    paginationEl.innerHTML = ''
    setTimeout(() => this.swiperInit(), 100)
  }

  ngAfterViewInit (): void {
    this.swiperInit()
  }

  swiperInit () {
    if (!this.swiperDiv().nativeElement) return
    const element = this.swiperDiv().nativeElement

    this.swiper = new Swiper(element, {
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
