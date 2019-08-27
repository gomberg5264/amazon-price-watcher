import React from 'react';

import { Route, Redirect, withRouter } from 'react-router-dom'

const SecuredRoute = ({ component: Component, ...rest}) => {
  return (
    <Route 
      {...rest}
      render={props => {
        
      }}
      
  )
}