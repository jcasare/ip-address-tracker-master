const express = require("express");
const app = express();
require("dotenv").config();
const port = 3000 || process.env.PORT;

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/v1/getApiKey", async (req, res) => {
  const apiKey = process.env.API_KEY;
  res.json({ apiKey });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}....`);
});
