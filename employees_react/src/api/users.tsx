import redaxios from "redaxios";

export async function getUsers(token: string) : Promise<any> {
    const response = await redaxios.get("/api/user", {headers: {"Authorization": token}});
    return response.data;
}

export async function getUser(id: number, token: string) : Promise<any> {
    const response = await redaxios.get("/api/user/" + id , {headers: {"Authorization": token}});
    return response.data;
}

export async function grantUserRole(id: number, params: { role: string }, token: string) : Promise<any> {
    const response = await redaxios.put("/api/user/" + id + "/grant", params, {headers: {"Authorization": token}});
    return response.data;
}

export async function editUser(id: number, params: { username: string, password: string }, token: string) : Promise<any> {
    const response = await redaxios.put("/api/user/" + id, params, {headers: {"Authorization": token}});
    return response.data;
}

export async function deleteUser(id: number, token: string) : Promise<any> {
    const response = await redaxios.delete("/api/user/" + id, {headers: {"Authorization": token}});
    return response.data;
}