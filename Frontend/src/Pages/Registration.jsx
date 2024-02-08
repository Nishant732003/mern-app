import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const Registration = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    profileImage: "",
    cloudinaryUrl: "",
  });

 
  const navigate = useNavigate();
  const {storeTokenInLS
}
 = useAuth();


  //handling Input values
  const handleInput = (e) => {
      console.log(e);
      let name = e.target.name;
      let value = e.target.value;

      setUser({
          ...user,
          [name]: value,
      });

  };
    const handleImageChange = (e) => {
      const file = e.target.files[0];

      setUser({
        ...user,
        profileImage: file,
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", user.fullName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phone", user.phone);
    formData.append("profileImage", user.profileImage);

    try {
      const response = await fetch(
        "http://localhost:8001/api/v1/user/register",
        {
          method: "POST",
          body: formData,
        }
      );
      
       const res_data = await response.json();
      console.log("response from server", res_data.message);
      
      if (response.ok) {
       
        storeTokenInLS(res_data.token);
        // localStorage.setItem('token', res_data);
        toast.success("Registered successfully");
        setUser({ fullName:"",email: "", phone: "", password: "" });
        navigate("/login"); 
      }
      else {
        toast.error(res_data.extraDetails ?res_data.extraDetails :res_data.message);
      }
} catch (error) {
      console.log("register", error);
    }
  };

      
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="a girl is trying to do registration"
                  width="500"
                  height="500"
                />
              </div>

              {/* lets code registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration </h1>
                <br />

                <form onSubmit={handleSubmit}>
                   <div>
                    <label htmlFor="profileImage">Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="profileImage"
                      id="profileImage"
                      onChange={handleImageChange}
                    />
                    </div>
                 
                  <div>
                    <label htmlFor="fullName">FullName</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="fullName"
                      id="fullName"
                      required={true}
                      autoComplete="off"
                      value={user.fullName}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      id="email"
                      required={true}
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      id="password"
                      required={true}
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required={true}
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Registration;
