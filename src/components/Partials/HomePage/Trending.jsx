/* eslint-disable no-undef */
import React,{ useEffect , useState , useRef } from 'react';

import Preloader from '../Preloader';
function Trending() {

    const [ hasMounted, setHasMounted ] = useState(false);
    const content = useRef(<Preloader />);

    useEffect(() => {

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
                console.log(rd);
                content.current = rd.data.map(tr => {
                    return (
                        <div className="col-md-4" key={ tr._id }>
                            <div class="card bg-section-dark text-white hover-translate-y-n3 hover-shadow-lg overflow-hidden">
    
                                <div class="card-body py-4">
                                    <small class="d-block text-sm mb-2">{tr.name.toUpperCase()}</small>
                                    <a href={ `c/classroom/${ tr._id }` } class="h5 stretched-link lh-150">{tr.topic}</a>
                                    <p class="mt-3 mb-0 lh-170">{tr.description}</p>
                                </div>
                                <div class="card-footer border-0 delimiter-top">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span class="avatar avatar-sm bg-success rounded-circle">NG</span>
                                            <span class="text-sm mb-0 avatar-content">{tr.location}</span>
                                        </div>
                                        <div class="col text-right text-right">
                                            <div class="actions">
                                                <a href="/heaerter" onClick={ (e) => e.preventDefault() } class="action-item"><i  class="fa fa-heart mr-1 text-danger"></i> {tr.likes.length}</a>
                                                <a href="/liker" onClick={ (e) => e.preventDefault() } class="action-item"><i  class=" fa fa-eye mr-1"></i>{tr.visits}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                setHasMounted(true);
            }).catch(err => {
                console.error(err);
            })   
        }
         
    },[ hasMounted ]);

    return (
        <div className="pt-5 pb-5 text-center">
            <div className="row text-center justify-content-center align-content-center">
                {content.current}
            </div>
        </div>
    )
}

export default Trending
