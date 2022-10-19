import { RequestHandler } from "express";
import {contact_form} from "../models/mailing"
import nodemailer from "nodemailer";

let date = new Date();


export const create_message: RequestHandler = async (req, res, next) => {
  let mes = await contact_form.create({ ...req.body },{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "message enregistré avec sucess le "+ date , data: mes });
};


export const delete_message: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedMessage: contact_form | null = await contact_form.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  await contact_form.destroy({ where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Message effacé de la bdd avec sucess", data: deletedMessage });
};



export const getMessageById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const Mess: contact_form | null = await contact_form.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Recherche du message par ID effectuée avec sucess", data: Mess });
};


export const getMessageByName: RequestHandler = async (req, res, next) => {
  const  nom_contact = req.params.nom_contact;
  const Mess: contact_form | null = await contact_form.findOne({ where: { nom_contact },logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject) }});
  return res
    .status(200)
    .json({ message: "Recherche du message par name effectuée avec sucess", data: Mess });
};

export const updateMessage: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await contact_form.update({ ...req.body }, { where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  const updatedUser: contact_form | null = await contact_form.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Message mis à jour avec sucess", data: updatedUser });
};


export const getAllmess: RequestHandler = async (req, res, next) => {
  const allmess: contact_form[] = await contact_form.findAll({logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
 
  return res
    .status(200)
    .json({ message: "Listing des mails effectué avec sucess", data: allmess });
};

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
   subject: 'Réponse automatique',
   text: 'Votre mail à bien était pris en compte\nCeci est une réponse automatique\n Merci de ne pas répondre'
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




  
// fonction pour send requette + detail en console.log
function sendToLogToConsole (sql: string, queryObject: number | undefined) {  
    // save the `sql` query in Elasticsearch
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
  }