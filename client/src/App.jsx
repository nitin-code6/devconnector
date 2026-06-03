import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import CreateProfile from "./pages/createProfile";
import EditProfile from "./pages/editProfile";
import Profile from "./pages/Profile";
import CreatePost from "./pages/createPost";
import MyPosts from "./pages/MyPost";
import Feed from "./pages/Feed";
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
<Route path="/profile/:username" element={<Profile />}/>
<Route path="/createPost" element={<CreatePost />}/>
<Route path="/myPosts" element={<MyPosts />}/>
<Route path="/feed" element={<Feed />}
/>
    </Routes>

  );

}

export default App;