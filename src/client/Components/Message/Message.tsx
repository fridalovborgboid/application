import { faCheck, faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import styles from "./Message.module.css";
import { ApplicationData } from "@shared/validation";
import { getActivityLabel } from "@client/utils/activities";

type MessageProp = {
  severity: "info" | "error" | "success";
  message: string;
  ariaLabel?: string;
  responseData?: ApplicationData;
  onRemove?: () => void;
};

export default function Message({
  severity,
  message,
  ariaLabel,
  responseData,
  onRemove,
}: MessageProp) {
  const getSeverityIcon = (() => {
    switch (severity) {
      case "error":
        return faCircleExclamation;
      case "success":
        return faCheck;
    }
  })();
  return (
    <>
      <div className={styles.message} data-severity={severity}>
        {getSeverityIcon && <Icon icon={getSeverityIcon} />}
        <p className={styles.messageText}>{message}</p>
        
        {onRemove && (  
          <button
            type="button"
            onClick={onRemove}
            aria-label={ariaLabel}
          >
            <Icon icon={faXmark} />
          </button>
        )}
      </div>
      {responseData && (
        <>
          <h2>Inskickade uppgifter</h2>
          <ul className={styles.details}>
            {responseData && responseData.name && <li>{responseData.name}</li>}
            {responseData && responseData.email && <li>{responseData.email}</li>}
            {responseData && responseData.activities && responseData.activities.length > 0 && (
              <li>
                Aktiviteter: {responseData.activities.map(activity => getActivityLabel(activity)).join(', ')}
              </li>
            )}
          </ul>
        </>
      )}
    </>
  )
}