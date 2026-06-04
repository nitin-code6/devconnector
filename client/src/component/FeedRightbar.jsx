function FeedRightbar() {
  return (

    <div className="sticky top-24 space-y-5">

      {/* Trending Skills */}

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

          <h3
            className="
            text-lg
            font-bold
            "
          >
            🔥 Trending Skills
          </h3>

          <div className="flex flex-wrap gap-2 mt-2">

            <span
              className="
              badge
              bg-sky-500
              text-white
              border-0
              "
            >
              React
            </span>

            <span
              className="
              badge
              bg-lime-500
              text-white
              border-0
              "
            >
              NodeJS
            </span>

            <span
              className="
              badge
              bg-sky-500
              text-white
              border-0
              "
            >
              MongoDB
            </span>

            <span
              className="
              badge
              bg-lime-500
              text-white
              border-0
              "
            >
              Express
            </span>

          </div>

        </div>

      </div>

      {/* Community Tip */}

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

          <h3 className="text-lg font-bold">
            💡 Community Tip
          </h3>

          <p className="opacity-80">

            Share what you learn.
            Consistency builds reputation.

          </p>

        </div>

      </div>

      {/* Profile Completion */}

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

          <h3 className="text-lg font-bold">
            🚀 Profile Strength
          </h3>

          <progress
            className="
            progress
            progress-info
            w-full
            "
            value="60"
            max="100"
          />

          <p className="text-sm opacity-70">

            Complete your profile to
            attract more developers.

          </p>

        </div>

      </div>

      {/* Community Stats */}

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

          <h3 className="text-lg font-bold">
            🌍 Community
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">

              <span>
                Developers
              </span>

              <span className="font-bold">
                2.3K
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Posts
              </span>

              <span className="font-bold">
                8.1K
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Skills
              </span>

              <span className="font-bold">
                120+
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default FeedRightbar;