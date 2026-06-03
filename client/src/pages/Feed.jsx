import { useEffect, useState } from "react";
import axios from "axios";

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
                withCredentials: true
              }
            ),

            axios.get(
              "http://localhost:5000/api/user/me",
              {
                withCredentials: true
              }
            )

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
          withCredentials: true
        }
      );

      setPosts(prev =>
        prev.map(post =>
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
          withCredentials: true
        }
      );

      setPosts(prev =>
        prev.map(post =>
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
    <div className="min-h-screen bg-base-200 p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Feed
        </h1>

        {posts.map((post) => {

          const isLiked =
            user &&
            post.likes.includes(user._id);

          return (

            <div
              key={post._id}
              className="card bg-base-100 shadow mb-4"
            >

              <div className="card-body">

                <h2 className="font-bold text-lg">
                  {post.user.name}
                </h2>

                <p>
                  {post.content}
                </p>

                <div className="text-sm opacity-60">

                  {new Date(
                    post.createdAt
                  ).toLocaleString()}

                </div>

                <div className="flex items-center gap-3 mt-3">

                  <span>
                    👍 {post.likes.length}
                  </span>

                  {isLiked ? (

                    <button
                      className="btn btn-error btn-sm"
                      onClick={() =>
                        handleUnlike(post._id)
                      }
                    >
                      Unlike
                    </button>

                  ) : (

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        handleLike(post._id)
                      }
                    >
                      Like
                    </button>

                  )}

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default Feed;