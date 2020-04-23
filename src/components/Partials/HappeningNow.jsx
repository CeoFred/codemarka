import React,{ Suspense } from 'react'

export default function HappeningNow() {

  return (
    <div className="pt-5 pb-5 text-center">
      <div className="row text-center align-content-center">
        <Suspense fallback={'Loading...'}>

          <div className="col-4">
            <div class="card hover-shadow-lg hover-translate-y-n3">
              <div class="card-body py-5 text-center h-100">
                <div class="img-fluid mb-4 w-50 mx-auto">
                  <img src="../../assets/img/clients/svg/airbnb.svg" />
                </div>
                <span class="static-rating d-block">
                  <i className="fa fa-star"></i>
                </span>
                <h5 class="h6 mt-4 mb-1">4.95 out of 5 stars</h5>
                <p class="text-muted text-sm mb-0">
                  from 23 reviews
        </p>
              </div>
            </div>
          </div>

        </Suspense>
      </div>
    </div>
  )
}
