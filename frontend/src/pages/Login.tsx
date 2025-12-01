import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure, signupSuccess } from '../redux/slice/authSlice';
import { useState } from 'react';
import { LoginForm } from '../components/login/LoginForm';
import { LoginHeader } from '../components/login/LoginHeader';
import { LoginToggle } from '../components/login/LoginToggle';
import type { PasswordValidationResult } from '../lib/passwordValidation';
import type { RootState } from '../redux/store';

export function Login() {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state: RootState) => state.auth); 
  const [isLogin, setIsLogin] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidationResult | null>(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest()); // Attiviamo il loading

    try {
      if (isLogin) {
        // Simuliamo una chiamata di login
        dispatch(loginSuccess({ email }));
      } else {
        // Simuliamo una chiamata di registrazione
        dispatch(signupSuccess({ email }));
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Gestisci l'errore e utilizza una stringa per l'errore
      dispatch(loginFailure('Errore durante la login/registrazione'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginHeader />
        <LoginToggle isLogin={isLogin} setIsLogin={setIsLogin} />
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
          <LoginForm
            isLogin={isLogin}
            passwordValidation={passwordValidation}
            setPasswordValidation={setPasswordValidation}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
            fullName={fullName}
            setFullName={setFullName}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm}
            gdprConsent={gdprConsent}
            setGdprConsent={setGdprConsent}
            captchaVerified={captchaVerified}
            setCaptchaVerified={setCaptchaVerified}
            handleSubmit={handleSubmit}
            error={error || ''}
            success={ success || ''}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
