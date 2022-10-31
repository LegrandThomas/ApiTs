import "./App.css";

import axios from "axios";
import React from "react";
  
const baseURL="http://localhost:5000/users";

export default function App(){
const[post,setPost]=React.useState(null);

React.useEffect(()=>{
axios.get(baseURL).then((response)=>{
  setPost(response.data);
});
},[]);

if(!post)return null;
console.log(post);

return(
<div>
  <h1>{"coucou l'api répond bien reste à afficher ce qu'on reçoit"}</h1>
  <hr></hr>
  <p>{" voici par exemple les infos du 1er users de présent dans la table 🥳🥳🥳 "}</p>
  <br></br>
  <p>{"  Id :"+post.data[0].id}</p>
  <p>{"  name :"+post.data[0].name}</p>
  <p>{"  email :"+post.data[0].email}</p>
  <p>{"  password :"+post.data[0].password}</p>
  <p>{"  createAT :"+post.data[0].createdAt}</p>
  <p>{"  updateAT :"+post.data[0].updatedAt}</p>
</div>

);

}



