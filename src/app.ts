import express from "express";

const app = express();

//Routes
// HTTP methods : GET, POST, PUT, PATCH, DELETE

app.get("/", (req, res) => {
  res.json({ message: "Welcome to REST API with TS" });
});

export default app;
