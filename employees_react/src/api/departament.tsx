import redaxios from "redaxios";

export async function getDepartaments() : Promise<any> {
    const response = await redaxios.get("/api/departament");
    return response.data;
}

export async function addDepartament(params: {
    name: string;
    description: string
}, token: string) : Promise<any> {
    const data = {
        name: params.name,
        description: params.description,
    }
    const response = await redaxios.post("/api/departament", data, {headers: {"Authorization": token}});
    return response.data;
}

export async function getDepartament(id: number, token: string) : Promise<any> {
    const response = await redaxios.get("/api/departament/" + id,  {headers: {"Authorization": token}});
    return response.data;
}

export async function getDepartamentEmployees(id: number, token: string) : Promise<any> {
    const response = await redaxios.get("/api/departament/" + id + "/employee",  {headers: {"Authorization": token}});
    return response.data;
}

export async function editDepartament(id: number, params: {
    name: string;
    description: string,    
}, token: string) : Promise<any> {
    const response = await redaxios.put("/api/departament/" + id, params, {
        headers: {"Authorization": token},
    });
    return response.data;
}

export async function deleteDepartament(id: number, token: string) : Promise<any> {
    const response = await redaxios.delete("/api/departament/" + id,  {headers: {"Authorization": token}});
    return response.data;
}