import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const LoggedOutRouter = ({ path, component: Component}) => (
    <Route path={path} render={props => (
        !localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)
