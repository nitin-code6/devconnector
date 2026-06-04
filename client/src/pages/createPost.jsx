import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


function CreatePost() {
const [content, setContent] = useState("");
const navigate = useNavigate();
const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const [success, setSuccess] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    setLoading(true);
    setError("");
    setSuccess("");

    const response = await axios.post(
      "http://localhost:5000/api/post",
      {
        content
      },
      {
        withCredentials: true
      }
    );

    console.log(response.data);

setSuccess("Post published successfully");

setTimeout(() => {
  navigate("/feed");
}, 1200);
    setContent("");

  } catch (err) {

    setError(
      err.response?.data?.message ||
      "Something went wrong"
    );

  } finally {

    setLoading(false);

  }
};
  return (

<form onSubmit={handleSubmit}>

<div className="min-h-[calc(100vh-72px)] bg-base-200 py-8">

  <div className="max-w-3xl mx-auto px-4">

    <div
      className="
      bg-base-100/70
      backdrop-blur-xl
      shadow-2xl
      rounded-3xl
      border
      border-base-300
      p-8
      "
    >

      {/* Header */}

      <div className="mb-6">

        <h1 className="text-4xl font-bold">

          Create

          <span className="text-lime-500 ml-2">
            Post
          </span>

        </h1>

        <p className="text-base-content/60 mt-2">

          Share your thoughts, projects,
          achievements or learning journey.

        </p>

      </div>

      {/* Textarea */}

      <textarea
        className="
        textarea
        textarea-bordered
        w-full
        h-52
        text-base
        "
        placeholder="What's on your mind today?"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      {/* Character Count */}

      <div className="text-right mt-2 text-sm opacity-60">

        {content.length} characters

      </div>

      {/* Alerts */}

      {error && (

        <div
          className="
          mt-4
          rounded-xl
          border
          border-orange-500/30
          bg-orange-500/10
          text-orange-300
          px-4
          py-3
          "
        >
          {error}
        </div>

      )}

      {success && (

        <div
          className="
          mt-4
          rounded-xl
          border
          border-lime-500/30
          bg-lime-500/10
          text-lime-400
          px-4
          py-3
          "
        >
          {success}
        </div>

      )}

      {/* Button */}

      <button
        type="submit"
        disabled={loading}
        className="
        btn
        w-full
        mt-6
        h-12
        border-0
        text-white
        bg-gradient-to-r
        from-sky-500
        to-lime-500
        hover:from-sky-600
        hover:to-lime-600
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-300
        "
      >

        {loading
          ? "Publishing..."
          : "Publish Post"}

      </button>

    </div>

  </div>

</div>

</form>

);
}

export default CreatePost;