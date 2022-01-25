
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { getDepartament, editDepartament } from "../../api/departament.tsx";
import useAuth from "../../auth/useAuth.tsx";

export default function EditDepartament () {
    const [name, setName] = useState(String);
    const [displayName, setDisplayName] = useState(String);
    const [description, setDescription] = useState(String);
    const { user } = useAuth();
    const { id } = useParams();
    const location = useLocation();
    const navigation = useNavigate();
    
    useEffect(() => {
        getDepartament(id, user.token)
            .then(data => {
                setDisplayName(data.name);
                setName(data.name);
                setDescription(data.description);
            })
    }, [location.pathname]);
    
    if (!user) {
        console.log(user);
        return <Navigate to="/" state={{ from: location }} replace/>;
    }
    
    function handleInput(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        switch (event.target.name) {
            case "name":
                setName(event.target.value);
                break;
            case "description":
                setDescription(event.target.value);
                break;
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const patchData = {
            name: name as string,
            description: description as string
        }
        editDepartament(id, patchData, user.token)
            .then(data => {
                console.log("Sukces");
                navigation("/departament");
            })
            .catch(error => {
                console.error(error);
            })
    }
      
    return (
        <main className="d-flex justify-content-center">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h3>Edit departament {displayName}</h3>
            </div>
            <div className="mb-3">
                <label className="col-form-label">Name</label>
                <input className="form-control" name="name" value={name} onChange={handleInput}/>
            </div>
  
            <div className="mb-3">
                <label className="col-form-label">Description</label>
                <input  className="form-control" name="description" value={description} onChange={handleInput}/>
            </div>
  
            <div className="mb-3">
              <button className="btn btn-success">Edit</button>
            </div>
    
          </form>
        </div>
      </main>
    );
}