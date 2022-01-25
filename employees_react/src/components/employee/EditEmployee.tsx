import useAuth from "../../auth/useAuth.tsx";
import { Navigate } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router";
import { editEmployee, getEmployee } from "../../api/employee.tsx";
import { getDepartaments } from "../../api/departament.tsx";
import { useEffect, useState } from "react";

export default function EditEmployee () {
    const [departaments, setDepartaments] = useState([]);
    const [departamentId, setDepartamentId] = useState(Number);
    const [displayName, setDisplayName] = useState(String);
    const [firstName, setFirstName] = useState(String);
    const [lastName, setLastName] = useState(String);
    const { id } = useParams();
    const { user, loading } = useAuth();
    const location = useLocation();
    const navigation = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        console.log(formData.get("departament"));
        const postData = {
            firstName: firstName as string,
            lastName: lastName as string,
            departamentId: parseInt(departamentId) as number,
        }
        console.log(postData);
        editEmployee(id, postData, user.token)
            .then(data => {
                navigation("/departament");
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleInput(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        switch (event.target.name) {
            case "firstName":
                setFirstName(event.target.value);
                break;
            case "lastName":
                setLastName(event.target.value);
                break;
            case "departament":
                setDepartamentId(event.target.value);
                break;
        }
    }

    useEffect(() => {
        getDepartaments()
            .then((data) => {
                setDepartaments(data);
                getEmployee(id, user.token)
                    .then((data) => {
                        setDisplayName(`${data.firstName} ${data.lastName}`)
                        setFirstName(data.firstName);
                        setLastName(data.lastName);
                        setDepartamentId(data.departament.id);
                    })
                    .catch((error) => {
                        console.error(error.data.error);                
                    });
            })
            .catch((error) => {
                console.error(error.data.error);                
            });

    }, [location.pathname]);

    if (!user || user === null) {
        return <Navigate to="/" state={{ from: location }} replace/>;
    }

    return (
        <main className="d-flex justify-content-center">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h3>Edit employee {displayName}</h3>
            </div>
            <div className="mb-3">
              <label className="form-label">First name</label>
              <input className="form-control" name="firstName" value={firstName} onChange={handleInput}/>
            </div>
  
            <div className="mb-3">
              <label className="form-label">Last name</label>
              <input  className="form-control" name="lastName" value={lastName} onChange={handleInput}/>
            </div>

            <div className="mb-3">
                <label className="form-label">Departament</label>
                <select className="form-select" name="departament" onChange={handleInput} value={departamentId}>
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
              <button className="btn btn-success" disabled={loading}>Edit</button>
            </div>
    
          </form>
        </div>
      </main>
    );
}