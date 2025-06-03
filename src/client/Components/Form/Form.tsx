import { z } from "zod/v4";
import { FormEvent, useCallback, useMemo, useState } from "react";
import InputField from "../InputField/InputField";
import { applicationSchema, type ApplicationData } from "@shared/validation";
import { activities, type Activity } from "@client/data/activities";
import SelectedActivities from "../SelectedActivites";
import Message from "../Message/Message";
import FormButton from "./FormButton/FormButton";
import styles from "./Form.module.css";
import { ResponseMessage, useFormResponseMessage } from "./useFormResponseMessage";

export default function Form() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedActivities, setSelectedActivities] = useState<Activity["value"][]>([]);

  const {
    responseMessage,
    setResponseMessage,
    clearFieldError,
    setFailMessage,
    clearMessages,
  } = useFormResponseMessage();

  const isDisabled = useMemo(
    () => !name.trim() || !email.trim() || selectedActivities.length !== 3,
    [name, email, selectedActivities]
  );

  const handleCheckboxChange = useCallback((value: string, isChecked: boolean) => {
    setSelectedActivities(prev =>
      isChecked
        ? [...prev, value]
        : prev.filter(act => act !== value)
    );
  }, []);

  const handleRemoveActivity = useCallback((activityToRemove: string) => {
    setSelectedActivities(prev =>
      prev.filter(act => act !== activityToRemove)
    );
  }, []);

  function clearForm() {
    setName("");
    setEmail("");
    setSelectedActivities([]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    
    const applicationData: ApplicationData = {
      name,
      email,
      activities: selectedActivities,
    };

    // Validate the application data with Zod schema
    const validationResult = applicationSchema.safeParse(applicationData);

    if (!validationResult.success) {
      const errors = z.flattenError(validationResult.error);
      const mappedErrors: ResponseMessage = {};
    
      for (const key in errors.fieldErrors) {
        const field = key as keyof ApplicationData;
        const messages = errors.fieldErrors[field];
        if (messages && messages.length > 0) {
          mappedErrors[field] = messages[0];
        }
      }
    
      setResponseMessage(mappedErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const responseData = await response.json()

      if (!response.ok) {
        if (responseData.errors && responseData.errors.fieldErrors) {
          setResponseMessage(responseData.errors.fieldErrors);
        } else {
          throw new Error("Error from server");
        }
        return;
      }
      
      setResponseMessage(responseData);
      clearForm();
    } catch (error: Error | unknown) {
      console.error("Error submitting form:", error);
      setFailMessage();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Personuppgifter</legend> 
          <InputField
            id="name"
            label="För- och efternamn"
            type="text"
            value={name}
            onChange={event => {
              setName(event.target.value);
              clearFieldError('name');
            }}
            error={responseMessage?.name}
            required
            autoComplete="name"
            placeholder="Frida Dunkel"
          />
          <InputField
            id="email"
            label="E-post"
            type="text"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              clearFieldError('email');
            }}
            error={responseMessage?.email}
            required
            autoComplete="email"
            placeholder="frida@dunkel.se"
          />
        </fieldset>
        <fieldset>
          <legend>Aktiviteter</legend>
          <div className={styles.selectedActivities}>
            <p className="help-text">{selectedActivities.length > 0 ? "Valda aktiviteter:" : "Välj 3 aktiviteter som du är intresserad av"}</p>
            
            <SelectedActivities
              selectedActivities={selectedActivities}
              onRemove={handleRemoveActivity}
            />

            {activities.map(activity => (
              <InputField
                id={activity.value}
                key={activity.value}
                label={activity.label}
                type="checkbox"
                value={activity.value}
                onChange={event => 
                  handleCheckboxChange(activity.value, event.target.checked)
                }
                checked={selectedActivities.includes(activity.value)}
                disabled={selectedActivities.length >= 3 && !selectedActivities.includes(activity.value)}
              />
            ))}
            {selectedActivities.length > 0 && (
              <p className="help-text">Välj 3 aktiviteter som du är intresserad av</p>
            )}
          </div>

          {(responseMessage && responseMessage?.activities) && <p className="help-text" data-severity="error">{responseMessage?.activities}</p>}
        </fieldset>
        <FormButton type="submit" label="Skicka in ansökan" disabled={isDisabled} />
      </form>
      
      {(responseMessage?.success || responseMessage?.fail) && (
        <Message
          severity={responseMessage?.success ? "success" : "error"}
          message={responseMessage?.success || responseMessage?.fail || ""}
          responseData={responseMessage?.responseData && responseMessage?.responseData}
          ariaLabel="Ta bort meddelande"
          onRemove={() => clearMessages()}
        />
      )}
    </>
  );
}
