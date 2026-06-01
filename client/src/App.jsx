import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import CreateProfile from "./pages/createProfile";
import EditProfile from "./pages/editProfile";
import {
  Routes,
  Route
} from "react-router";

function App() {

  return (

    <Routes>

      <Route path="/register" element={<Register />}/>

      <Route  path="/login"  element={<Login />} />
    <Route path="/dashboard"  element={<Dashboard />}/>
<Route  path="/createProfile"element={<CreateProfile />}/>
<Route  path="/editProfile"element={<EditProfile/>}/>
    </Routes>

  );

}

export default App;