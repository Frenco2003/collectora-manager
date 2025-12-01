import React from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type: string;
  required?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder, type, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
      placeholder={placeholder}
    />
  </div>
);
