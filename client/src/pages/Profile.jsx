import { useParams, } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
function Profile() {
const [profile, setProfile] = useState(null);
const [loading, setLoading] = useState(true);
  const { username } = useParams();
useEffect(() => {

  const fetchProfile = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/profile/${username}`
      );

      setProfile(response.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  fetchProfile();

}, [username]);

if (loading) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
  return (
  <div className="min-h-screen bg-base-200 py-10">

    <div className="max-w-4xl mx-auto px-4">

      <div className="bg-base-100 shadow-xl rounded-xl p-8">

        <h1 className="text-4xl font-bold">
          {profile?.username}
        </h1>

        <p className="mt-4 text-base-content/80">
          {profile?.bio || "No bio added yet"}
        </p>

        <div className="flex flex-wrap gap-6 mt-6">

          {profile?.company && (
            <p>
              🏢 {profile.company}
            </p>
          )}

          {profile?.location && (
            <p>
              📍 {profile.location}
            </p>
          )}

        </div>

      </div>

      {/* Skills */}

      <div className="bg-base-100 shadow-xl rounded-xl p-8 mt-6">

        <h2 className="text-2xl font-semibold mb-4">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {profile?.skills?.map((skill) => (
            <div
              key={skill}
              className="badge badge-primary badge-lg"
            >
              {skill}
            </div>
          ))}

        </div>

      </div>

      {/* Social Links */}

      <div className="bg-base-100 shadow-xl rounded-xl p-8 mt-6">

        <h2 className="text-2xl font-semibold mb-4">
          Social Links
        </h2>

        <div className="flex flex-wrap gap-3">

          {profile?.socials?.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              GitHub
            </a>
          )}

          {profile?.socials?.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              LinkedIn
            </a>
          )}

          {profile?.socials?.x && (
            <a
              href={profile.socials.x}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              X
            </a>
          )}

          {profile?.socials?.portfolio && (
            <a
              href={profile.socials.portfolio}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Portfolio
            </a>
          )}

        </div>

      </div>

    </div>

  </div>
);
}

export default Profile;