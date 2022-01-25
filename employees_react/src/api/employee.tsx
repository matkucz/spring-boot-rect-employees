import redaxios from "redaxios";

export async function getEmployees(token: string) : Promise<any> {
    const response = await redaxios.get("/api/employee", {headers: {"Authorization": token}});
    return response.data;
}

export async function addEmployee(params: {
    firstName: string;
    lastName: string,
    departamentId: number,
    token: string
}) : Promise<any> {
    const data = {
        firstName: params.firstName,
        lastName: params.lastName,
        departamentId: params.departamentId,
    }
    const response = await redaxios.post("/api/employee", data, {headers: {"Authorization": params.token}});
    return response.data;
}

export async function getEmployee(id: number, token: string) : Promise<any> {
    const response = await redaxios.get("/api/employee/"+ id , {headers: {"Authorization": token}});
    return response.data;
}

export async function editEmployee(id: number, params: {
    firstName: string,
    lastName: string,
    departamentId: number,
}, token: string) : Promise<any> {
    const response = await redaxios.put("/api/employee/" + id, params, {
        headers: {"Authorization": token},
    });
    return response.data;
}

export async function deleteEmployee(id: number, token: string) : Promise<any> {
    const response = await redaxios.delete("/api/employee/"+ id , {headers: {"Authorization": token}});
    return response.data;
}