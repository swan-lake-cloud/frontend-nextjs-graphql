// components/TextInput.tsx
import { ChangeEvent } from 'react';

type Props = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  autoComplete?: string;
};

export default function TextInput({ id, label, type='text', value, onChange, placeholder, autoComplete }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }
  return (
    <div style={{marginBottom:'0.85rem'}}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} value={value} onChange={handleChange} placeholder={placeholder} autoComplete={autoComplete} />
    </div>
  );
}
