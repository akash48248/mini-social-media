import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mini Social Media Platform</h1>
      <p>Welcome to CodeAlpha Project</p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button style={{ marginLeft: "10px" }}>Register</button>
      </Link>
    </div>
  );
}

export default Home;