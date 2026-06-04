import { Link } from "react-router";
import defaultAvatar from "../assets/icon.png";

function FeedSidebar({ user }) {

  return (

    <div className="sticky top-20 space-y-4">

      {/* Profile Card */}

      <div
        className="
        card
        bg-base-100
        shadow-md
        border
        border-base-300
        "
      >

        <div className="card-body items-center text-center">

          <div className="avatar">

            <div
              className="
              w-20
              rounded-full
              ring
              ring-sky-500
              ring-offset-base-100
              ring-offset-2
              "
            >

              <img
                src={
                  user?.avatar ||
                  defaultAvatar
                }
                alt="avatar"
              />

            </div>

          </div>

          <h2 className="font-bold text-lg">
            {user?.name}
          </h2>

          <p className="text-sm opacity-60">

            @{user?.name
              ?.toLowerCase()
              ?.replace(/\s+/g, "")}

          </p>

          <div className="divider my-1"></div>

          <Link
            to="/profile/me"
            className="
            btn
            btn-outline
            btn-sm
            w-full
            "
          >
            View Profile
          </Link>

        </div>

      </div>

      {/* Create Post */}

      <Link
        to="/create-post"
        className="
        btn
        w-full
        border-0
        text-white
        bg-gradient-to-r
        from-sky-500
        to-lime-500
        hover:from-sky-600
        hover:to-lime-600
        shadow-md
        "
      >
        + Create Post
      </Link>

      {/* Quick Links */}

      <div
        className="
        card
        bg-base-100
        shadow-md
        border
        border-base-300
        "
      >

        <div className="card-body">

          <h3 className="font-semibold">
            Quick Links
          </h3>

          <div className="space-y-2">

            <Link
              to="/feed"
              className="btn btn-ghost justify-start"
            >
              🏠 Feed
            </Link>

            <Link
              to="/developers"
              className="btn btn-ghost justify-start"
            >
              👥 Developers
            </Link>

            <Link
              to="/myPosts"
              className="btn btn-ghost justify-start"
            >
              📝 My Posts
            </Link>

            <Link
              to="/profile/me"
              className="btn btn-ghost justify-start"
            >
              👤 My Profile
            </Link>

            <Link
              to="/editProfile"
              className="btn btn-ghost justify-start"
            >
              ⚙️ Settings
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}

export default FeedSidebar;