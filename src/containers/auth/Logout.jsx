import React,{useEffect, useRef} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Redirect} from 'react-router-dom';

import * as actions from '../../redux/actions/Types'
import * as url from '../../config/url';
 


export default function Logout() {
    const dispatch = useDispatch()
    const {auth} = useSelector(state => state)
    let content= 'Redirecting please wait ....'
    const ref = useRef(content)

    useEffect(() => {
        if(auth.token)dispatch({type:actions.AUTH_LOGOUT})
        console.log(auth.token)
        return () => {
             ref.current = <Redirect to={url.AUTH_SIGN_IN}/>
            console.log('component unmounted '+ auth.token)
        }

    }, [dispatch,auth.token])



    
    return (
        <div>
                <React.Fragment>{ref.current}</React.Fragment>            
        </div>
    )
}
