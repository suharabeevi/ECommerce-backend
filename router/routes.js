import { Router } from "express";
import { usercontroller } from "../controllers/usercontroller.js";

const userRouter =Router()
const UserController = usercontroller()

userRouter.route('/usersignup').post(UserController.adduser)

export default userRouter