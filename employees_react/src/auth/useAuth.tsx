import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as authApi from "../api/auth.tsx";

type User = {
    token: string
}

interface AuthContextType {
    user?: any,
    loading: boolean,
    error?: any,
    login: (login: string, password: string) => void;
    signUp: (login: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string>(null);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
    const location = useLocation();
    const navigate = useNavigate();
    // reset error when changing the page
    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    useEffect(() => {
        setLoadingInitial(false);
        // authApi.getCurrentUser()
        //   .then((user) => setUser(user))
        //   .catch((_error) => {})
        //   .finally(() => setLoadingInitial(false));
      }, []);

    function login(username: string, password: string) {
        setLoading(true);

        authApi.login({ username, password })
            .then((user) => {
                setUser({
                    "token": user.Authorization,
                    "role": user.role
                });
                navigate("/");
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => setLoading(false));
    }

    function signUp(username: string, password: string, role:string) {
        setLoading(true);

        authApi.signUp({username, password, role})
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.error(error.data.error);
                setError(error.data.error);
            })
            .finally(() => setLoading(false))
    }

    function logout() {
        setUser(null);
        navigate("/");
    }

    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            signUp,
            logout,
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}
