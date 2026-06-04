import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";


import FeedRightbar from "../component/FeedRightbar";
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

  <div className="max-w-7xl mx-auto px-4">

    <div className="grid lg:grid-cols-12 gap-6">

      {/* MAIN CONTENT */}

      <div className="lg:col-span-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

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
            + Create Post
          </Link>

        </div>

        {/* Empty State */}

        {posts.length === 0 ? (

          <div className="card bg-base-100 shadow-lg">

            <div className="card-body text-center">

              <h2 className="text-2xl font-bold">

                No Posts Yet

              </h2>

              <p className="opacity-70">

                Start sharing with the community.

              </p>

            </div>

          </div>

        ) : (

          <div className="space-y-5">

            {posts.map((post) => (

              <div
                key={post._id}
                className="
                card
                bg-base-100
                shadow-md
                border
                border-base-300
                hover:shadow-xl
                transition-all
                "
              >

                <div className="card-body">

                  {/* Header */}

                  <div className="flex justify-between">

                    <div>

                      <h2 className="font-bold text-lg">

                        Your Post

                      </h2>

                      <p className="text-sm opacity-60">

                        {new Date(
                          post.createdAt
                        ).toLocaleString()}

                      </p>

                    </div>

                    {/* Dropdown */}

                    <div className="dropdown dropdown-end">

                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-sm"
                      >
                        ⋮
                      </label>

                      <ul
                        tabIndex={0}
                        className="
                        dropdown-content
                        menu
                        p-2
                        shadow
                        bg-base-100
                        rounded-box
                        w-40
                        border
                        border-base-300
                        "
                      >

                        <li>

                          <button
                            onClick={() =>
                              handleEditClick(post)
                            }
                          >
                            Edit Post
                          </button>

                        </li>

                        <li>

                          <button
                            className="text-error"
                            onClick={() =>
                              handleDeletePost(
                                post._id
                              )
                            }
                          >
                            Delete Post
                          </button>

                        </li>

                      </ul>

                    </div>

                  </div>

                  {/* Content */}

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

                      <div className="flex gap-2 mt-3">

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
                          Save
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

                      <p className="leading-7 mt-3">

                        {post.content}

                      </p>

                      {post.edited && (

                        <div className="mt-3">

                          <span
                            className="
                            badge
                            bg-lime-500
                            text-white
                            border-0
                            "
                          >
                            Edited
                          </span>

                        </div>

                      )}

                    </>

                  )}

                  {/* Footer */}

                  <div
                    className="
                    flex
                    items-center
                    justify-around
                    border-t
                    border-base-300
                    pt-3
                    mt-4
                    "
                  >

                    <button
                      className="
                      btn
                      btn-ghost
                      btn-sm
                      gap-2
                      "
                    >
                      ❤️
                      <span>
                        {post.likes?.length || 0}
                      </span>
                    </button>

                    <button
                      className="
                      btn
                      btn-ghost
                      btn-sm
                      gap-2
                      "
                    >
                      💬
                      <span>
                        {post.comments?.length || 0}
                      </span>
                    </button>

                    <button
                      className="
                      btn
                      btn-ghost
                      btn-sm
                      gap-2
                      "
                    >
                      ↗
                      <span>Share</span>
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* RIGHT SIDEBAR */}

      <div className="lg:col-span-4">

        <FeedRightbar />

      </div>

    </div>

  </div>

</div>

);
 
}

export default MyPosts;