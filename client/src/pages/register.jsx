import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router";
function Register() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const [loading, setLoading] = useState(false);
const   [showPassword,setShowPassword]=useState(false);
const handleSubmit = async (e) => {
console.log('I am running ')
   e.preventDefault();

   try {

      setError("");
      setSuccess("");
       
      setLoading(true);
     


      const response = await axios.post(
         "http://localhost:5000/api/user/register",
         {
            name,
            email,
            password
         }
      );
console.log(response.data);
      setSuccess( response.data.message || response.data);
      setName("");
setEmail("");
setPassword("");

   } catch(err) {

   if (err.response) {

      setError(
         err.response.data.message
      );

   } else if (err.request) {

      setError(
         "Backend server is not running"
      );

   } else {

      setError(
         "Something went wrong"
      );

   }

}
   finally {

   setLoading(false);

}

};


   return (
   <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card w-96 bg-base-100 shadow-xl">

         <div className="card-body">

            <h2 className="text-3xl font-bold text-center">
               Create ccount
            </h2>

            <p className="text-center text-sm opacity-70">
               Join the DevConnector community
            </p>

            <form
               onSubmit={handleSubmit}
               className="space-y-4"
            >

               <div>
                  <label className="label">
                     <span className="label-text">
                        Name
                     </span>
                  </label>

                  <input
                     className="input input-bordered w-full"
                     type="text"
                     placeholder="Enter your name"
                     value={name}
                     onChange={(e) =>
                        setName(e.target.value)
                     }
                  />
               </div>

               <div>
                  <label className="label">
                     <span className="label-text">
                        Email
                     </span>
                  </label>

                  <input
                     className="input input-bordered w-full"
                     type="email"
                     placeholder="Enter your email"
                     value={email}
                     onChange={(e) =>
                        setEmail(e.target.value)
                     }
                  />
               </div>

               <div>
   <label className="label">
      <span className="label-text">
         Password
      </span>
   </label>

   <div className="relative">

      <input
         className="input input-bordered w-full"
         type={
            showPassword
               ? "text"
               : "password"
         }
         placeholder="Enter your password"
         value={password}
         onChange={(e) =>
            setPassword(e.target.value)
         }
      />

      <button
         type="button"
         className="absolute right-3 top-3 text-sm"
         onClick={() =>
            setShowPassword(
               !showPassword
            )
         }
      >
         {showPassword
            ? "Hide"
            : "Show"}
      </button>

   </div>
</div>

               {error && (
                  <p className="text-error text-sm">
                     {error}
                  </p>
               )}

               {success && (
                  <p className="text-success text-sm">
                     {success}
                  </p>
               )}

               <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
               >
                  {loading
                     ? "Registering..."
                     : "Register"}
               </button>

            </form>

            <div className="text-center text-sm mt-2">

         

              <p>
  Already have an account?
  <Link
    to="/login"
    className="link link-primary ml-1"
  >
    Sign In
  </Link>
</p>

            </div>

         </div>

      </div>

   </div>
);

}

export default Register;