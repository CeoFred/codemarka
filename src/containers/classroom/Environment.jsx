/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import * as action from '../../store/actions/';
import { dispatchAppEnvironment } from '../../store/actions/app';

import './css/Environment.css';
import '../../components/classroom/Editor/editor.css';
import ColabLayout from './Class';
import failedImg from '../../media/images/vectors/flame-1.png'

function Environment(props) {
  const { match: { params } , history } = props;
  const classroomId = params.classroom;
  const { onClassroomVerify, onClassroomSwitch } = props;

  const checking = (
      <div className="env--content--loading text-center">
          <div
        className="spinner-grow"
        style={ { width: '3rem', height: '3rem', background: 'grey' } }
        role="status"
      >
              <span className="sr-only">Loading...</span>
          </div>
          <div style={ { marginTop: '5' } }>Checking classroom..</div>
      </div>
  );

  const [ colabstate ] = React.useState({
    user_id: props.userid,
    classroom_id: classroomId,
    username: props.username,
    class_name: props.class_name
  });

  console.log(props);
  const { class_verified, isAuthenticated } = props
  React.useEffect(() => {
      onClassroomSwitch('classroom');

      if(window.innerWidth < 750){
        console.log('too small')
      }
    if(!class_verified && isAuthenticated){

      onClassroomVerify(classroomId);

      }

    return () => {
      onClassroomSwitch('regular');
    };
  });

  const getContent = () => {
    if(!props.isAuthenticated && props.authState === 'done' ){
        return (<Redirect to={ `/auth/signin?authCheck=failed&redir=/c/classroom/${ classroomId }` }/>)
      }
    if (!props.class_verified && !props.validation_error_message) {
      
      return checking;
    } else if (props.validation_error_message && !props.class_verified) {
    return (<Redirect to="/classError/notFound/"/>)
    }
    else if(props.isAuthenticated && props.class_verified && props.username && props.userid) {
      let blocked = false;
      props.blocked.forEach(per => {
        if(per.user.id === props.userid){
          blocked = true
        }
      });
      if(!blocked){
        return (
            <ColabLayout
                name={props.class_name}
                owner={props.class_owner === props.userid}
                data={colabstate}
                username={props.username}
                userid={props.userid}
                description={props.class_description}
                ownerid={props.class_owner}
                topic={props.class_topic}
                pinnedMessages={props.class_pinnedMessages}
                history={history}
            />
        )
      } else {
        return (
            <div style={{height:'100vh'}} className="bg-warning pt-7 text-center justify-content-center">
                <div className="m-auto">
                    <h1 className="text-white">Heads Up!</h1>
                    <p className="p-3 text-white">
                        {' '}
                        <span className="text-white">
                            Whoops! Seems you have been blocked from joining {props.class_name}!
                        </span>
                        <br/>
                        return <a href="/" className="text-dark text-uppercase font-weight-bold">Home</a>
                    </p>
                    <hr className="divider" />
                    <div className="m-3">
                        <img
                            style={{ height: '300px' }}
                            src={failedImg}
                            alt="failed"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        )
      }
      
    }
  };
  return (
      <div className="env--container">
      
          {getContent()}
      </div>
  );
}

const mapStateToProps = ({ auth, classroom }) => {
  return {
      isAuthenticated: auth.user.token !== null,
      userid: auth.user.userId,
      username: auth.user.username,
      user_t: auth.user.token,
      class_verified: classroom.validated,
      class_owner: classroom.owner,
      class_name: classroom.name,
      validation_error_message: classroom.validation_error_message,
      class_description: classroom.description,
      authState: auth.authState,
      class_topic: classroom.topic,
      class_pinnedMessages: classroom.pinnedMessages,
      blocked: classroom.blocked
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClassroomVerify: classroomid => dispatch(action.classVerify(classroomid)),
    onClassroomSwitch: state => dispatch(dispatchAppEnvironment(state)),
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Environment);
