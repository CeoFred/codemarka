import React from "react";
import { useDispatch , connect } from "react-redux";


import * as action from "../../store/actions/";
import { dispatchAppEnvironment } from '../../store/actions/app';


import './css/Environment.css';
import "../../components/classroom/Editor/editor.css";
import ColabLayout from "./Class";

function Environment(props) {

  const dispatch = useDispatch();
  const { match: { params } } = props;
  const classroomId = params.classroom;
  const {onClassroomVerify} = props;


  const checking = (
    <div className="env--content--loading text-center">
    <div className="spinner-grow" style={{width:'3rem',height:'3rem',background:'grey'}} role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div style={{marginTop:'5'}}>Checking classroom..</div>
  </div>
  );



  const [colabstate] = React.useState({
    user_id: props.userid,
    classroom_id: classroomId,
    username: props.username,
  });

  console.log(props);

  React.useEffect(() => {
      dispatch(dispatchAppEnvironment('classroom'));

      onClassroomVerify(colabstate.classroom_id)
     return () => {
    dispatch(dispatchAppEnvironment('regular'));
    }
  },[dispatch,colabstate.classroom_id,props,onClassroomVerify])

  const getContent = () => {
    if(!props.class_verified){
      return checking;
    } else {
      return (<ColabLayout owner={props.class_owner} data={colabstate}/>)
    }
  }
  return (
    <div className="env--container">
      {getContent()}
    </div>
  );
}


const mapStateToProps = ({auth,classroom}) => {
  return {
    isAuthenticated: auth.user.token !== null,
    userid: auth.user.userId,
    username : auth.user.username,
    user_t:auth.user.token,
    class_verified: classroom.validated,
    class_owner: classroom.owner 
  }
}


const mapDispatchToProps = dispatch => {
  return {
      onClassroomVerify: ( classroomid ) => dispatch( action.classVerify(classroomid) ),
  };
};
export default connect( mapStateToProps, mapDispatchToProps )(Environment)