import useAuth from "../../auth/useAuth.tsx";
import { getUser, editUser } from "../../api/users.tsx";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EditUser () {
    const { user, loading } = useAuth();
    const { id } = useParams();
    const location = useLocation();
    const navigator = useNavigate();
    const [username, setUsername] = useState(String);
    const [password, setPassword] = useState(String);
    const [role, setRole] = useState(String);

    useEffect(() => {
        getUser(id, user.token)
            .then(data => {
                setUsername(data.username);
                setPassword(data.password);
                setRole(data.role);
            })
            .catch(error => {
                console.error(error);                
            });
    }, [location.pathname])

    function handleInput(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        switch (event.target.name) {
            case "username":
                setUsername(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        editUser(
            id,
            {
                username: username,
                password: password,
                role: role
            },
            user.token
        )
        .then(() => {
            navigator("/users");
        })
        .catch(error => {
            console.error(error);
        });
    }
    if (!user || user.role !=="ADMIN") {
        return <Navigate to="/" state={{ from: location }} replace/>;
    }

    return (
        <main className="d-flex justify-content-center">
            <div className="col-md-12">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <h3>Sign Up</h3>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control" name="username" value={username} onChange={handleInput}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input className="form-control" name="password" type="password" value={password} onChange={handleInput}/>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-success" disabled={loading}>Edit</button>
                    </div>
                    <Link to="/login">Login</Link>
                </form>
            </div>
        </main>
    )
}