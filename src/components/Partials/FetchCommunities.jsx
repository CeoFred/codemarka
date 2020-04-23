import React,{ Suspense } from 'react'
import img from '../../media/images/man-wearing-white-long-sleeved-shirt-holding-black-pen-3182781.jpg'
export default function FetchCommunities() {
  return (
    <div className="pt-5 pb-5 text-center">
      <div className="row text-center justify-content-center align-content-center">
        <Suspense fallback={'loading...'}>
          <div class="swiper-js-container">
            <div class="swiper-container" data-swiper-items="1" data-swiper-sm-items="2" data-swiper-xl-items="3" data-swiper-space-between="20" data-swiper-sm-space-between="20" data-swiper-xl-space-between="20" data-swiper-pagination-type="progressbar">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img alt="Image placeholder" src={img} class="img-fluid rounded"/>

            </div>
                  <div class="swiper-slide">
                    <img alt="Image placeholder" src={img} class="img-fluid rounded"/>

            </div>
                    <div class="swiper-slide">
                      <img alt="Image placeholder" src={img} class="img-fluid rounded"/>

            </div>
                      <div class="swiper-slide">
                        <img alt="Image placeholder" src={img} class="img-fluid rounded"/>

            </div>
                      </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
                      <div class="swiper-button-prev"></div>
                    </div>
                  </div>
        </Suspense>
      </div>
    </div>

  )
}
