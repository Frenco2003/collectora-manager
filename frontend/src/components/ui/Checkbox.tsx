import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
    <input
      type="checkbox"
      id="gdpr"
      checked={checked}
      onChange={onChange}
      className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
    />
    <label htmlFor="gdpr" className="text-sm text-gray-300">
      {label}
    </label>
  </div>
);
