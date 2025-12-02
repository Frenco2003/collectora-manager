import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Aggiungi questo import
import { logout } from '../redux/slice/authSlice'; 
import type { RootState } from '../redux/store';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Definisci navigate
  const { user } = useSelector((state: RootState) => state.auth); // Ottieni lo stato da Redux

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Reindirizza se non c'è un utente
    }
  }, [user, navigate]); // Aggiungi navigate come dipendenza

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); // Reindirizza al login dopo il logout
  };

  return { user, handleLogout };
};
