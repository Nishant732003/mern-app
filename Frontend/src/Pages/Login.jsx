import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password:"",
  });


  const navigate = useNavigate();
  const {storeTokenInLS
} = useAuth();
  //handling Input values
  const handleInput = (e) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;                                                    

    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
    //hadling th eform submission
  };
 const handleSubmit = async (e) => {
   e.preventDefault();
  

   try {
     const response = await fetch(
       "http://localhost:8001/api/v1/user/login",
       {
         method: "POST",
         headers: {
         'Content-Type':'application/json',
         },
         body: JSON.stringify(user),
       }
     );

    //  console.log(response, "loginform");
     const res_data = await response.json();
     if (response.ok) {
              toast.success("Login successfully");
        
       storeTokenInLS(res_data.token);
       

       setUser({ email: "",password: "" });
       navigate("/");
     }
     else {
       toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
       console.log("invalid credentials fromlogin frontend");
     }
     
   } catch (error) {
     console.log("Log In error", error);
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
                  src="/images/login.png"
                  alt="a girl is trying to do registration"
                  width="500"
                  height="500"
                />
              </div>

              {/* lets code registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
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
                  <button type="submit" className="btn btn-submit">
                    Login
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

export default Login;
