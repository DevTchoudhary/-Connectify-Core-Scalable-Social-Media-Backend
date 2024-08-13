const express = require("express");
const connectDB = require("./database/db");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middlewares/error");
const userRoute = require("./routes/users");

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});
