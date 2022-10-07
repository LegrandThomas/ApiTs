import express from "express";
import todoRoutes from "./routes/todos";
import userRoutes from "./routes/users";
import connection from "./db/config";
import { json, urlencoded } from "body-parser";
require('dotenv').config()

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

connection
  .sync()
  .then(() => {
    console.log("⚡️ Base de données connectée avec sucess !");
  })
  .catch((err) => {
    console.log("🔥🔥🔥  ! Erreur !   🔥🔥🔥", err);
  });
app.listen(3000, () => {
  console.log("💻 :Server NodeJs démaréé sur le port :" + process.env.PORT)
});