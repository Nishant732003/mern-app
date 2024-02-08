import React from "react";
import { useAuth } from "../store/auth";

const Services = () => {
  const{ services
  } = useAuth();
  console.log(services);

  return (
   
    <>
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>
        <div className="container grid grid-three-cols">
          {services.map((currelem, index) => {
            const { price, description, provider, service } = currelem;
            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img
                    src="/images/design.png"
                    alt="our services"
                    width="200"
                  />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{provider}</p>
                    <p>{price}</p> {/* Corrected from prices to price */}
                  </div>
                  <h2>{service}</h2>
                  <p>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Services;
