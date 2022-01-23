import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextType {
    user?: any,
    loading: boolean,
    error?: any,
    login: (login: string, password: string) => void;
    signUp: (login: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInital] = useState<boolean>(true);
    const location = useLocation();
    const navigate = useNavigate();

    return <AuthContext.Provider value={}>

    </AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext);
}
