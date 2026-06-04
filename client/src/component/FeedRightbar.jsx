function FeedRightbar() {
  return (
    <div className="sticky top-20 space-y-4">

      <div className="card bg-base-100 shadow-md border border-base-300">

        <div className="card-body">

          <h3 className="font-bold">
            Trending Skills
          </h3>

          <div className="flex flex-wrap gap-2">

            <span className="badge badge-success">
              React
            </span>

            <span className="badge badge-success">
              NodeJS
            </span>

            <span className="badge badge-success">
              MongoDB
            </span>

            <span className="badge badge-success">
              Express
            </span>

          </div>

        </div>

      </div>

      <div className="card bg-base-100 shadow-md border border-base-300">

        <div className="card-body">

          <h3 className="font-bold">
            Community Tip
          </h3>

          <p>
            Share what you learn.
          </p>

        </div>

      </div>

    </div>
  );
}

export default FeedRightbar;