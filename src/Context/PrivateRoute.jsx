/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';

const PrivateRoute = (props) => {
  const { component: RouteComponent, ...rest } = props;
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={
            (routeProps) => (currentUser ? <RouteComponent {...routeProps} /> : <Redirect to="/login" />)
        }
    />
  );
};
export default PrivateRoute;
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.func.isRequired,
};
