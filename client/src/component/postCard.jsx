import { useState } from "react";
import defaultAvatar from "../../src/assets/default_profile.png"
function PostCard({
  post,
  user,
  handleLike,
  handleUnlike,
  handleComment,
  handleDeleteComment,
  commentText,
  setCommentText,
}) {
  const [showComments, setShowComments] =
    useState(false);

  // Safety Guard
  if (!post) {
    return null;
  }

  const likes = post.likes || [];
  const comments = post.comments || [];

  const isLiked =
    user &&
    likes.includes(user._id);

  return (
    <div className="bg-base-100 rounded-2xl shadow-md border border-base-300 overflow-hidden hover:shadow-lg transition-all duration-300">

      {/* Header */}
      <div className="p-5 flex gap-3">

       <div className="avatar">
  <div className="w-12 rounded-full">
    <img
  src={`https://ui-avatars.com/api/?name=${post.user?.name}`}
  alt="avatar"
/>
  </div>
</div>

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <h2 className="font-semibold text-lg">

              {post?.user?.name ||
                "Unknown User"}

            </h2>

            {post.edited && (
              <span className="badge badge-success badge-sm">
                Edited
              </span>
            )}

          </div>

          <p className="text-sm opacity-60">

            {post.createdAt
              ? new Date(
                  post.createdAt
                ).toLocaleString()
              : "Unknown Date"}

          </p>

        </div>

      </div>

      {/* Content */}

      <div className="px-5 pb-5">

        <p className="leading-7 whitespace-pre-wrap">

          {post.content ||
            "No content available"}

        </p>

      </div>

      {/* Stats */}

      <div className="px-5 py-3 border-t border-base-300">

        <div className="flex gap-5 text-sm">

          <span>
            ❤️ {likes.length}
          </span>

          <span>
            💬 {comments.length}
          </span>

        </div>

      </div>

      {/* Actions */}

      <div className="grid grid-cols-2 border-t border-base-300">

        <button
          className={`btn btn-ghost rounded-none ${
            isLiked
              ? "text-success"
              : ""
          }`}
          onClick={() =>
            isLiked
              ? handleUnlike(post._id)
              : handleLike(post._id)
          }
        >
          {isLiked
            ? "❤️ Liked"
            : "🤍 Like"}
        </button>

        <button
          className="btn btn-ghost rounded-none"
          onClick={() =>
            setShowComments(
              !showComments
            )
          }
        >
          💬 Comment
        </button>

      </div>

      {/* Comments */}

      {showComments && (
        <div className="bg-base-200 p-4 border-t border-base-300">

          {/* Add Comment */}

          <div className="flex gap-2">

            <input
              type="text"
              placeholder="Write a comment..."
              className="input input-bordered flex-1"
              value={
                commentText?.[post._id] ||
                ""
              }
              onChange={(e) =>
                setCommentText((prev) => ({
                  ...prev,
                  [post._id]:
                    e.target.value,
                }))
              }
            />

            <button
              className="btn btn-success"
              onClick={() =>
                handleComment(post._id)
              }
            >
              Post
            </button>

          </div>

          {/* Comments List */}

          <div className="mt-4 space-y-3">

            {comments.length === 0 && (
              <p className="text-sm opacity-60">
                No comments yet.
              </p>
            )}

            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-base-100 rounded-xl p-3 border border-base-300"
              >

                <div className="flex justify-between">

                  <div>

                    <p className="font-medium text-sm">

                      {comment?.user
                        ?.name ||
                        "User"}

                    </p>

                    <p className="mt-1 text-sm">

                      {comment.text}

                    </p>

                  </div>

                  {user &&
                    comment?.user?._id ===
                      user._id && (
                      <button
                        className="btn btn-error btn-xs"
                        onClick={() =>
                          handleDeleteComment(
                            post._id,
                            comment._id
                          )
                        }
                      >
                        Delete
                      </button>
                    )}

                </div>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default PostCard;