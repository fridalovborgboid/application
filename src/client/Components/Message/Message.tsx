import { faCheck, faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import styles from "./Message.module.css";
import { ApplicationData } from "@shared/validation";
import { getActivityLabel } from "@client/utils/activities";

type MessageProp = {
  severity: "info" | "error" | "success";
  message: string;
  ariaLabel?: string;
  data?: ApplicationData;
  onRemove?: () => void;
};

export default function Message({
  severity,
  message,
  ariaLabel,
  data,
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
      {data && (
        <>
          <h2>Inskickade uppgifter</h2>
          <ul className={styles.details}>
            {data && data.name && <li>{data.name}</li>}
            {data && data.email && <li>{data.email}</li>}
            {data && data.activities && data.activities.length > 0 && (
              <li>
                Aktiviteter: {data.activities.map(activity => getActivityLabel(activity)).join(', ')}
              </li>
            )}
          </ul>
        </>
      )}
    </>
  )
}