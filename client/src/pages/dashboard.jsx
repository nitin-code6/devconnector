import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router";
function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch logged in user
        const response = await axios.get(
          "http://localhost:5000/api/user/me",
          {
            withCredentials: true,
          }
        );

        setUser(response.data);

        // Fetch profile
        try {
          const profileResponse = await axios.get(
            "http://localhost:5000/api/profile/me",
            {
              withCredentials: true,
            }
          );

          setProfile(profileResponse.data);
        } catch (err) {
          console.log("Profile not found");
        }

      } catch (err) {
        console.log(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteProfile = async () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete your profile?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      "http://localhost:5000/api/profile/delete",
      {
        withCredentials: true,
      }
    );

    setProfile(null);



  } catch (err) {

    console.log(err);

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

<div className="min-h-screen bg-base-200">

  <div className="max-w-6xl mx-auto p-6">

    {/* Header */}

    <div className="mb-8">

      <h1 className="text-4xl font-bold">

        Welcome Back,

        <span className="text-lime-500 ml-2">
          {user?.name}
        </span>

      </h1>

      <p className="text-base-content/70 mt-2">

        Manage your profile, posts and
        developer activity.

      </p>

    </div>

    {/* Top Cards */}

    <div className="grid md:grid-cols-3 gap-6">

      {/* User Card */}

      <div
        className="
        card
        bg-base-100
        shadow-lg
        border
        border-base-300
        "
      >

        <div className="card-body">

          <h2 className="card-title">
            Account
          </h2>

          <p>
            <strong>Name:</strong>
            {" "}
            {user?.name}
          </p>

          <p>
            <strong>Email:</strong>
            {" "}
            {user?.email}
          </p>

        </div>

      </div>

      {/* Profile Status */}

      <div
        className="
        card
        bg-base-100
        shadow-lg
        border
        border-base-300
        "
      >

        <div className="card-body">

          <h2 className="card-title">
            Profile
          </h2>

          <p>

            {profile
              ? "Profile Completed ✅"
              : "Profile Not Created ❌"}

          </p>

        </div>

      </div>

      {/* Posts */}

      <div
        className="
        card
        bg-base-100
        shadow-lg
        border
        border-base-300
        "
      >

        <div className="card-body">

          <h2 className="card-title">
            Activity
          </h2>

          <p>
            Start sharing your projects
            and ideas with the community.
          </p>

        </div>

      </div>

    </div>

    {/* Main Actions */}

    <div
      className="
      card
      bg-base-100
      shadow-lg
      border
      border-base-300
      mt-6
      "
    >

      <div className="card-body">

        <h2 className="text-2xl font-bold">

          Quick Actions

        </h2>

        <div className="flex flex-wrap gap-3 mt-4">

          {profile ? (

            <>

              <Link
                to={`/profile/${profile.username}`}
                className="
                btn
                bg-sky-500
                hover:bg-sky-600
                text-white
                border-0
                "
              >
                View Profile
              </Link>

              <Link
                to="/editProfile"
                className="btn btn-outline"
              >
                Edit Profile
              </Link>

              <Link
                to="/create-post"
                className="
                btn
                bg-lime-500
                hover:bg-lime-600
                text-white
                border-0
                "
              >
                Create Post
              </Link>

              <Link
                to="/myPosts"
                className="btn btn-outline"
              >
                My Posts
              </Link>

              <button
                className="btn btn-error"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </button>

            </>

          ) : (

            <Link
              to="/createProfile"
              className="
              btn
              bg-sky-500
              hover:bg-sky-600
              text-white
              border-0
              "
            >
              Create Profile
            </Link>

          )}

        </div>

      </div>

    </div>

    {/* Navigation Cards */}

    <div className="grid md:grid-cols-3 gap-6 mt-6">

      <Link
        to="/feed"
        className="
        card
        bg-base-100
        shadow-md
        border
        border-base-300
        hover:shadow-xl
        transition
        "
      >

        <div className="card-body">

          <h3 className="font-bold text-xl">
            Feed
          </h3>

          <p>
            Explore community posts.
          </p>

        </div>

      </Link>

      <Link
        to="/developers"
        className="
        card
        bg-base-100
        shadow-md
        border
        border-base-300
        hover:shadow-xl
        transition
        "
      >

        <div className="card-body">

          <h3 className="font-bold text-xl">
            Developers
          </h3>

          <p>
            Discover developer profiles.
          </p>

        </div>

      </Link>

      <Link
        to="/jobs"
        className="
        card
        bg-base-100
        shadow-md
        border
        border-base-300
        hover:shadow-xl
        transition
        "
      >

        <div className="card-body">

          <h3 className="font-bold text-xl">
            Jobs
          </h3>

          <p>
            Find opportunities.
          </p>

        </div>

      </Link>

    </div>

    {/* Logout */}

    <div className="mt-8">

      <button
        onClick={handleLogout}
        className="
        btn
        btn-outline
        btn-error
        "
      >
        Logout
      </button>

    </div>

  </div>

</div>

);
}

export default Dashboard;