/* eslint-disable no-undef */
import React, { useState, useRef, Suspense } from 'react'

import Preloader from '../Preloader';
function Trending() {

    const [ hasMounted, setHasMounted ] = useState(false);
    const content = useRef('');

        if(!hasMounted){
            
            const fetchTrending = () => {
                const host = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL

                const url = `${ host }classroom/trending/`;
                const myHeaders = new Headers()
                myHeaders.append('Content-Type', 'Application/json')
            
                const fetchTrendingClassroomsRequest =  new Request(url, {
                    method: 'GET',
                    cache: 'default',
                    headers: myHeaders,
                    mode: 'cors'
                });
            
               return fetch(fetchTrendingClassroomsRequest)
            }
            fetchTrending().then(d => d.json()).then(rd => {
                content.current = rd.data.map(tr => {
                    return (
                        <div className="col-md-4" key={ tr._id }>
                            <div className="card bg-section-dark text-white hover-translate-y-n3 hover-shadow-lg overflow-hidden">
                                <div className="card-body py-4">
                                    <small className="d-block text-sm mb-2">
                                        {tr.name.toUpperCase()} {' '}
                                      (
                                        {tr.classVisibility === 'Public' ? (
                                            <i className="fa fa-unlock"></i>
                                        ) : (
                                            <i className="fa fa-lock"></i>
                                        )}
                                        )
                                    </small>
                                    <a
                                        href={ `c/classroom/${ tr.Kid }` }
                                        className="h5 stretched-link lh-150">
                                        {tr.topic}
                                    </a>
                                    <p className="mt-3 mb-0 lh-170">
                                        {tr.description}
                                    </p>
                                </div>
                                <div className="card-footer border-0 delimiter-top">
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <span className="avatar avatar-sm bg-success rounded-circle">
                                                {tr.location}
                                            </span>
                                            <span className="text-sm mb-0 avatar-content">
                                                <i className="fas fa-users"></i>{' '}
                                                {tr.students.length}
                                            </span>
                                        </div>
                                        <div className="col text-right text-right">
                                            <div className="actions">
                                                <a
                                                    href="/heaerter"
                                                    onClick={ e =>
                                                        e.preventDefault()
                                                    }
                                                    className="action-item">
                                                    <i className="fa fa-heart mr-1 text-danger"></i>{' '}
                                                    {tr.likes.length}
                                                </a>
                                                <a
                                                    href="/liker"
                                                    onClick={ e =>
                                                        e.preventDefault()
                                                    }
                                                    className="action-item">
                                                    <i className=" fa fa-eye mr-1"></i>
                                                    {tr.visits}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                setHasMounted(true);
            }).catch(err => {
                console.error(err);
            })   
        }

    return (
        <div className="pt-5 pb-5 text-center">
            <div className="row text-center justify-content-center align-content-center">
                <Suspense fallback={ <Preloader /> }>
                    {content.current}
                </Suspense>
            </div>
        </div>
    )
}

export default Trending
