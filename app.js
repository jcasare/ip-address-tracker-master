const express = require("express");
const app = express();
require("dotenv").config();
const port = 3000 || process.env.PORT;
const cors = require("cors");
const xss = require("xss-clean");
app.set("trust-proxy", 1);
app.use(cors());
app.use(xss());
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
