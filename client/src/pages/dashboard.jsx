import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Dashboard() {
   const navigate =useNavigate();
   const [user, setUser] = useState(null);
useEffect(() => {

   const fetchUser = async () => {


      try {
  

      const response = await axios.get(
   "http://localhost:5000/api/user/me",
   {
      withCredentials: true
   }
);

setUser(response.data);
   
}catch(err){
   navigate("/login");
}
};
   fetchUser();

}, []);
const handleLogout = async () => {

   try {

      await axios.post(
         "http://localhost:5000/api/user/logout",
         {},
         {
            withCredentials: true
         }
      );

      navigate("/login");

   } catch(err) {

      console.log(err);

   }

};
   return (

      <div className="min-h-screen bg-base-200">

         <div className="navbar bg-base-100 shadow">

            <div className="flex-1">

               <a className="text-xl font-bold">
                  DevConnector
               </a>

            </div>

            <div>

               <button
   className="btn btn-outline btn-sm"
   onClick={handleLogout}
>
   Logout
</button>

            </div>

         </div>

         <div className="p-6">

            <h1 className="text-3xl font-bold">
               Dashboard
            </h1>

            <p className="mt-2 opacity-70">

   {
      user
         ? `Welcome ${user.name}`
         : "Loading..."
   }

</p>

         </div>

      </div>

   );

}

export default Dashboard;