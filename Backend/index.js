const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");
const contactRoute = require("./routes/contactRoutes");
const serviceRoute = require("./routes/serviceRoutes");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error-Middleware");
const adminRoute = require("./routes/adminrouter");

//connection
connectDB();


const app = express();
app.use(express.static(path.resolve("./public")));

//cors options
app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials:true,
};
app.use(cors(corsOptions));



const PORT = process.env.PORT;




//routes

app.use('/api/v1/user', userRoutes);

app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);

//lets define admin route
app.use('/api/admin', adminRoute);
app.use(errorMiddleware);





app.listen(PORT, () => {
   console.log(
     `Server Running on ${process.env.DEV_NODE}  mode Port no ${PORT}`
   );
})
