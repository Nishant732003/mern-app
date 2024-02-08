import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Analytics from "../Components/Analytics";
import { useAuth } from "../store/auth";

const About = () => {
  const { user,userAuthentication } = useAuth();
  
   useEffect(() => {
     userAuthentication();
   }, []);
  
 
  console.log("Profile Image URL:", user.cloudinaryUrl);
 return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>{user.fullName}</p>
              <h1>Coding is <span>Love</span></h1>
             
              <p>
                Expertise: Our team consists of experienced IT professionals who
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              <p>
                Customization: We understand that every business is unique.
                Thats why we create solutions that are tailored to your specific
                needs and goals.
              </p>
              
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn">connect now</button>
                </NavLink>
                <NavLink to="/services">
                  <button className="btn secondary-btn">learn more</button>
                </NavLink>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src={user.cloudinaryUrl?user.cloudinaryUrl : "/images/about.png"}
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>
      <Analytics />
    </>
  );
};

export default About;
