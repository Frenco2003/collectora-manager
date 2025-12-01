import React from 'react';

interface ErrorMessageProps {
  message: string | null;
  isSuccess?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, isSuccess }) => {
  if (!message) return null;

  return (
    <div
      className={`p-3 ${isSuccess ? 'bg-green-500/10 border border-green-500/50' : 'bg-red-500/10 border border-red-500/50'} rounded-lg`}
    >
      <p className="text-sm text-red-400">{message}</p>
    </div>
  );
};
