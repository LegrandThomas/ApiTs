// import logo from "./logo.svg";
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
  <h1>{"coucou l'api répond bien reste a afficher ce qu'on reçoit"}</h1>
  <p>{post.name}</p>
  <p>{post.email}</p>
  <p>{post.password}</p>
  <p>{post.createdAt}</p>
  <p>{post.updatedAt}</p>
</div>

);

}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" 
//              alt="logo" />
          
// <p>A simple React app.....</p>
  
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <form action="../../post" method="post" 
//               className="form">
//           <button type="submit">Connected?</button>
//         </form>
//       </header>
//     </div>
//   );
// }
  
// export default App;