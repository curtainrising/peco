import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSchoolsRequest } from '../../redux/actionCreators'
import MySchool from './MySchool';
import JoinSchool from './JoinSchool';
import Form from '../common/Form';
import res from '../../res';

const SchoolPage = (props) => {
  console.log('props', props);
  return (
    <div>
      {props.user.schoolId ? (
        <MySchool />
      ) : (
        <JoinSchool
          schools={props.school.schools}
          user={props.user}
          dispatch={props.dispatch}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    school: state.school
  };
};

export default withRouter(connect(mapStateToProps)(SchoolPage));
