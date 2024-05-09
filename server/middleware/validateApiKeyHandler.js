const validApiKeys = [
  "9v2Bc8Rf5YgN3hTk6WmQpZsXwE9v2Bc8Rf5YgN3hTk6WmQpZsXwE",
  "4tGh7yNk1uJc3v5Bx8ZqWm9AeR4tGh7yNk1uJc3v5Bx8ZqWm9AeR",
];

//Define middleware function
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || !validApiKeys.includes(apiKey)) {
    res.status(401);
    throw new Error("Unauthorized - Invalid Credentials!");
  }

  next();
};

module.exports = apiKeyMiddleware;
