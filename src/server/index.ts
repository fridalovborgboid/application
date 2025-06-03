import express from "express";
import cors from "cors";
import { z } from "zod/v4";
import { applicationSchema } from "src/shared/validation";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/application', (req, res) => {
  const result = applicationSchema.safeParse(req.body);

  if (!result.success) {
    const errors = z.flattenError(result.error);
    return res.status(400).json({ errors });
  } else {
    console.log( "Received application data:", req.body);
    res.send({success: "Anmälan till lägerverksamhet har skickats in!", data: req.body});
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
