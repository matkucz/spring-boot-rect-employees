import { Navigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { addEmployee } from "../../api/employee.tsx";
import useAuth from "../../auth/useAuth.tsx";
import { getDepartaments } from "../../api/departament.tsx";
import { useEffect, useState } from "react";

export default function AddEmployee () {
    const [departaments, setDepartaments] = useState([]);
    const { user, loading } = useAuth();
    const location = useLocation();
    const navigation = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        console.log(formData.get("departament"));
        const postData = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            departamentId: parseInt(formData.get("departament") as string) as number,
            token: user.token as string
        }
        console.log(postData);
        addEmployee(postData)
            .then(data => {
                navigation("/departament");
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getDepartaments()
            .then((data) => {
                setDepartaments(data);
            })
            .catch((error) => {
                console.error(error.data.error);                
            })
            .finally(() => {})
    }, [location.pathname]);

    if (!user || user === null) {
        return <Navigate to="/" state={{ from: location }} replace/>;
    }

    return (
        <main className="d-flex justify-content-center">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h3>Add employee</h3>
            </div>
            <div className="mb-3">
              <label className="form-label">First name</label>
              <input className="form-control" name="firstName" />
            </div>
  
            <div className="mb-3">
              <label className="form-label">Last name</label>
              <input  className="form-control" name="lastName"/>
            </div>

            <div className="mb-3">
                <label className="form-label">Departament</label>
                <select className="form-select" name="departament">
                    {
                        departaments.map((element) => {
                            return (
                                <option key={element.id} value={element.id}>
                                    {element.id}: {element.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
  
            <div className="mb-3">
              <button className="btn btn-primary" disabled={loading}>Add</button>
            </div>
    
          </form>
        </div>
      </main>
    );
}