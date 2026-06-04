import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import defaultAvatar from "../assets/icon.png";
import PostCard from "../component/PostCard";
import FeedRightbar from "../component/FeedRightbar";
import FeedSidebar from "../component/FeedSidebar";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const [postsResponse, userResponse] =
          await Promise.all([

            axios.get(
              "http://localhost:5000/api/post",
              {
                withCredentials: true,
              }
            ),

            axios.get(
              "http://localhost:5000/api/user/me",
              {
                withCredentials: true,
              }
            ),

          ]);

        setPosts(postsResponse.data);
        setUser(userResponse.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  const handleLike = async (postId) => {

    try {

      const response = await axios.put(
        `http://localhost:5000/api/post/like/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? response.data
            : post
        )
      );

    } catch (err) {

      console.log(err);

    }

  };

  const handleUnlike = async (postId) => {

    try {

      const response = await axios.put(
        `http://localhost:5000/api/post/unlike/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? response.data
            : post
        )
      );

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

    <div className="min-h-screen bg-base-200/50">

      <div className="max-w-6xl mx-auto px-4 py-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Left Sidebar */}

          <div className="lg:col-span-3">

            <FeedSidebar user={user} />

          </div>

          {/* Feed */}

          <div className="lg:col-span-6 space-y-5">

            {/* Feed Header */}
            {/* Create Post Card */}

<div
  className="
  card
  bg-base-100/70
  backdrop-blur-xl
  shadow-xl
  border
  border-base-300
  "
>

  <div className="card-body">

    <div className="flex items-center gap-3">

      <div className="avatar">

        <div className="w-12 rounded-full ring ring-sky-500 ring-offset-base-100 ring-offset-2">

          <img
            src={
              user?.avatar ||
              defaultAvatar
            }
            alt="avatar"
          />

        </div>

      </div>

      <Link
        to="/create-post"
        className="
        btn
        btn-outline
        flex-1
        justify-start
        rounded-full
        normal-case
        text-base-content/60
        "
      >

        What's on your mind?

      </Link>

      <Link
        to="/createPost"
        className="
        btn
        border-0
        text-white
        bg-gradient-to-r
        from-sky-500
        to-lime-500
        hover:from-sky-600
        hover:to-lime-600
        "
      >

        + Post

      </Link>

    </div>

  </div>

</div>
            <div
              className="
              card
              bg-base-100/70
              backdrop-blur-xl
              shadow-xl
              border
              border-base-300
              "
            >

              <div className="card-body">

                <h2 className="text-2xl font-bold">

                  Community

                  <span className="text-lime-500 ml-2">
                    Feed
                  </span>

                </h2>

                <p className="opacity-70 mt-1">

                  Discover what developers are building,
                  learning and sharing today.

                </p>

              </div>

            </div>

            {/* Posts */}

            {posts.length > 0 ? (

              posts.map((post) => (

                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                />

              ))

            ) : (

              <div
                className="
                card
                bg-base-100
                shadow-md
                border
                border-base-300
                "
              >

                <div className="card-body text-center">

                  <h3 className="text-xl font-bold">
                    No Posts Yet
                  </h3>

                  <p className="opacity-70">

                    Be the first developer to
                    share something with the community.

                  </p>

                </div>

              </div>

            )}

          </div>

          {/* Right Sidebar */}

          <div className="lg:col-span-3">

            <FeedRightbar />

          </div>

        </div>

      </div>

    </div>

  );

}

export default Feed;