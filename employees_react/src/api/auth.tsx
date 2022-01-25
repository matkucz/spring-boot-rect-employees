import redaxios from "redaxios";

export async function login(params: {
    username: string;
    password: string;
}) : Promise<any> {
    const response = await redaxios.post("/login", params);
    return response.data;
}

export async function signUp(params: {
    username: string,
    password: string,
    role: string
}) : Promise<any> {
    const response = await redaxios.post("/api/user", params);
    return response.data;
}