import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import AvatarUpload from "../component/AvatarUpload";
import FeedRightbar from "../component/FeedRightbar";
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
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">

      {/* Profile Header */}
{/* Cover Banner */}

<div className="h-24 rounded-t-3xl bg-gradient-to-r from-sky-500 to-lime-500"></div>

{/* Profile Header */}

<div className="bg-base-100 rounded-b-3xl shadow-lg border border-base-300 p-6">

  <div className="flex flex-col lg:flex-row justify-between gap-8">

    {/* Left Side */}

    <div className="flex flex-col md:flex-row gap-6">

      <div className="relative -mt-12">

        <AvatarUpload
          currentAvatar={profile.user.avatar}
          onSuccess={fetchProfile}
        />

      </div>

      <div>

        <h1 className="text-3xl lg:text-4xl font-bold">
          {profile.user.name}
        </h1>

        <p className="text-base opacity-60">
          @{profile.username}
        </p>

        <p className="mt-4 max-w-2xl">
          {profile.bio ||
            "Passionate developer building amazing things."}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm opacity-80">

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

        {/* Stats */}

        <div className="flex gap-10 mt-4">

          <div>

            <p className="font-bold text-xl">
              0
            </p>

            <p className="text-sm opacity-70">
              Followers
            </p>

          </div>

          <div>

            <p className="font-bold text-xl">
              0
            </p>

            <p className="text-sm opacity-70">
              Following
            </p>

          </div>

          <div>

            <p className="font-bold text-xl">
              0
            </p>

            <p className="text-sm opacity-70">
              Posts
            </p>

          </div>

        </div>

      </div>

    </div>

    {/* Right Side */}

    <div className="flex gap-2">

      <Link
        to="/editProfile"
        className="
        btn
        bg-sky-500
        hover:bg-sky-600
        border-0
        text-white
        "
      >
        Edit Profile
      </Link>

      <button
        className="
        btn
        btn-outline
        "
      >
        ⚙️
      </button>

    </div>

  </div>

</div>

      {/* Content */}
<div className="mt-6 grid lg:grid-cols-3 gap-6">

        {/* Basic Information */}
<div className="lg:col-span-2 space-y-6">
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
                      className="
badge
badge-lg
bg-sky-500
text-white
border-0
"
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
<div className="card bg-base-100 shadow-lg border border-base-300">

  <div className="card-body">

    <h2 className="card-title">
      Recent Posts
    </h2>

<div className="text-center py-8 opacity-60">

  No posts yet.

  <div className="mt-2 text-sm">
    Share your first post with the community.
  </div>

</div>

  </div>
</div>
</div>
<div>
  <FeedRightbar />
</div>
      
      </div>

    </div>
  );
}

export default MyProfile;