import React, { useEffect, useState, useRef } from 'react'
import * as APIURL from '../../config/api_url';
import { formatToTimeZone } from 'date-fns-timezone';


export default function FetchUpcomingClass() {
  const [state, setstate] = useState({ fetched: false, results: null });
  const content = useRef('Loading...');

  useEffect(() => {
    if (!state.fetched) {

      const url = APIURL.GET_UPCOMING_CLASSRROM_SESSIONS;

      const request = new Request(url, {
        method: 'GET',
        cache: 'default',
        mode: 'cors'
      });

      fetch(request).then(data => data.json()).then(d => {
        if (d.data) {
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const getDateandTime = (time,date) => {
            const Mdate = new Date(date)
            const dtime = formatToTimeZone(Mdate, 'D.M.YYYY', { timeZone });
            return `${dtime} ${time}`;
          }
          content.current = d.data.map((comm) => {
            return (
              <div className="col-md-3 col-12" key={comm.kid}>
                <div className="card bg-dark hover-shadow-lg hover-translate-y-n3">
                  <div className="card-body py-5 text-center h-100">
                    <div className="mt-1 pt-3 delimiter-top">
                      <div className="actions">
                        <a href="#!" className="action-item mr-1">
                          <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight:'0.5rem'}} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                          {comm.topic}
                        </a>

                        <br/>
                        <a href="#!" className="action-item mr-1">
                          <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight:'0.5rem'}} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-at-sign"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
                          {comm.name}
                        </a>

                        <br />
                        <a href="#!" className="action-item mr-1">
                          <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight:'0.5rem'}} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          {comm.by}
                        </a>

                        <br />
                        <a href="#!">
                          <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight:'0.5rem'}} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          {getDateandTime(comm.time, comm.date)}
                        </a>
                        </div>
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
    <div className="pt-5 pb-5">
      <div className="row align-content-center">
        {content.current}
      </div>
    </div>

  )
}
