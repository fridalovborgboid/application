import { ApplicationData } from "@shared/validation";
import { useState } from "react";

export type ResponseMessage = Partial<Record<string, string>> & {
  success?: string;
  fail?: string;
  data?: ApplicationData;
};

const serverFailMessage = "Ett fel uppstod vid inlämning av formuläret. Testa igen!";

export function useFormResponseMessage() {
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>();

  function clearFieldError(field: keyof ResponseMessage) {
    setResponseMessage(prev => {
      if (!prev) return prev;
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }

  function setFailMessage() {
    setResponseMessage({ fail: serverFailMessage });
  }

  function clearMessages() {
    setResponseMessage(undefined);
  }

  return {
    responseMessage,
    setResponseMessage,
    clearFieldError,
    setFailMessage,
    clearMessages,
  };
}
