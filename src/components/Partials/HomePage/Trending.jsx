/* eslint-disable no-undef */
import React, { useState, useRef, Suspense } from 'react'

import Preloader from '../Preloader';
function Trending() {

    const [ hasMounted, setHasMounted ] = useState(false);
    const content = useRef('');
    function truncateString(str, num) {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }
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
                        <div className="col-md-3" style={{maxHeight: '300px'}} key={ tr.kid }>
                            <div style={{maxHeight:'100%',height:'100%'}} className="card bg-section-dark text-white hover-translate-y-n3 hover-shadow-lg overflow-hidden">
                                <a  
                                        href={ `c/classroom/${ tr.room_kid }` }
                                        style={{height:'100%'}}
                                >
                                <div className="card-body py-4" style={{height:'70%'}}>
                                    <img src={tr.img} className="avatar  rounded-circle" alt={rd.name}/>
                                    <small className="d-block text-sm mb-2">
                                            {truncateString(tr.name.toUpperCase(),20)} {' '}
                                    </small>
                                    <b
                                        className="h5 stretched-link lh-150" style={{fontSize:'0.78rem'}}>
                                            {truncateString(tr.topic,20)}
                                    </b>
                    <div>@{tr.owner}</div>
                                        <p className={{marginTop:'1rem'}}>{truncateString(tr.description.toLowerCase(),40)}</p>
                                </div>
                                <div className="card-footer border-0 delimiter-top" style={{height:'30%'}}>
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <span className="avatar avatar-sm bg-success rounded-circle">
                                                {tr.location}
                                            </span>
                                                <span className="text-sm mb-0 avatar-content" style={{ color: '#fff' }}>
                                                    <i style={{ color:'#2dca8c'}} className="fas fa-users"></i>{' '}
                                                {tr.students}
                                            </span>
                                        </div>
                                        <div className="col text-right text-right">
                                            <div className="actions">
                                                <a
                                                    href="/heartee#"
                                                    onClick={ e =>
                                                        e.preventDefault()
                                                    }
                                                    className="action-item">
                                                    <i className="fa fa-heart mr-1 text-danger"></i>{' '}
                                                    {tr.likes}
                                                </a>
                                                <a
                                                    href="/likee#"
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
                                </a>
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
            <div className="row text-center align-content-center">
                <Suspense fallback={ <Preloader /> }>
                    {content.current}
                </Suspense>
            </div>
        </div>
    )
}

export default Trending
