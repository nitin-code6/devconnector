import { useState,useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router";
import { useNavigate } from "react-router";

import registerLight from "../assets/register-light.png";
import registerDark from "../assets/register-dark.png";
function Login() {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const [loading, setLoading] = useState(false);
const   [showPassword,setShowPassword]=useState(false);
const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "light"
);

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
const bgImage =
  theme === "dark"
    ? registerDark
    : registerLight;
const handleSubmit = async (e) => {

   e.preventDefault();

   try {

      setError("");
      setSuccess("");
       
      setLoading(true);
     

const response = await axios.post(
   "http://localhost:5000/api/user/login",
   {
      email,
      password
   },
   {
      withCredentials: true
   }
);

      setSuccess( response.data.message || response.data);
    
setEmail("");
setPassword("");
setSuccess(
  "Login successful! Redirecting..."
);

setTimeout(() => {
  navigate("/dashboard ");
}, 1000);
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

            <span>
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

              <span>
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
            bg-base-100/70
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

                Welcome{" "}

                <span className="text-lime-500">
                  Back
                </span>

              </h2>

              <p className="mt-2 text-base-content/70">

                Sign in to continue your
                developer journey

              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 mt-6"
              >

                <input
                  type="email"
                  placeholder="Email Address"
                  className="
                  input
                  input-bordered
                  w-full
                  bg-base-200/60
                  "
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
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
                    className="
                    input
                    input-bordered
                    w-full
                    bg-base-200/60
                    "
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="
                    absolute
                    right-4
                    top-3
                    text-sm
                    "
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

                <div className="text-right">

                  <button
                    type="button"
                    className="
                    text-sm
                    text-sky-500
                    hover:text-lime-500
                    "
                  >
                    Forgot Password?
                  </button>

                </div>

                {error && (

                  <div
                    className="
                    rounded-xl
                    border
                    border-orange-500/30
                    bg-orange-500/10
                    text-orange-300
                    px-4
                    py-3
                    "
                  >
                    {error}
                  </div>

                )}

                {success && (

                  <div
                    className="
                    rounded-xl
                    border
                    border-lime-500/30
                    bg-lime-500/10
                    text-lime-400
                    px-4
                    py-3
                    "
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
                    ? "Signing In..."
                    : "Sign In"}

                </button>

                <button
                  type="button"
                  disabled
                  className="
                  btn
                  btn-outline
                  w-full
                  "
                >
                  Continue with Google
                </button>

              </form>

              <div className="text-center mt-6">

                <p>

                  Don't have an account?

                  <Link
                    to="/register"
                    className="
                    ml-2
                    text-sky-500
                    font-semibold
                    "
                  >

                    Register

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

export default Login;