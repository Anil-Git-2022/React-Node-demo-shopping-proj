import {BrowserRouter as Router,Routes,Route,Redirect,Switch,useLocation,useNavigate} from 'react-router-dom';
import React from 'react'
export function withRouter( Child ) {
    return ( props ) => {
      const location = useLocation();
      const navigate = useNavigate();
      return <Child { ...props } navigate={ navigate } location={ location } />;
    }
}