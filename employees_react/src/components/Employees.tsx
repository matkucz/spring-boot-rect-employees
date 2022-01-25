import { useParams } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth.tsx";

export default function Employees () {
    const { user } = useAuth();
    const { id } = useParams();

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
                    </tbody>
                </table>
            </div>
        </main>
    )
}