import { RequestHandler } from "express";

import nodemailer from "nodemailer";
// test mail 
export const mailing:RequestHandler=async(req,res,next)=>{

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
   
  // console.log(info);
  console.log('✨mail délivré avec sucess✨\n'); 
  console.log("🚀 envoyé depuis :" + mailOptions.from);
  console.log('🚀 envoyé vers 👨:'+mailOptions.to+ "\n");
  console.log("Sujet + Contenu du message envoyé:\n");
  console.log("sujet :"+mailOptions.subject+"\nmessage :"+ mailOptions.text)
  console.log("en date du : " +Date());
  console.log("Mail également transmis pour sauvegarde à : "+mailOptions.cc+"\n");
 
  return res
  .json({ message: "Mail envoyé avec sucess!!!!!!"});
}); 
}

// fin test