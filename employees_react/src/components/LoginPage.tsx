import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth.tsx";


export default function Login() {
  const { login, loading, error } = useAuth();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    login(
      formData.get("username") as string,
      formData.get("password") as string
    );
  }

  return (
    <main className="d-flex justify-content-center">
      <div className="d-flex justify-content-center col-md-12">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3>Login</h3>
          </div>
          <div className="mb-3">
            <label className="col-form-label">
              Username
              <input className="form-control" name="username" />
            </label>
          </div>

          <div className="mb-3">
            <label className="col-form-label">
              Password
              <input  className="form-control" name="password" type="password" />
            </label>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" disabled={loading}>Login</button>
          </div>
          
          <Link to="/signup">Sign Up</Link>
        </form>
      </div>
    </main>
  );
}
