import { useEffect, useState } from "react";
import axios from "axios";

import PostCard from "../component/PostCard";
import FeedRightbar from "../component/FeedRightbar";
import FeedSidebar from "../component/FeedSidebar";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});

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
        { withCredentials: true }
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
        { withCredentials: true }
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
    <div className="bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div className="lg:col-span-3">
            <FeedSidebar user={user} />
          </div>

          <div className="lg:col-span-6 space-y-5">

            <div className="card bg-base-100 shadow-md border border-base-300">
              <div className="card-body">

                <h2 className="font-bold text-lg">
                  Community Feed
                </h2>

                <p className="opacity-70">
                  Discover what developers are building today.
                </p>

              </div>
            </div>

            {posts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                user={user}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
            ))}

          </div>

          <div className="lg:col-span-3">
            <FeedRightbar />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Feed;