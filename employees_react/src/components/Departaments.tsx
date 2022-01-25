import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getDepartaments } from "../api/employee.tsx";
import useAuth from "../auth/useAuth.tsx";

export default function Departaments () {
    const { user } = useAuth();
    const [depatraments, setDepartaments] = useState([]);
    const location = useLocation();

    useEffect(() => {
        getDepartaments()
            .then((data) => {
                console.log(data);
                setDepartaments(data);
            })
            .catch((error) => {
                console.error(error.data.error);
                
            })
            .finally(() => {})
    }, [location.pathname]);
    
    return (
        <main>
            <div className="row justify-content-between">
                <div className="col-4">
                    <span className="fs-4">Departaments</span>
                </div>
                { user && (
                    <div className="col-1">
                        <Link
                            to="/departament/add"
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
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            depatraments.map((departament) => {
                                return (
                                    <tr key={departament.id}>
                                        <td>{departament.id}</td>
                                        <td>{departament.name}</td>
                                        <td>{departament.description}</td>
                                        <td className='d-flex justify-content-end'>
                                        {
                                            user && user.role !== "USER" && (
                                                    <Link
                                                        to="/departament/edit/" 
                                                        type="button"
                                                        className="btn btn-success"
                                                    >
                                                        Edit
                                                    </Link>
                                            )
                                        }
                                        {
                                            user && (
                                                <Link
                                                    to={`/departament/${departament.id}/employee`}
                                                    type="button"
                                                    className="btn btn-secondary ms-2"
                                                    >
                                                    Show
                                                </Link>
                                            )
                                        }
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
