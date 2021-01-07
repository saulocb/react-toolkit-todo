import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LocalStorageService } from '../shared/services/localStorage';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        LocalStorageService.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)