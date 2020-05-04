import React from 'react';
import { connect } from 'react-redux'

function AttendanceCollector(props){
  // React.useEffect(() => {
  //   // wait 4 Seconds
  //   setTimeout(() => {
  //     if (props.classroomData.isCollectingAttendance) {

  //     }
  //   }, 4000);

  // }, [attendanceState]);

  return (
    <div>
      
    </div>
  );
}
const mapStateToProps = ({ auth,classroom }) => {
  return {
    // takingAttendab
  }
}

export  default connect(mapStateToProps,null)(AttendanceCollector);