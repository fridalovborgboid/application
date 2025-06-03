import { activities } from "@client/data/activities";

export function getActivityLabel(value: string): string {
  const activity = activities.find((act) => act.value === value);
  return activity ? activity.label : "Okänd aktivitet";
}
