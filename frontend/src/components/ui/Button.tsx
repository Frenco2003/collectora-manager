import React, { type MouseEventHandler } from 'react';

interface ButtonProps {
  loading: boolean;
  isLogin: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>; // Tipo corretto per il click su un bottone
}

export const Button: React.FC<ButtonProps> = ({ loading, isLogin, onClick }) => (
  <button
    type="submit"
    onClick={onClick}
    disabled={loading}
    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? 'Attendere...' : isLogin ? 'Accedi' : 'Registrati'}
  </button>
);
