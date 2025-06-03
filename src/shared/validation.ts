import { z } from "zod/v4";

export const applicationSchema = z.object({ 
  name: z.string().min(2, "Ange hela ditt för- och efternamn"),
  email: z.email("Ange en giltig e-postadress"),
  activities: z
    .array(z.string())
    .refine((arr) => arr.length === 3, {
      message: "Välj 3 aktiviteter som du är intresserad av",
    }),
});

export type ApplicationData = z.infer<typeof applicationSchema>;
