import { BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import  Services  from "./Pages/Services";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Error from "./Pages/Error";
import Logout from "./Pages/Logout";
import AdminLayout from "./Components/layouts/admin-Layouts";
import AdminContacts from "./Pages/Admin-contact";
import AdminUsers from "./Pages/Admin-Users";
import AdminUpdate from "./Pages/AdminUpdate";

const App = () => {
  
 return (
   <>
     <BrowserRouter>
       <Navbar />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/services" element={<Services />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/register" element={<Registration />} />
         <Route path="/login" element={<Login />} />
         <Route path="/logout" element={<Logout />} />
         <Route path="*" element={<Error />} />
         {/* //admin nested route */}
         <Route path="/admin" element={<AdminLayout />}>
           <Route path="users" element={<AdminUsers />} />
           <Route path="contacts" element={<AdminContacts />} />
           <Route path="users/:id/edit" element={<AdminUpdate/>}/>
         </Route>
       </Routes>
       <Footer />
     </BrowserRouter>
   </>
 );
}

export default App
