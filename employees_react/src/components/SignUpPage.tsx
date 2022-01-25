import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth.tsx";

export default function SignUp () {
    const { signUp, loading, error } = useAuth();
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        signUp(
            formData.get("username") as string,
            formData.get("password") as string,
            "USER",
        );
    }
    return (
        <main className="d-flex justify-content-center">
            <div className="col-md-12">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <h3>Sign Up</h3>
                    </div>
                    {                        
                        error && (
                            <div className="alert alert-danger" role="alert">
                                {  
                                    error
                                }
                            </div>
                        )
                    }
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control" name="username" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input className="form-control" name="password" type="password"/>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary" disabled={loading}>Signup</button>
                    </div>
                    <Link to="/login">Login</Link>
                </form>
            </div>
        </main>
    )
}