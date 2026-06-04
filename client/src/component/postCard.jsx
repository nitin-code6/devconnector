import { useState } from "react";
import defaultAvatar from "../assets/default_profile.png";

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

  if (!post) return null;

  const likes = post.likes || [];
  const comments = post.comments || [];

  const isLiked =
    user &&
    likes.includes(user._id);

  return (

    <div
      className="
      bg-base-100
      rounded-2xl
      shadow-md
      border
      border-base-300
      overflow-hidden
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >

      {/* Header */}

      <div className="p-5 flex gap-4">

        <div className="avatar">

          <div
            className="
            w-12
            rounded-full
            ring
            ring-sky-500
            ring-offset-base-100
            ring-offset-2
            "
          >

            <img
              src={
                post?.user?.avatar ||
                defaultAvatar
              }
              alt="avatar"
            />

          </div>

        </div>

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <h2 className="font-semibold">

              {post?.user?.name ||
                "Unknown User"}

            </h2>

            {post.edited && (

              <span
                className="
                badge
                badge-sm
                bg-sky-500
                text-white
                border-0
                "
              >
                Edited
              </span>

            )}

          </div>

          <p className="text-xs opacity-60">

            @
            {post?.user?.name
              ?.toLowerCase()
              ?.replace(/\s+/g, "")}

          </p>

          <p className="text-xs opacity-50 mt-1">

            {post.createdAt
              ? new Date(
                  post.createdAt
                ).toLocaleDateString()
              : "Unknown Date"}

          </p>

        </div>

      </div>

      {/* Content */}

      <div className="px-5 pb-4">

        <p className="leading-7 whitespace-pre-wrap">

          {post.content ||
            "No content available"}

        </p>

      </div>

      <div className="divider my-0"></div>

      {/* Stats */}

      <div className="px-5 py-3">

        <div className="flex gap-6 text-sm font-medium">

          <span>
            👍 {likes.length}
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
              ? "text-sky-500"
              : ""
          }`}
          onClick={() =>
            isLiked
              ? handleUnlike(post._id)
              : handleLike(post._id)
          }
        >

          {isLiked
            ? "👍 Liked"
            : "👍 Like"}

        </button>

        <button
          className="btn btn-ghost rounded-none"
          onClick={() =>
            setShowComments(
              !showComments
            )
          }
        >
          Comment
        </button>

      </div>

      {/* Comments */}

      {showComments && (

        <div
          className="
          bg-base-200
          p-4
          border-t
          border-base-300
          "
        >

          {/* Add Comment */}

          <div className="flex gap-2">

            <input
              type="text"
              placeholder="Write a comment..."
              className="
              input
              input-bordered
              flex-1
              "
              value={
                commentText?.[
                  post._id
                ] || ""
              }
              onChange={(e) =>
                setCommentText(
                  (prev) => ({
                    ...prev,
                    [post._id]:
                      e.target.value,
                  })
                )
              }
            />

            <button
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
              onClick={() =>
                handleComment(
                  post._id
                )
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

            {comments.map(
              (comment) => (

                <div
                  key={comment._id}
                  className="
                  bg-base-100
                  rounded-xl
                  p-3
                  border
                  border-base-300
                  shadow-sm
                  "
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
                      comment?.user
                        ?._id ===
                        user._id && (

                        <button
                          className="
                          btn
                          btn-ghost
                          btn-xs
                          text-error
                          "
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

              )
            )}

          </div>

        </div>

      )}

    </div>

  );

}

export default PostCard;