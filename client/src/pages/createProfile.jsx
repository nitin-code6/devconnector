import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import registerLight from "../assets/register-light.png";
import registerDark from "../assets/register-dark.png";
import { useNavigate } from "react-router";
function CreateProfile() {
  const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "light"
);
  const [username, setUsername] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [company, setCompany] = useState("");
const [location, setLocation] = useState("");
const [github, setGithub] = useState("");
const [linkedin, setLinkedin] = useState("");
const [x, setX] = useState("");
const [portfolio, setPortfolio] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

     
      const socials = {
  github,
  linkedin,
  x,
  portfolio
};
 console.log({
        username,
        bio,
        skills: skillsArray,
        socials,
      });
      const response = await axios.post(
  "http://localhost:5000/api/profile/create",
  {
    username,
    bio,
    skills: skillsArray,
    company,
    location,
    socials
  },
  {
    withCredentials: true
  }
);
  console.log(response.data);
        navigate("/dashboard");
      setSuccess("Profile created successfully");

      console.log(response.data);

    } catch (err) {
      console.log(err.response?.data);

      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
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

return (

<div
  className="min-h-[calc(100vh-72px)] bg-cover bg-center py-8"
  style={{
    backgroundImage: `url(${bgImage})`,
  }}
>

  <div className="max-w-4xl mx-auto px-4">

    <form
      onSubmit={handleSubmit}
      className="
      bg-base-100/70
      backdrop-blur-xl
      shadow-2xl
      rounded-3xl
      border
      border-base-300
      p-6 lg:p-8
      space-y-8
      "
    >

      {/* Header */}

      <div>

        <h2 className="text-3xl lg:text-4xl font-bold">

          Create

          <span className="text-lime-500 ml-2">
            Profile
          </span>

        </h2>

        <p className="text-base-content/60 mt-2">

          Tell the developer community
          about yourself.

        </p>

      </div>

      {/* Basic Information */}

      <div>

        <h3 className="text-xl font-bold text-sky-500 mb-4">
          Basic Information
        </h3>

        <div className="space-y-4">

          <input
            className="input input-bordered h-11 w-full"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="input input-bordered h-11 w-full"
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
            />

            <input
              className="input input-bordered h-11 w-full"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />

          </div>

        </div>

      </div>

      {/* Professional Information */}

      <div>

        <h3 className="text-xl font-bold text-sky-500 mb-4">
          Professional Information
        </h3>

        <div className="space-y-4">

          <input
            className="input input-bordered h-11 w-full"
            type="text"
            placeholder="React, Node.js, MongoDB"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
          />

          <textarea
            className="
            textarea
            textarea-bordered
            w-full
            h-24
            "
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
          />

        </div>

      </div>

      {/* Social Links */}

      <div>

        <h3 className="text-xl font-bold text-sky-500 mb-1">
          🔗 Social Links
        </h3>

        <p className="text-sm opacity-60 mb-4">
          Add your professional profiles and portfolio.
        </p>

        <div className="space-y-4">

          <input
            className="input input-bordered h-11 w-full"
            type="text"
            placeholder="GitHub URL"
            value={github}
            onChange={(e) =>
              setGithub(e.target.value)
            }
          />

          <input
            className="input input-bordered h-11 w-full"
            type="text"
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) =>
              setLinkedin(e.target.value)
            }
          />

          <input
            className="input input-bordered h-11 w-full"
            type="text"
            placeholder="X URL"
            value={x}
            onChange={(e) =>
              setX(e.target.value)
            }
          />

          <input
            className="input input-bordered h-11 w-full"
            type="text"
            placeholder="Portfolio URL"
            value={portfolio}
            onChange={(e) =>
              setPortfolio(e.target.value)
            }
          />

        </div>

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
        h-12
        text-base
        border-0
        text-white
        bg-gradient-to-r
        from-sky-500
        to-lime-500
        hover:from-sky-600
        hover:to-lime-600
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-300
        "
      >

        {loading
          ? "Creating Profile..."
          : "Create Profile"}

      </button>

    </form>

  </div>

</div>

);
}

export default CreateProfile;