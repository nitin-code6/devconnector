import { useState, useEffect } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router";

import registerLight from "../assets/register-light.png";
import registerDark from "../assets/register-dark.png";

function Register() {
const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  useEffect(() => {

    const handleThemeChange = () => {

      setTheme(
        localStorage.getItem("theme") || "light"
      );

    };

    window.addEventListener(
      "themeChanged",
      handleThemeChange
    );

    return () => {

      window.removeEventListener(
        "themeChanged",
        handleThemeChange
      );

    };

  }, []);

  const handleSubmit = async (e) => {

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
          password,
        }
      );

     setSuccess(
  "Registration successful! Redirecting to login..."
);
      setName("");
      setEmail("");
      setPassword("");


setTimeout(() => {
  navigate("/login");
}, 1500);


    } catch (err) {

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

    } finally {

      setLoading(false);

    }

  };

  const bgImage =
    theme === "dark"
      ? registerDark
      : registerLight;

 return (

<div
  className="min-h-[calc(100vh-72px)] bg-cover bg-center"
  style={{
    backgroundImage: `url(${bgImage})`,
  }}
>

    <div className="min-h-screen">

      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex items-center px-20">

          <div>

            <h1 className="text-6xl font-extrabold leading-tight">

              <span className="text-base-content">
                Connect.
              </span>

              <br />

              <span className="text-sky-500">
                Share.
              </span>

              <br />

              <span className="text-lime-500">
                Grow.
              </span>

            </h1>

            <p className="mt-6 text-xl max-w-xl leading-9">

              Join a community of
              developers to showcase
              projects, exchange ideas,
              and accelerate growth
              together.

            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

       <div className="flex items-center justify-start lg:justify-center px-6">

          <div className="w-full max-w-md lg:max-w-lg">

            {/* MOBILE HERO */}

            <div className="lg:hidden text-center mb-6">

              <h1 className="text-4xl font-bold">

                <span className="text-base-content">
                  Connect.
                </span>

                <br />

                <span className="text-sky-500">
                  Share.
                </span>

                <br />

                <span className="text-lime-500">
                  Grow.
                </span>

              </h1>

            </div>

            {/* CARD */}

            <div
              className="
              bbg-base-100/70
backdrop-blur-xl
              shadow-2xl
              rounded-3xl
              border
              border-base-300
              overflow-hidden
              "
            >

              <div className="p-6 lg:p-8">

                <h2 className="text-4xl lg:text-5xl font-bold">

                  Create 
                 {" "}

                  <span className="text-lime-500 hover:text-sky-500 transition-colors">
                    Account
                  </span>

                </h2>

                <p className="mt-2 text-base-content/70">

                  Start your journey
                  with DevConnector

                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 mt-6"
                >

                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Password"
                      className="input input-bordered w-full"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      className="absolute right-4 top-3"
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

                {error && (
  <div
    className="
    w-full
    rounded-xl
    border
    border-orange-500/30
    bg-orange-500/10
    text-orange-300
    px-4
    py-3
    break-words
    "
  >
    {error}
  </div>
)}

                 {success && (
  <div
    className="
    w-full
    rounded-xl
    border
    border-lime-500/30
    bg-lime-500/10
    text-lime-400
    px-4
    py-3
    break-words"
  >
    {success}
  </div>
)}

                  <button
                    type="submit"
                    disabled={loading}
                   className="
btn
w-full
h-14
border-0
bg-sky-500
text-white
hover:bg-sky-600
transition-all
duration-300
"
                  >

                    {loading
                      ? "Creating..."
                      : "Create Account"}

                  </button>

                </form>

                <div className="text-center mt-6">

                  <p>

                    Already have an account?

                    <Link
                      to="/login"
                      className="
                      ml-2
                      text-sky-500
                      font-semibold
                      "
                    >

                      Sign In

                    </Link>

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

);

}

export default Register;