import { useState } from "react";
import axios from 'axios';
function Register() {
const [name, setName] = useState("");
const [emailId, setEmailId] = useState("");
const [password, setPassword] = useState("");
   const handleSubmit = (e) => {

   e.preventDefault();

  const handleSubmit = async (e) => {

   e.preventDefault();

   const response = await axios.post(
      "http://localhost:5000/api/user/register",
      {
         name,
         emailId,
         password
      }
   );

   console.log(response);

};

};
   return (


    
      <>
      <form onSubmit={handleSubmit}>

   {/* inputs */}

  
      <input
   type="text"
   placeholder="Name"
   value={name}
   onChange={(e) => setName(e.target.value)}
/>

<input
   type="email"
   placeholder="Email"
   value={emailId}
   onChange={(e) => setEmailId(e.target.value)}
/>

<input
   type="password"
   placeholder="Password"
   value={password}
   onChange={(e) => setPassword(e.target.value)}
/>
 <button type="submit">
      Register
   </button>

</form>
      </>

   );

}

export default Register;