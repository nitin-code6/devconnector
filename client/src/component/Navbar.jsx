import { Link } from "react-router";
  import { useEffect, useState } from "react";
  import logo from "../assets/logo.png";
  import axios from "axios";
function Navbar() {
  const [user, setUser] =
  useState(null);
const [theme, setTheme] = useState("light");
useEffect(() => {
const fetchUser = async () => {

  try {

    const response =
      await axios.get(
        "http://localhost:5000/api/user/me",
        {
          withCredentials: true
        }
      );

    setUser(response.data);

  } catch {

    setUser(null);

  }

};
fetchUser();
  const savedTheme =
    localStorage.getItem("theme")
    || "light";

  setTheme(savedTheme);

  document.documentElement.setAttribute(
    "data-theme",
    savedTheme
  );

}, []);
const toggleTheme = () => {

  const newTheme =
    theme === "light"
      ? "dark"
      : "light";

  setTheme(newTheme);

  localStorage.setItem(
    "theme",
    newTheme
  );

  document.documentElement.setAttribute(
    "data-theme",
    newTheme
  );

};
const handleLogout = async () => {

  try {

    await axios.post(
      "http://localhost:5000/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );

    setUser(null);

  } catch (err) {

    console.log(err);

  }

};
  return (<div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50 min-h-16">

  <div className="flex-1">

    <Link
  to="/"
  className="flex items-center gap-3"
>
<img
  src={logo}
  alt="DevConnector"
  className="h-20 w-auto object-contain"
/>


</Link>

  </div>

  <div className="hidden md:flex">

    <input
      type="text"
      placeholder="Search developers..."
      className="input input-bordered w-72"
    />

  </div>

  <div className="flex items-center gap-2 ml-4">

    <Link
      to="/feed"
      className="btn btn-ghost"
    >
      Feed
    </Link>

    <Link
      to="/developers"
      className="btn btn-ghost"
    >
      Developers
    </Link>

 <button
  className="btn btn-ghost"
  onClick={toggleTheme}
>
  {theme === "light"
    ? "Dark"
    : "Light"}
</button>

  {user ? (

  <>

    <Link
      to="/dashboard"
      className="btn btn-ghost"
    >
      Dashboard
    </Link>

    <Link
      to="/my-posts"
      className="btn btn-ghost"
    >
      My Posts
    </Link>

    <Link
      to={`/profile/${user.name}`}
      className="btn btn-ghost"
    >
      Profile
    </Link>
     <button
  className="btn btn-error"
  onClick={handleLogout}
>
  Logout
</button>
  </>

) : (

  <>
    <Link
      to="/login"
      className="btn btn-primary"
    >
      Sign In
    </Link>

  </>

)}

  </div>

</div> );
}

export default Navbar;