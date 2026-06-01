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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow">
        <div className="flex-1">
          <h1 className="text-xl font-bold">
            DevConnector
          </h1>
        </div>

        <div>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6"><div className="max-w-6xl mx-auto p-6">

  <div className="mb-8">
    <h1 className="text-4xl font-bold">
      Dashboard
    </h1>

    <p className="text-base-content/70 mt-2">
      Welcome back, {user?.name} 👋
    </p>
  </div>

  <div className="grid lg:grid-cols-2 gap-6">

    {/* User Information */}

    <div className="bg-base-100 rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        User Information
      </h2>

      <div className="space-y-2">

        <p>
          <span className="font-medium">
            Name:
          </span>{" "}
          {user?.name}
        </p>

        <p>
          <span className="font-medium">
            Email:
          </span>{" "}
          {user?.email}
        </p>

      </div>

    </div>

    {/* Profile Status */}

    <div className="bg-base-100 rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Profile Status
      </h2>

      {profile ? (
        <div>

          <p className="text-success mb-4">
            ✅ Profile Created
          </p>

          <Link
            to="/editProfile"
            className="btn btn-outline"
          >
            Edit Profile
          </Link>

        </div>
      ) : (
        <div>

          <p className="text-error mb-4">
            ❌ Profile Not Created
          </p>

          <Link
            to="/createProfile"
            className="btn btn-primary"
          >
            Create Profile
          </Link>

        </div>
      )}

    </div>

  </div>

  {/* Quick Actions */}

  <div className="bg-base-100 rounded-xl shadow p-6 mt-6">

    <h2 className="text-xl font-semibold mb-4">
      Quick Actions
    </h2>

    <div className="flex flex-wrap gap-3">

      <button
        className="btn btn-outline"
        disabled
      >
        My Posts
      </button>

      <button
        className="btn btn-outline"
        disabled
      >
        Connections
      </button>

      <button
        className="btn btn-outline"
        disabled
      >
        Settings
      </button>

    </div>

  </div>

</div></div>
    </div>
  );
}

export default Dashboard;