import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import logo from "../assets/logo.png";
import defaultAvatar from "../assets/icon.png";

import { FiMoon, FiSun, FiBell } from "react-icons/fi";

function Navbar() {

  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

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

      } catch {

        setUser(null);

      }

    };

    fetchUser();

    const savedTheme =
      localStorage.getItem("theme") || "light";

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
          withCredentials: true
        }
      );

      setUser(null);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">

      {/* Logo */}

      <div className="flex-1">

        <Link
          to="/"
          className="flex items-center"
        >

          <img
            src={logo}
            alt="DevConnector"
            className="h-14 w-auto"
          />

        </Link>

      </div>

      {/* Center Menu */}

      <div className="hidden md:flex gap-2">

        <Link
          to="/feed"
          className="btn btn-ghost"
        >
          Home
        </Link>

        <Link
          to="/developers"
          className="btn btn-ghost"
        >
          Developers
        </Link>

        <Link
          to="/jobs"
          className="btn btn-ghost"
        >
          Jobs
        </Link>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-2">

        {/* Theme */}

        <button
          className="btn btn-ghost btn-circle"
          onClick={toggleTheme}
        >

          {
            theme === "light"
              ? <FiMoon size={20} />
              : <FiSun size={20} />
          }

        </button>

        {/* Notification */}

        {
          user && (
            <button
              className="btn btn-ghost btn-circle"
            >
              <FiBell size={20} />
            </button>
          )
        }

        {/* User Menu */}

        {
          user ? (

            <div className="dropdown dropdown-end">

              <div
                tabIndex={0}
                role="button"
                className="avatar cursor-pointer"
              >

                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                  <img
                    src={
                      user.avatar ||
                      defaultAvatar
                    }
                    alt="Profile"
                  />

                </div>

              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
              >

                <li>
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
  to="/profile/me"
>
  My Profile
</Link>
                </li>

                <li>
                  <Link to="/editProfile">
                    Edit Profile
                  </Link>
                </li>

                <li>
                  <Link to="/myPosts">
                    My Posts
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

              </ul>

            </div>

          ) : (

            <Link
              to="/login"
              className="btn btn-primary"
            >
              Sign In
            </Link>

          )
        }

      </div>

    </div>

  );

}

export default Navbar;