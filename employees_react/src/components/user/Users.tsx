import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth.tsx";
import { getUsers, deleteUser } from "../../api/users.tsx";


export default function Users () {
    const [users, setUsers] = useState([]);
    const { user, loading } = useAuth();
    const location = useLocation();
    
    useEffect(() => {
        getUsers(user.token)
            .then(data => {
                setUsers(data);
            })
    }, [location.pathname]);

    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/" state={{ from: location }} replace/>;
    }

    return (
        <main>
            <div className="row justify-content-between">
                <div className="col-4">
                    <span className="fs-4">Users</span>
                </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                            <th scope="col">Role</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((element) => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.id}</td>
                                        <td>{element.username}</td>
                                        <td>*****</td>
                                        <td>{element.role}</td>
                                        <td>
                                            <div className='d-flex justify-content-end'>
                                                {
                                                    user && user.role === "ADMIN" && (
                                                        <div>
                                                            <Link
                                                                to={`/user/${element.id}`}
                                                                className="btn btn-success"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Link
                                                                to={`/user/${element.id}/grant/`}
                                                                className="btn btn-warning ms-2"
                                                            >
                                                                Grant role
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger ms-2"
                                                                onClick={() => 
                                                                    {
                                                                        deleteUser(element.id, user.token).
                                                                            then((data) => {
                                                                                console.log(data);
                                                                                getUsers(user.token)
                                                                                    .then(data => {
                                                                                        setUsers(data);
                                                                                    });
                                                                            })
                                                                            .catch(error => {
                                                                                console.error(error);                                                                                
                                                                            });
                                                                    }
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </main>
    );
}