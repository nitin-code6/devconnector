import { useEffect, useState } from "react";
import axios from "axios";


import registerLight from "../assets/register-light.png";
import registerDark from "../assets/register-dark.png";
function EditProfile() {
const [username, setUsername] = useState("");
const [skills, setSkills] = useState("");
const [bio, setBio] = useState("");
const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "light"
);
const [company, setCompany] = useState("");
const [location, setLocation] = useState("");

const [github, setGithub] = useState("");
const [linkedin, setLinkedin] = useState("");
const [x, setX] = useState("");
const [portfolio, setPortfolio] = useState("");

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
useEffect(() => {

  const fetchProfile = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/profile/me",
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      const profile = response.data;

setUsername(profile.username || "");
setBio(profile.bio || "");
setCompany(profile.company || "");
setLocation(profile.location || "");
setSkills(
  profile.skills?.join(", ") || ""
);
setGithub(
  profile.socials?.github || ""
);

setLinkedin(
  profile.socials?.linkedin || ""
);

setX(
  profile.socials?.x || ""
);

setPortfolio(
  profile.socials?.portfolio || ""
);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  fetchProfile();

}, []);
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
      portfolio,
    };

    await axios.put(
      "http://localhost:5000/api/profile/update",
      {
        username,
        bio,
        skills: skillsArray,
        company,
        location,
        socials,
      },
      {
        withCredentials: true,
      }
    );

    setSuccess("Profile updated successfully");

  } catch (err) {

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
if (loading) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
  return (

<div
  className="min-h-[calc(100vh-72px)] bg-cover bg-center py-10"
  style={{
    backgroundImage: `url(${bgImage})`,
  }}
>

  <div className="max-w-3xl mx-auto px-4">

    <div
      className="
      bg-base-100/70
      backdrop-blur-xl
      shadow-2xl
      rounded-3xl
      border
      border-base-300
      p-6 lg:p-8
      "
    >

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Edit

          <span className="text-lime-500 ml-2">
            Profile
          </span>

        </h1>

        <p className="text-base-content/60 mt-2">

          Keep your profile updated and
          showcase your latest skills.

        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Basic Information */}

        <div>

          <h2 className="text-xl font-bold text-sky-500 mb-4">
            Basic Information
          </h2>

          <div className="space-y-4">

            <input
              className="input input-bordered h-11 w-full"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
            />

            <div className="grid md:grid-cols-2 gap-4">

              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) =>
                  setCompany(
                    e.target.value
                  )
                }
              />

              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </div>

        {/* Professional Information */}

        <div>

          <h2 className="text-xl font-bold text-sky-500 mb-4">
            Professional Information
          </h2>

          <div className="space-y-4">

            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="React, Node.js, MongoDB"
              value={skills}
              onChange={(e) =>
                setSkills(
                  e.target.value
                )
              }
            />

            <textarea
              className="
              textarea
              textarea-bordered
              w-full
              h-24
              "
              placeholder="Bio"
              value={bio}
              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* Social Links */}

        <div>

     <h2 className="text-xl font-bold text-sky-500 mb-2">
  🔗 Social Links
</h2>

<p className="text-sm opacity-60 mb-4">
  Add your professional profiles and portfolio.
</p>

         <div className="space-y-5">

            <input
              className="input input-bordered h-11 w-full"
              placeholder="GitHub URL"
              value={github}
              onChange={(e) =>
                setGithub(
                  e.target.value
                )
              }
            />

            <input
             className="input input-bordered h-11 w-full"
              placeholder="LinkedIn URL"
              value={linkedin}
              onChange={(e) =>
                setLinkedin(
                  e.target.value
                )
              }
            />

            <input
              
             className="input input-bordered h-11 w-full" placeholder="X URL"
              value={x}
              onChange={(e) =>
                setX(
                  e.target.value
                )
              }
            />

            <input
          className="input input-bordered h-11 w-full"
              placeholder="Portfolio URL"
              value={portfolio}
              onChange={(e) =>
                setPortfolio(
                  e.target.value
                )
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
          h-14
          text-lg
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
            ? "Updating..."
            : "Update Profile"}

        </button>

      </form>

    </div>

  </div>

</div>

);

}

export default EditProfile;