import useAuth from "../auth/useAuth.tsx";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { addDepartament } from "../api/employee.tsx";

export default function AddDepartament () {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (!user) {
        console.log(user);
        return <Navigate to="/" state={{ from: location }} replace/>;
    }
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const postData = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            token: user.token as string
        }
        addDepartament(
          postData
        ).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error(error);
        }).finally(
            () => {}
        );
    }
      
    return (
        <main className="d-flex justify-content-center">
        <div className="d-flex justify-content-center col-md-12">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h3>Add departament</h3>
            </div>
            <div className="mb-3">
              <label className="col-form-label">
                Name
                <input className="form-control" name="name" />
              </label>
            </div>
  
            <div className="mb-3">
              <label className="col-form-label">
                Description
                <input  className="form-control" name="description"/>
              </label>
            </div>
  
            <div className="mb-3">
              <button className="btn btn-primary" disabled={loading}>Add</button>
            </div>
    
          </form>
        </div>
      </main>
    );
}