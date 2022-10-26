import express from "express";
import userRoutes from "./routes/users";
import manageable_dataRoutes from "./routes/mangeable_data";
import mailRoutes from "./routes/contact_form";
import AvisRoutes from "./routes/users_reviews";
import EarningsSimulator from "./routes/earnings_simulator";
import {connection} from "./db/config";
import { json, urlencoded } from "body-parser";
import * as https from 'https';
import * as fs from 'fs';
require('dotenv').config()
const jwt = require('jsonwebtoken');

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/mail", mailRoutes);
app.use("/data",manageable_dataRoutes);
app.use("/avis",AvisRoutes);
app.use("/earning_simulator",EarningsSimulator);

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

const user = {
  name: process.env.NameAdminUser,
  admin: true,
};

function generateAccessToken(user:any) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'});
}


function generateRefreshToken(user:any) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'});
}

app.post('/api/dashboard/:name', (req, res) => {
 
  if (req.params.name !== process.env.AdminUser) {
   
    res.status(401).send('invalide credentials');
    return ;
  }else{
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(201).send('acces autorisé au dashboard '+refreshToken);
    console.log("AccesToken généré : "+accessToken+'\n');
    console.log("RefreshToken généré : "+refreshToken+'\n');
}
});

app.post('/api/refreshToken', (req, res) => {
  const authHeader = req.headers['authorization'];
  console.log("autHeader : "+authHeader+'\n');
  const token = authHeader && authHeader.split(' ')[1];
  console.log("token : "+token+'\n');
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err: any, user: { iat: any; exp: any; }) => {
    if (err) {
      return res.sendStatus(401);
    }
    delete user.iat;
    delete user.exp;
    const refreshedToken = generateAccessToken(user);
    console.log("maintenant c'est ok !! 😉")
    res.send({
      accessToken: refreshedToken,
    });
  });
});



app.get('/api/me',  (req, res,next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(401);
      }else{
        user.name="***********";
        res.send(user);
        next();
      }
    });
  
 
});


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

});
