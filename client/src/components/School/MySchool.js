import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const MySchool = (props) => {
  return (
    <div>
      hello world
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    schools: state.school.school
  };
};

export default withRouter(connect(mapStateToProps)(MySchool));
