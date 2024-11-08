import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import usersRouter from "./routes/users.js";

dotenv.config();

function validateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return res.status(404).json();
  }

  next();
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());
app.use(validateApiKey);

app.get("/", (req, res) => {
  res.send("Turso ve Express API'sine Hoşgeldiniz!");
});

app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor...`);
});
