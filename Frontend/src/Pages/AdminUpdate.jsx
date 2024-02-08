import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminUpdate = () => {
    const [data, setData] = useState({
        fullName: "",
        email: "",
        phone:"",
    });

    const params = useParams();
    const { authorizationToken } = useAuth();

//get single user data
      const getSingleUserData = async () => {
        const response = await fetch(
          `http://localhost:8001/api/admin/users/${params.id}`,
          {
            method: "GET",
              headers: {
          
             Authorization: authorizationToken,
            },
          }
        );
        const data = await response.json();
        console.log(`users single data ${data}`);
          setData(data);
        
      };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data,
            [name]: value,
        });
    }

    //to Update the Data dynamically
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
              `http://localhost:8001/api/admin/users/update/${params.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
              }
            );
            if (response.ok) {
                console.log(data);
                toast.success("Update Successfully");
            }
            else {
                toast.error("Error in Update");
            }
    } 
        catch (error) {
            console.error(error);
        }
    };
    


    return (
      <>
        <section className="section-contact">
          <div className="contact-content container">
            <h1 className="main-heading">Update User Data</h1>
          </div>

          <div className="container grid grid-two-cols">
           

            <section className="section-form">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={data.fullName}
                    onChange={handleInput}
                    autoComplete="off"
                    required={true}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleInput}
                    autoComplete="off"
                    required={true}
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    value={data.phone}
                    onChange={handleInput}
                    autoComplete="off"
                    required={true}
                  />
                </div>
                <div>
                  <button type="submit">Update</button>
                </div>
              </form>
            </section>
          </div>
        </section>
      </>
    );
}
export default AdminUpdate;