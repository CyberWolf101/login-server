const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require('./Routes/user');
require("dotenv").config();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));

// might delete
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// might delete

app.use(express.json());



mongoose.connect(process.env.DATAURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Database connected & server listening on port", process.env.PORT + "...");
            // Export userSocketIdMap and io only after successful database connection and server start
        });
    }).catch((err) => {
        console.log(err.message);
    });

app.use("/user", cors(), userRouter);
