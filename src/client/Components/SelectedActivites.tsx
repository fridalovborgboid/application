import { type Activity } from "@client/data/activities";
import { getActivityLabel } from "@client/utils/activities";
import Message from "./Message/Message";
import { useMemo } from "react";

interface SelectedActivitiesProps {
  selectedActivities: Activity["value"][];
  onRemove: (activity: string) => void;
}

export default function SelectedActivities({
  selectedActivities,
  onRemove,
}: SelectedActivitiesProps) {

  const isSelectedActivityCompelete = useMemo(
    () => selectedActivities.length === 3,
    [selectedActivities]
  );

  return (
    <div className="flex flex-wrap">
      {selectedActivities.map((activity) => (
        <Message
          key={activity}
          message={getActivityLabel(activity)}
          severity="info"
          onRemove={() => onRemove(activity)}
          ariaLabel={`Ta bort aktivitet: ${getActivityLabel(activity)}`}
        />
      ))}
      {isSelectedActivityCompelete && (
        <Message
          severity="success"
          message="Du har valt 3 aktiviteter!"
        />
      )}
    </div>
  );
}
