import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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

      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <h2 className="text-xl mt-2">
          Welcome Back, {user?.name} 👋
        </h2>

        <div className="mt-6 bg-base-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">
            User Information
          </h3>

          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <div className="mt-6 bg-base-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">
            Profile Status
          </h3>

          {profile ? (
            <p className="text-success">
              ✅ Profile Created
            </p>
          ) : (
            <p className="text-error">
              ❌ Profile Not Created
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;