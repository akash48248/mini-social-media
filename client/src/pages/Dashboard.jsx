import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "https://potential-spork-r469pr7jx4qr2w7xp-5000.app.github.dev/api/posts"
      );

      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!content.trim()) {
      return alert("Please write something");
    }

    try {
      await axios.post(
        "https://potential-spork-r469pr7jx4qr2w7xp-5000.app.github.dev/api/posts/create",
        {
          userId: "685e2f0c0000000000000000",
          content,
        }
      );

      setContent("");
      fetchPosts();

      alert("Post Created Successfully");
    } catch (error) {
      alert("Failed to create post");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }}
        >
          <h1
            style={{
              color: "#6a11cb",
              textAlign: "center",
            }}
          >
            🚀 Mini Social Media Platform
          </h1>

          <div style={{ textAlign: "right" }}>
            <button
              onClick={logout}
              style={{
                background: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>

          <hr />

          <h2 style={{ color: "#2575fc" }}>
            ✍️ Create Post
          </h2>

          <textarea
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "2px solid #2575fc",
            }}
          />

          <br />
          <br />

          <button
            onClick={createPost}
            style={{
              background: "#2575fc",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Create Post
          </button>

          <hr />

          <h2 style={{ color: "#6a11cb" }}>
            🌍 Recent Posts
          </h2>

          {posts.map((post) => (
            <div
              key={post._id}
              style={{
                background: "#f8f9ff",
                borderLeft: "6px solid #6a11cb",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "12px",
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ color: "#2575fc" }}>
                {post.user?.fullName ||
                  "Unknown User"}
              </h3>

              <p
                style={{
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                {post.content}
              </p>

              <small style={{ color: "gray" }}>
                {new Date(
                  post.createdAt
                ).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;