import { BrowserRouter, Route, Routes, Link, Outlet} from "react-router-dom";
import useAuth, { AuthProvider } from "./auth/useAuth.tsx";
import Home from "./components/Home.tsx";
import Login from "./components/LoginPage.tsx";
import SignUp from "./components/SignUpPage.tsx";
import Departaments from "./components/departament/Departaments.tsx";
import AddDepartament from "./components/departament/AddDepartament.tsx";
import EditDepartament from "./components/departament/EditDepartament.tsx";
import Employees from "./components/employee/Employees.tsx";
import AddEmployee from "./components/employee/AddEmployee.tsx";
import EditEmployee from "./components/employee/EditEmployee.tsx";
import Users from "./components/user/Users.tsx";
import EditUser from "./components/user/EditUser.tsx";
import GrantRole from "./components/user/GrantRole.tsx";

function Layout () {
  const { user, logout } = useAuth();
  return (
    <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <svg className="bi me-2" width="40" height="32"></svg>
            <span className="fs-4">Employees app</span>
          </a>        
          <nav className="nav nav-pills">
            <Link className="nav-link" to="/">Home</Link>
            { !user && (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/signup">Sign up</Link>
              </>
            )
            }
            {
              user && (
                <button className="nav-link" onClick={() => logout()}>Logout</button>
              )
            }
            {
              user && user.role === "ADMIN" && (
                <Link className="nav-link" to="/users">Users</Link>
              )
            }
            <Link className="nav-link" to="/departament">Departaments</Link>
          </nav>
        </header>
        <Outlet/>
      </div>
  )
}

function Router () {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/departament" element={<Departaments/>}></Route>
        <Route path="/departament/add" element={<AddDepartament/>}></Route>
        <Route path="/departament/:id/employee" element={<Employees/>}></Route>
        <Route path="/departament/:id/" element={<EditDepartament/>}></Route>
        <Route path="/employee/add" element={<AddEmployee/>}></Route>
        <Route path="/employee/:id/" element={<EditEmployee/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/user/:id" element={<EditUser/>}></Route>
        <Route path="/user/:id/grant" element={<GrantRole/>}></Route>
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
