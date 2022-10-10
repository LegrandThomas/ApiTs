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
    console.log("⚡️ Base de données connectée avec sucess ! \n");
  })
  .catch((err) => {
    console.log("🔥🔥🔥  ! Erreur !   🔥🔥🔥", err);
  });
app.listen(3000, () => {
  console.log("💻 :Server NodeJs démaré sur le port :" + process.env.PORT)
});

// test mail 
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: process.env.HMailer,
  port: 587,
  secure: false,
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
  auth: {
      user: 'well.eat.test@gmail.com', 
      pass: process.env.PASS           
  }
  });
  
  let mailOptions = {
   from: 'well.eat.test@gmail.com',
   to: 'pro.legrand.thomas@gmail.com',
   cc:'well.eat.test@gmail.com',
   subject: 'Mail test',
   text: 'petit test ;)'
  };
 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
       return console.log(error.message);
    }
  console.log('✨mail délivré avec sucess✨\n'); 
  console.log("🚀 envoyé depuis :" + mailOptions.from);
  console.log('🚀 envoyé vers 👨:'+mailOptions.to+ "\n");
  console.log("Sujet + Contenu du messag envoyé:\n");
  console.log("sujet :"+mailOptions.subject+"\nmessage :"+ mailOptions.text)
  console.log("en date du : " +Date());
  console.log("Mail également transmis pour sauvegarde à : "+mailOptions.cc+"\n");
  }); 
// fin test