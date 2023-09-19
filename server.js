const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require('path');

const userRouter = require("./routes/userRoutes");
const connectDB = require("./config/connectDB");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

connectDB();

app.use("/api/users", userRouter);

app.get("/", (req,res) => {
    return res.render('home',{title:'Home'});
});

app.listen(process.env.PORT || 9000, () => {
    console.log("Server Started");
});