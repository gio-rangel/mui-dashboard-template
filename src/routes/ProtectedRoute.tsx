import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { logout } from '../state/slices/authSlice';


const ProtectedRoute = ({ 
    children, 
    isProtected 
} : {
    children: React.JSX.Element,
    isProtected: boolean
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.refreshToken);

  useEffect(() => {
    if (isProtected) {
    // Uncommment when authentication is available
    //   if (!token) {
    //     dispatch(logout());
    //     navigate('/');
    //   } else {
    //     try {
    //       const decodedToken = jwtDecode(token);
    //       const currentTime = Date.now() / 1000;

    //       if (decodedToken?.exp && decodedToken?.exp < currentTime) {
    //         dispatch(logout());
    //         navigate('/');
    //       } 
    //     } catch (error) {
    //       console.error('Error decoding token', error);
    //       dispatch(logout());
    //       navigate('/');
    //     }
    //   }

    }
  }, [dispatch, token, isProtected, navigate]);

    // Uncommment when authentication is available
    // If route is unprotected, render immediately
    //   if (!isProtected) return children;

    // For protected routes, only render if token is valid
    //   return token ? children : null;

    // Delete this line when authentication is available
    return children;
};


// Define prop types
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isProtected: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
