import { useEffect, useState } from "react";
import axios from "axios";

function Feed() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {

  const fetchPosts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/post",
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
        Feed
      </h1>

      {posts.map((post) => (

        <div
          key={post._id}
          className="card bg-base-100 shadow mb-4"
        >

          <div className="card-body">

            <p>
              {post.content}
            </p>
             <h2 className="font-bold">
  {post.user.name}
</h2>
          </div>

        </div>

      ))}

    </div>

  </div>
);
}

export default Feed;