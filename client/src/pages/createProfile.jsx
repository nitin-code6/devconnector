import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function CreateProfile() {
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

  return (
   <div className="min-h-screen bg-base-200 py-10">
  <div className="max-w-4xl mx-auto px-4">
    <form
  onSubmit={handleSubmit}
  className="bg-base-100 shadow-xl rounded-xl p-8 space-y-6"
>
  <div>
    <h2 className="text-2xl font-bold">
      Create Your Profile
    </h2>

    <p className="text-base-content/70 mt-1">
      Tell the developer community about yourself
    </p>
  </div>

  {/* Basic Information */}

  <div>
    <h3 className="text-lg font-semibold mb-4">
      Basic Information
    </h3>

    <div className="space-y-4">

      <div>
        <label className="label">
          <span className="label-text">
            Username
            <span className="text-error ml-1">*</span>
          </span>
        </label>

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="label">
            <span className="label-text">
              Company
            </span>
          </label>

          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">
              Location
            </span>
          </label>

          <input
            className="input input-bordered w-full"
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
  </div>

  {/* Professional Information */}

  <div>
    <h3 className="text-lg font-semibold mb-4">
      Professional Information
    </h3>

    <div className="space-y-4">

      <div>
        <label className="label">
          <span className="label-text">
            Skills
            <span className="text-error ml-1">*</span>
          </span>

          <span className="label-text-alt">
            Comma separated
          </span>
        </label>

        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="React, Node.js, MongoDB"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">
            Bio
          </span>
        </label>

        <textarea
          className="textarea textarea-bordered w-full h-32"
          placeholder="Tell us about yourself"
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
        />
      </div>

    </div>
  </div>

  {/* Social Links */}

  <div>
    <h3 className="text-lg font-semibold mb-4">
      Social Links
    </h3>

    <div className="grid md:grid-cols-2 gap-4">

      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="GitHub URL"
        value={github}
        onChange={(e) =>
          setGithub(e.target.value)
        }
      />

      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="LinkedIn URL"
        value={linkedin}
        onChange={(e) =>
          setLinkedin(e.target.value)
        }
      />

      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="X Profile URL"
        value={x}
        onChange={(e) =>
          setX(e.target.value)
        }
      />

      <input
        className="input input-bordered w-full"
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
      ? "Creating Profile..."
      : "Create Profile"}
  </button>
</form>
  </div>
</div>
  );
}

export default CreateProfile;