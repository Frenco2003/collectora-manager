import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../redux/slice/authSlice'; 
import type { RootState } from '../redux/store';

export const useAuth = () => {
  const { user } = useSelector((state: RootState) => state.auth); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout()); 
    window.location.href = '/login'; 
  };

  return { user, handleLogout };
};
