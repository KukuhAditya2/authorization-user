import "../css/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="body">
      <div className="card login-form">
        <div className="card-body">
          <h1 className="login card-tittle text-center">Login</h1>
        </div>
        <div className="card-text">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </form>
          <div className="register text-center">
            <p>
              Not a member?{" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
