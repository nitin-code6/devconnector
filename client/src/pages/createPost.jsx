import { useState } from "react";
import axios from "axios";
function CreatePost() {
const [content, setContent] = useState("");

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

    setSuccess("Post created successfully");

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

   <div className="min-h-screen bg-base-200 py-10">

    <div className="max-w-2xl mx-auto bg-base-100 shadow-xl rounded-xl p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create Post
      </h1>

      <textarea
        className="textarea textarea-bordered w-full h-40"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) =>
            
          setContent(e.target.value)
        }
      />
        <button
  type="submit"
  disabled={loading}
  className="btn btn-primary mt-4"
>
  {loading
    ? "Creating..."
    : "Create Post"}
</button>

    </div>

  </div>

</form>

);
}

export default CreatePost;