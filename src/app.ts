import express from "express";
import userRoutes from "./routes/users";
import manageable_dataRoutes from "./routes/mangeable_data";
import mailRoutes from "./routes/contact_form";
import {connection} from "./db/config";
import { json, urlencoded } from "body-parser";
import * as https from 'https';
import * as fs from 'fs';
require('dotenv').config()


const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/mail", mailRoutes);
app.use("/data",manageable_dataRoutes);
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
    console.log("⚡️ Base de données connectée avec sucess ! \n");
  })
  .catch((err) => {
    console.log("🔥🔥🔥  ! Erreur !   🔥🔥🔥", err);
  });

  const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
}

https.createServer(httpsOptions, app).listen(3000, () => {
  console.log("💻 :Server NodeJs démaré sur le port :" + process.env.PORT)
  
// let d=new Date();
// console.log(d);

});
