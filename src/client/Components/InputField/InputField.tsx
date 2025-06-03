import clsx from "clsx";
import styles from "./InputField.module.css";

interface InputFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "checkbox";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  checked?: boolean;
  disabled?: boolean;
}

export default function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  autoComplete,
  placeholder,
  checked = false,
  disabled = false,
}: InputFieldProps) {
  return (
    <div className={styles.inputField}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <sup className="required">*</sup>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={clsx(styles.input, error && styles.error)}
        checked={checked}
        disabled={disabled}
      />
      {error && <p className="help-text" data-severity="error">{error}</p>}
    </div>
  );
};
