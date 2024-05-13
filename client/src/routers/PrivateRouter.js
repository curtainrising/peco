import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Loading from '../components/common/Loading';

const PrivateRoute = ({ path, component: Component, requiresSchool, school, user}) => (
    <Route path={path} component={props => (
        user && (!requiresSchool || (requiresSchool && user.schoolId))
            ? requiresSchool && !school.school.schoolId ? <Loading /> : <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

const mapStateToProps = (state) => {
  return {
    user: state.user,
    school: state.school
  };
};

export default connect(mapStateToProps)(PrivateRoute);
