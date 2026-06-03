import { useEffect, useState } from "react";
import axios from "axios";

function MyPosts() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
const [editingPostId, setEditingPostId] =
  useState(null);

const [editContent, setEditContent] =
  useState("");
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
const handleDeletePost = async (postId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    await axios.delete(
      `http://localhost:5000/api/post/${postId}`,
      {
        withCredentials: true
      }
    );

    setPosts(
      posts.filter(
        post => post._id !== postId
      )
    );

  } catch (err) {

    console.log(err);

  }

};
const handleEditClick = (post) => {

  setEditingPostId(post._id);

  setEditContent(post.content);

};
const handleUpdatePost = async (
  postId
) => {

  try {

    const response = await axios.put(
      `http://localhost:5000/api/post/${postId}`,
      {
        content: editContent
      },
      {
        withCredentials: true
      }
    );

    setPosts(
      posts.map((post) =>
        post._id === postId
          ? response.data
          : post
      )
    );

    setEditingPostId(null);

    setEditContent("");

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

              {
  editingPostId === post._id ? (

    <div>

      <textarea
        className="textarea textarea-bordered w-full"
        value={editContent}
        onChange={(e) =>
          setEditContent(
            e.target.value
          )
        }
      />

      <button
        className="btn btn-primary btn-sm mt-2"
        onClick={() =>
          handleUpdatePost(
            post._id
          )
        }
      >
        Update
      </button>

    </div>

  ) : (

    <p>
      {post.content}
      {post.edited && (
  <p className="text-sm text-gray-500 mt-2">
    Edited
  </p>
)}
    </p>
    
    
  )
}

              <div className="text-sm opacity-60">

                {new Date(
                  post.createdAt
                ).toLocaleString()}

              </div>
<button
  className="btn btn-error btn-sm mt-3"
  onClick={() =>
    handleDeletePost(post._id)
  }
>
  Delete
</button>
<button
  className="btn btn-outline btn-sm"
  onClick={() =>
    handleEditClick(post)
  }
>
  Edit
</button>
            </div>

          </div>

        ))

      )}

    </div>

  </div>
);
 
}

export default MyPosts;