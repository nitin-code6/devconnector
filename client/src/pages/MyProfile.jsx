import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import AvatarUpload from "../component/AvatarUpload";
function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
 const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/profile/me",
          {
            withCredentials: true,
          }
        );

        setProfile(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
   
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-20">
        Profile not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Profile Header */}

      <div className="bg-base-100 rounded-2xl shadow-md p-8">

        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Left Side */}

          <div className="flex gap-6">

            <div className="relative">

             <AvatarUpload
  currentAvatar={profile.user.avatar}
  onSuccess={fetchProfile}
/>

     

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {profile.user.name}
              </h1>

              <p className="text-lg opacity-70 mt-1">
                @{profile.username}
              </p>

              <p className="mt-2">
                {profile.bio || "No bio available"}
              </p>

              <div className="mt-3 flex flex-wrap gap-4 text-sm opacity-80">

                {profile.location && (
                  <span>
                    📍 {profile.location}
                  </span>
                )}

                {profile.company && (
                  <span>
                    🏢 {profile.company}
                  </span>
                )}

              </div>

              <div className="mt-3 flex gap-2 text-primary">

                <span>0 Followers</span>

                <span>•</span>

                <span>0 Following</span>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex gap-2">

            <Link
              to="/edit-profile"
              className="btn btn-outline"
            >
              Edit Profile
            </Link>

            <button className="btn btn-square btn-outline">
              ⚙️
            </button>

          </div>

        </div>

        {/* Tabs */}

        <div className="tabs tabs-bordered mt-8">

          <a className="tab tab-active">
            Overview
          </a>

          <a className="tab">
            Posts
          </a>

          <a className="tab">
            Bookmarks
          </a>

        </div>

      </div>

      {/* Content */}

      <div className="mt-6 space-y-6">

        {/* Basic Information */}

        <div className="card bg-base-100 shadow-md">

          <div className="card-body">

            <h2 className="card-title">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-4">

              <div>
                <p className="font-semibold">
                  Name
                </p>

                <p>{profile.user.name}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Username
                </p>

                <p>{profile.username}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Email
                </p>

                <p>{profile.user.email}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Location
                </p>

                <p>
                  {profile.location || "Not Added"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* About */}

        <div className="card bg-base-100 shadow-md">

          <div className="card-body">

            <h2 className="card-title">
              About Me
            </h2>

            <p>
              {profile.bio || "No bio added yet"}
            </p>

          </div>

        </div>

        {/* Skills */}

        <div className="card bg-base-100 shadow-md">

          <div className="card-body">

            <h2 className="card-title">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">

              {profile.skills?.length > 0 ? (
                profile.skills.map(
                  (skill, index) => (
                    <div
                      key={index}
                      className="badge badge-primary badge-lg"
                    >
                      {skill}
                    </div>
                  )
                )
              ) : (
                <p>No skills added yet</p>
              )}

            </div>

          </div>

        </div>

        {/* Social Links */}

        <div className="card bg-base-100 shadow-md">

          <div className="card-body">

            <h2 className="card-title">
              Social Links
            </h2>

            <div className="flex gap-4">

              {profile.socials?.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  GitHub
                </a>
              )}

              {profile.socials?.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  LinkedIn
                </a>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MyProfile;