import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
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

<div className="min-h-screen bg-base-200 py-8">

  <div className="max-w-5xl mx-auto px-4">

    {/* Header */}

    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold">

          My

          <span className="text-lime-500 ml-2">
            Posts
          </span>

        </h1>

        <p className="text-base-content/60 mt-2">

          Manage and update your published posts.

        </p>

      </div>

      <Link
        to="/create-post"
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
        + Create Post
      </Link>

    </div>

    {posts.length === 0 ? (

      <div
        className="
        card
        bg-base-100
        shadow-lg
        border
        border-base-300
        "
      >

        <div className="card-body text-center">

          <h2 className="text-2xl font-bold">
            No Posts Yet
          </h2>

          <p className="opacity-70">

            Start sharing your thoughts with the community.

          </p>

        </div>

      </div>

    ) : (

      <div className="space-y-5">

        {posts.map((post) => (

          <div
            key={post._id}
            className="
            bg-base-100
            rounded-2xl
            shadow-md
            border
            border-base-300
            hover:shadow-xl
            transition-all
            "
          >

            <div className="p-6">

              {editingPostId === post._id ? (

                <div>

                  <textarea
                    className="
                    textarea
                    textarea-bordered
                    w-full
                    h-32
                    "
                    value={editContent}
                    onChange={(e) =>
                      setEditContent(
                        e.target.value
                      )
                    }
                  />

                  <div className="mt-3 flex gap-2">

                    <button
                      className="
                      btn
                      border-0
                      text-white
                      bg-gradient-to-r
                      from-sky-500
                      to-lime-500
                      "
                      onClick={() =>
                        handleUpdatePost(
                          post._id
                        )
                      }
                    >
                      Save Changes
                    </button>

                    <button
                      className="btn btn-outline"
                      onClick={() =>
                        setEditingPostId(
                          null
                        )
                      }
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                <>

                  <div className="flex justify-between items-start">

                    <div>

                      <p className="leading-7">

                        {post.content}

                      </p>

                      {post.edited && (

                        <span
                          className="
                          badge
                          badge-sm
                          bg-sky-500
                          text-white
                          border-0
                          mt-3
                          "
                        >
                          Edited
                        </span>

                      )}

                    </div>

                  </div>

                </>

              )}

              <div className="divider my-4"></div>

              <div className="flex flex-col md:flex-row justify-between gap-4">

                <div className="text-sm opacity-60">

                  {new Date(
                    post.createdAt
                  ).toLocaleString()}

                </div>

                <div className="flex gap-2">

                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() =>
                      handleEditClick(post)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-error btn-sm"
                    onClick={() =>
                      handleDeletePost(
                        post._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>

</div>

);
 
}

export default MyPosts;