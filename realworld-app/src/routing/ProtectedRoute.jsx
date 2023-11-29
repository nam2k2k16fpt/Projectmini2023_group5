import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const jwtToken = useSelector((state) => state.auth.login.jwtToken);
    const nav = useNavigate();

    useEffect(() => {
        if (!jwtToken) {
            nav('/'); 
        }
      }, [jwtToken, nav]);
    
      if (!jwtToken) {
        return null; 
      }
    
      return <Outlet />;
};

export default ProtectedRoute;
