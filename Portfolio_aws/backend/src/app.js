import express from "express";
import nunjucks from "nunjucks";
import cors from "cors";

import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("port", 5000);
app.set("view engine", "html");

nunjucks.configure("src/views", {
  express: app,
  watch: true,
});

app.use(
  cors({
    origin: "*",
  })
);

app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());

// GET / 라우터
app.get("/", (req, res) => {
  res.render("chart");
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
