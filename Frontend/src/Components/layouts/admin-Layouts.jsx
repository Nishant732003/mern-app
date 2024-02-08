import { NavLink,Outlet,Navigate } from "react-router-dom";
import { FaUserShield, FaRegListAlt } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const { user,isLoading } = useAuth();
  console.log("adminlayout", user);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  
  if (user.role != "ADMIN") {
    return <Navigate to="/" />;
  }
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUserShield /> users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts"><BiSolidContact/> contacts</NavLink>
              </li>
              <li>
                <NavLink to="/admin/services">
                  <FaRegListAlt /> services
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/Home"><IoHome/> Home</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
export default AdminLayout