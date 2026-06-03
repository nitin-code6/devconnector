import { useEffect, useState } from "react";
import axios from "axios";

function MyPosts() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/post/me",
          {
            withCredentials: true
          }
        );
       console.log(response.data);
        setPosts(response.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchPosts();

  }, []);

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
        My Posts
      </h1>

      {posts.length === 0 ? (

        <div className="alert">
          <span>No posts found</span>
        </div>

      ) : (

        posts.map((post) => (

          <div
            key={post._id}
            className="card bg-base-100 shadow mb-4"
          >

            <div className="card-body">

              <p className="text-lg">
                {post.content}
              </p>

              <div className="text-sm opacity-60">

                {new Date(
                  post.createdAt
                ).toLocaleString()}

              </div>

            </div>

          </div>

        ))

      )}

    </div>

  </div>
);
 
}

export default MyPosts;