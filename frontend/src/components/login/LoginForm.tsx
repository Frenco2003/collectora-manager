import { useEffect } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { TextInput } from '../ui/TextInput';
import { PasswordStrength } from '../ui/PasswordStrenght';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { ErrorMessage } from '../ui/ErrorMessage';
import { useNavigate } from 'react-router-dom'; 
import { validatePassword, type PasswordValidationResult } from '../../lib/passwordValidation';

interface LoginFormProps {
  isLogin: boolean;
  passwordValidation: PasswordValidationResult | null;
  setPasswordValidation: React.Dispatch<React.SetStateAction<PasswordValidationResult | null>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  passwordConfirm: string;
  setPasswordConfirm: React.Dispatch<React.SetStateAction<string>>;
  gdprConsent: boolean;
  setGdprConsent: React.Dispatch<React.SetStateAction<boolean>>;
  captchaVerified: boolean;
  setCaptchaVerified: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
  success: string;
  loading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  isLogin,
  passwordValidation,
  setPasswordValidation,
  password,
  setPassword,
  email,
  setEmail,
  fullName,
  setFullName,
  passwordConfirm,
  setPasswordConfirm,
  gdprConsent,
  setGdprConsent,
  captchaVerified,
  setCaptchaVerified,
  handleSubmit,
  error,
  success,
  loading,
}) => {
  const navigate = useNavigate();  // Definisci navigate

  useEffect(() => {
    if (!isLogin && password) {
      setPasswordValidation(validatePassword(password));
    } else {
      setPasswordValidation(null);
    }
  }, [password, isLogin]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);  // Usa handleSubmit passato come prop

    if (isLogin) {
      navigate('/dashboard');  // Dopo il login, naviga alla dashboard
    } else {
      navigate('/dashboard');  // Dopo la registrazione, naviga alla dashboard
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {!isLogin && <TextInput label="Nome Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Mario Rossi" type="text" />}
      <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tua@email.com" type="email" />
      <TextInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" />

      {!isLogin && <PasswordStrength passwordValidation={passwordValidation} />}
      {!isLogin && <TextInput label="Conferma Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="••••••••" type="password" />}

      {!isLogin && <Checkbox label="Accetto la privacy policy e il trattamento dei dati" checked={gdprConsent} onChange={(e) => setGdprConsent(e.target.checked)} />}
      {!isLogin && (
        <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Verifica CAPTCHA</span>
            {captchaVerified ? <CheckCircle2 size={20} className="text-green-400" /> : <AlertCircle size={20} className="text-yellow-400" />}
          </div>
          <button
            type="button"
            onClick={() => setCaptchaVerified(!captchaVerified)}
            className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${captchaVerified ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:border-cyan-500'}`}
          >
            {captchaVerified ? 'Verifica completata' : 'Clicca per verificare (Demo)'}
          </button>
        </div>
      )}

      <ErrorMessage message={error} />
      <ErrorMessage message={success} isSuccess />

      <Button loading={loading} isLogin={isLogin} onClick={handleFormSubmit} />
    </form>
  );
};
