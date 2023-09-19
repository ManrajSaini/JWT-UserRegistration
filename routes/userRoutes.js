const express = require("express");
const userController = require("../controllers/userController");
const {authentication} = require("../middlewares/authentication");

userRouter = express.Router();

userRouter.get("/register", userController.getRegisterForm);
userRouter.get("/login", userController.getLoginForm);
userRouter.get("/logout", userController.getLogoutForm);
userRouter.get("/allUsersForm", userController.getAllUsersForm);
userRouter.get("/singleUserForm", userController.getSingleUserForm);


userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", authentication, userController.logoutUser);
userRouter.get("/fetch-all-users", authentication, userController.fetchAllUsers);
userRouter.get("/single-user", authentication, userController.singleUser);

module.exports = userRouter;