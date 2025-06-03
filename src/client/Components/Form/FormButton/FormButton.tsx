import styles from "./FormButton.module.css";

interface FormButtonProps {
  type?: "submit" | "reset" | "button";
  severity?: "primary" | "secondary";
  disabled?: boolean;
  label: string;
}

export default function FormButton({
  type = "submit",
  severity = "primary",
  disabled = false,
  label,
}: FormButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.button}
      data-severity={severity}
    >
      {label}
    </button>
  );
}