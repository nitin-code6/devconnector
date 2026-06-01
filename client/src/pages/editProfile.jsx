import { useEffect, useState } from "react";
import axios from "axios";

function EditProfile() {
const [username, setUsername] = useState("");
const [skills, setSkills] = useState("");
const [bio, setBio] = useState("");

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
if (loading) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
  return (
  <div className="min-h-screen bg-base-200 p-6">
    <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-xl p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit Profile
      </h1>

      <form
  onSubmit={handleSubmit}
  className="space-y-4"
>

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Skills"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Bio"
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
        />

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
        />

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="GitHub"
          value={github}
          onChange={(e) =>
            setGithub(e.target.value)
          }
        />

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="LinkedIn"
          value={linkedin}
          onChange={(e) =>
            setLinkedin(e.target.value)
          }
        />

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="X"
          value={x}
          onChange={(e) =>
            setX(e.target.value)
          }
        />

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Portfolio"
          value={portfolio}
          onChange={(e) =>
            setPortfolio(e.target.value)
          }
        />
        {error && (
  <div className="alert alert-error">
    <span>{error}</span>
  </div>
)}

{success && (
  <div className="alert alert-success">
    <span>{success}</span>
  </div>
)}
        <button
  type="submit"
  disabled={loading}
  className="btn btn-primary w-full"
>
  {loading
    ? "Updating..."
    : "Update Profile"}
</button>
      </form>

    </div>
  </div>
);

}

export default EditProfile;