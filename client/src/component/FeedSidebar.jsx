function FeedSidebar({ user }) {
  return (
    <div className="sticky top-20 space-y-4">

      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body items-center text-center">

          <div className="avatar placeholder">
            <div className="bg-success text-white rounded-full w-16">
              <span>
                {user?.name?.[0]}
              </span>
            </div>
          </div>

          <h2 className="font-bold">
            {user?.name}
          </h2>

          <p className="opacity-70">
            Developer
          </p>

        </div>
      </div>

      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body">

          <h3 className="font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-2">

            <li>🏠 Feed</li>
            <li>👥 Developers</li>
            <li>📝 My Posts</li>
            <li>⚙ Settings</li>

          </ul>

        </div>
      </div>

    </div>
  );
}

export default FeedSidebar;