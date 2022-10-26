import express from "express";

import { verifyDiscordRequest } from "./utils.js";

const app = express();

const port = process.env.PORT || 12345;

app.use(express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
