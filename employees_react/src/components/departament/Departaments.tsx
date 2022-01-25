import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getDepartaments, deleteDepartament } from "../../api/departament.tsx";
import useAuth from "../../auth/useAuth.tsx";

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
                                        <td>
                                            <div className='d-flex justify-content-end'>
                                                {
                                                    user && (
                                                        <Link
                                                            to={`/departament/${departament.id}/employee`}
                                                            className="btn btn-secondary"
                                                            >
                                                            Show
                                                        </Link>
                                                    )
                                                }
                                                {
                                                    user && user.role !== "USER" && (
                                                        <>
                                                            <Link
                                                                to={`/departament/${departament.id}`}
                                                                className="btn btn-success ms-2"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger ms-2"
                                                                onClick={() => 
                                                                    {
                                                                        deleteDepartament(departament.id, user.token)
                                                                            .then(() => {
                                                                                getDepartaments()
                                                                                    .then((data) => {
                                                                                        console.log(data);
                                                                                        setDepartaments(data);
                                                                                    })
                                                                                    .catch((error) => {
                                                                                        console.error(error.data.error);
                                                                                        
                                                                                    })
                                                                            })
                                                                            .catch(error => console.error(error))
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
    );
}
