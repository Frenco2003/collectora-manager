// components/login/PasswordStrength.tsx
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { PasswordValidationResult } from '../../lib/passwordValidation';

interface PasswordStrengthProps {
  passwordValidation: PasswordValidationResult | null;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ passwordValidation }) => {
  if (!passwordValidation || !passwordValidation.errors.length) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex items-center gap-2">
        <div
          className={`h-1.5 flex-1 rounded-full ${
            passwordValidation.strength === 'strong'
              ? 'bg-green-500'
              : passwordValidation.strength === 'medium'
              ? 'bg-yellow-500'
              : 'bg-red-500'
          }`}
        />
        <span className="text-xs text-gray-400">
          {passwordValidation.strength === 'strong'
            ? 'Forte'
            : passwordValidation.strength === 'medium'
            ? 'Media'
            : 'Debole'}
        </span>
      </div>
      {passwordValidation.errors.map((err, idx) => (
        <div key={idx} className="flex items-start gap-2 text-xs text-red-400">
          <XCircle size={14} className="mt-0.5 flex-shrink-0" />
          <span>{err}</span>
        </div>
      ))}
      {passwordValidation.isValid && (
        <div className="flex items-center gap-2 text-xs text-green-400">
          <CheckCircle2 size={14} />
          <span>Password valida</span>
        </div>
      )}
    </div>
  );
};
