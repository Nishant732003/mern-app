import React,{useEffect,useState} from 'react'
import { useAuth } from '../store/auth';
import {  toast } from "react-toastify";

const AdminContacts = () => {
  const { authorizationToken } = useAuth();
  const [contactData, setContactData] = useState([]);

  const getContactData = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("contact-data", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //defining the function
  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/api/admin/contacts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
        
      });
      if (response.ok) {
        getContactData();
        toast.success("Deleted Successfully");
      }
      else {
        toast.error("Not Deleted Successfully");
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getContactData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <h1>HELLO From Contacts</h1>
        <div className="container admin-users">
          {contactData.map((curContactData, index) => {
            const { fullName, email, message,_id } = curContactData;
            return (
              <div key={index}>
                <p>{fullName}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className="btn" onClick={()=>deleteContactById(_id)}>Delte</button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}


export default AdminContacts
