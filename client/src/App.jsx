import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import {
  Routes,
  Route
} from "react-router";

function App() {

  return (

    <Routes>

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />
    <Route
   path="/dashboard"
   element={<Dashboard />}
/>
    </Routes>

  );

}

export default App;