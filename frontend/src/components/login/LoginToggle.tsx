interface LoginToggleProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginToggle({ isLogin, setIsLogin }: LoginToggleProps) {
  return (
    <div className="flex gap-2 mb-6 bg-gray-700/50 rounded-lg p-1">
      <button
        onClick={() => setIsLogin(true)}
        className={`flex-1 py-2 rounded-md font-medium transition-all ${isLogin ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
      >
        Accedi
      </button>
      <button
        onClick={() => setIsLogin(false)}
        className={`flex-1 py-2 rounded-md font-medium transition-all ${!isLogin ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
      >
        Registrati
      </button>
    </div>
  );
}
