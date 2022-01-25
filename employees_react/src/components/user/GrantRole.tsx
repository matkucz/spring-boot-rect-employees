import useAuth from "../../auth/useAuth.tsx";
import { getUser, grantUserRole } from "../../api/users.tsx";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";

export default function GrantRole () {
    const { user, loading } = useAuth();
    const { id } = useParams();
    const location = useLocation();
    const navigator = useNavigate();
    const [role, setRole] = useState(String);
    const [displayName, setDisplayName] = useState(String);

    useEffect(() => {
        getUser(id, user.token)
            .then((data) => {
                setDisplayName(data.username);
                setRole(data.role);
            })
            .catch(error => {
                console.error(error);                
            });
    }, [location.pathname]);
    
    function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        grantUserRole(id, {"role": role}, user.token)
            .then(() => {
                navigator("/users");
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleInput (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setRole(event.target.value);
    }
    
    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/" state={{ from: location }} replace/>;
    }
    return (
        <main className="d-flex justify-content-center">
        <div className="col-md-12">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h3>Grant role to {displayName}</h3>
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select" name="role" value={role} onChange={handleInput}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </select>
                </div>
                <div className="mb-3">
                    <button className="btn btn-success" disabled={loading}>Edit</button>
                </div>
            </form>
        </div>
    </main>
    );
}