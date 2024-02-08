import Count from "./Count";


const Analytics = () => {
  return (
    <>
      <main>
        <section className="section-analytics">
          <div className="container grid grid-four-cols">
            <div
              className="div1"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Count  target={50} />
                <h1 style={{ marginLeft: "4px", marginBottom: "0" }}>+</h1>
              </div>
              <p style={{ marginLeft: "4px", marginTop: "0" }}>
                Registered Companies
              </p>
            </div>

            <div
              className="div1"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Count target={10000} />
                <h1 style={{ marginLeft: "4px", marginBottom: "0" }}>+</h1>
              </div>
              <p style={{ marginLeft: "4px", marginTop: "0" }}>
                Happy Clients
              </p>
            </div>

          
            <div className="div1">
              <h2>500+</h2>
              <p>Well Known Devlopers</p>
            </div>
            <div className="div1">
              <h2>24/7</h2>
              <p>Services</p>
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section  */}
    </>
  );
}

export default Analytics
