import React, { useEffect, useState, useRef } from 'react'
import * as APIURL from '../../config/api_url';


export default function FetchCommunities() {
  const [state, setstate] = useState({ fetched: false, results: null });
  const content = useRef('');
  
  const returnStars = (stars) => {
    if(stars === 0) return;
    for (let index = 0; index <= stars; index++) {
      return (
        <i className="fa fa-star" style={{color:'yellow'}}></i>
      )
    }
    let remaining = 5 - stars;
    for (let index = 0; index <= remaining; index++) {
      return (
        <i className="fa fa-star"></i>
      )
    }
  }

  useEffect(() => {
    if (!state.fetched) {

      const url = APIURL.GET_COMMUNITIES;

      const request = new Request(url, {
        method: 'GET',
        cache: 'default',
        mode: 'cors'
      });

      fetch(request).then(data => data.json()).then(d => {
        if (d.data) {
          content.current = d.data.map((comm) => {
            return (
              <div className="col-md-4 col-12">
                <div class="card hover-shadow-lg hover-translate-y-n3">
                  <div class="card-body py-5 text-center h-100">
                    <div class="img-fluid mb-4 w-50 mx-auto">
                      <img src={comm.logo} alt={`${comm.name}`} />
                    </div>
            <p className="font-weight-bold">{comm.name}</p>({comm.acronym})
                    <span class="static-rating d-block">
                        {returnStars(comm.rating)}
                    </span>
                    <h5 class="h6 mt-4 mb-1">{comm.rating} out of 5 stars</h5>
                    <p class="text-muted text-sm mb-0">
                      from {comm.reviews.length} reviews
                    </p>
                    <div>
                      <button className="btn btn-info">View</button>
                      <button className="btn btn-info">Join</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          });
          setstate({ fetched: true, results: d.data });

        }
      }).catch((err) => {
        setstate({ fetched: true, results: [] });
      });

    }
  })


  return (
    <div className="pt-5 pb-5 text-center">
      <div className="row text-center align-content-center">
        {content.current}
      </div>
    </div>

  )
}
