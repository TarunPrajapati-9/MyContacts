const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const apiKeyMiddleware = require("./middleware/validateApiKeyHandler");
const cors = require("cors");
const dotenv = require("dotenv").config();

connectDb(); // connect to database
const app = express();

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello Contact");
});

app.use(cors());
app.use(apiKeyMiddleware);
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port);
