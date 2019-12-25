import React,{ useEffect , useRef , useState} from 'react'
import { connect } from 'react-redux'

import Home from './Home';
import AuthHome from './Auth_Home';
import Helment from '../../../components/SEO/helmet'
import Preloader from '../../../components/Partials/Preloader';
function Index(props) {
    
    const ref = useRef(null);

    const [state, setState] = useState(ref.current);

    useEffect(() => {
        if(!props.isAuthenticated && props.authState !== 'done'){
            
  const preloaderjsx = (
      <div
          style={ {
              position: 'absolute',
              top: '50%',
              textAlign: 'center',
              left: '50%'
          } }>
          <Preloader />
      </div>
  )
            setState(s => {
                return preloaderjsx;
            })
        }
        if (!props.isAuthenticated && props.authState === 'done') {
            setState(s => {
                return (
                    <div>
                        <Helment
                            metaDescription="Learn , build , debug and collaborate in real time. Change the way you build softwares."
                            title="Home - Codemarka"
                        />

                        <Home />
                    </div>
                )
            });

        } else if (props.isAuthenticated && props.authState === 'done') {

               setState(s => {
                return (
                    <div>
                        <Helment 
                        title=" Home - Codemarka"
                        metaDescription="Learn , build , debug and collaborate in real time. Change the way you build softwares."
                        />
                        <AuthHome />
                    </div>
                )
               })    
               }
    }, [props.isAuthenticated, props.authState])
    return (<div>
        {state}
    </div>
    )
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.user.token !== null,
      authState : state.auth.authState
    }
  }
  
  export default connect( mapStateToProps, null )(Index)