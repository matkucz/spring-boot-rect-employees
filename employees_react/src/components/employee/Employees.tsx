import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth.tsx";
import { getDepartamentEmployees } from "../../api/departament.tsx";
import { deleteEmployee } from "../../api/employee.tsx";


export default function Employees () {
    const { user } = useAuth();
    const { id } = useParams();
    const [employees, setEmployees] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (user) {
            getDepartamentEmployees(id, user.token)
                .then(data => {
                    setEmployees(data);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, [location.pathname]);

    if (!user || user === null) {
        return <Navigate to="/" state={{ from: location }} replace/>;
    }

    return (
        <main>
            <div className="row justify-content-between">
                <div className="col-4">
                    <span className="fs-4">Employees of departament {id}</span>
                </div>
                { user && (
                    <div className="col-1">
                        <Link
                            to="/employee/add"
                            type="button"
                            className="btn btn-primary"
                        >
                            Add
                        </Link>
                    </div>
                    )
                }
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First name</th>
                            <th scope="col">Second name</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee) => {
                                return (
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>
                                            <div className='d-flex justify-content-end'>
                                                {
                                                    user && user.role !== "USER" && (
                                                        <>
                                                            <Link
                                                                to={`/employee/${employee.id}`}
                                                                className="btn btn-success"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger ms-2"
                                                                onClick={() => 
                                                                    {
                                                                        deleteEmployee(employee.id, user.token)
                                                                            .then(() => {
                                                                                getDepartamentEmployees(id, user.token)
                                                                                    .then(data => {
                                                                                        setEmployees(data);
                                                                                    })
                                                                                    .catch(error => {
                                                                                        console.error(error);
                                                                                    })
                                                                            })
                                                                            .catch(error => {
                                                                                console.error(error);
                                                                            })
                                                                    }
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
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
    )
}