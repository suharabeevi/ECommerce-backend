import { Router } from "express";
import { usercontroller } from "../controllers/usercontroller.js";

const userRouter =Router()
const UserController = usercontroller()
// userlogin and signup
userRouter.route('/usersignup').post(UserController.adduser).get(UserController.getuser)
// add products and view products
userRouter.route('/addproducts').post(UserController.addproducts).get(UserController.ViewProducts)
// add to cart and view cart
userRouter.route('/addtocart/:productId/:userId').post(UserController.addedtocart)

export default userRouter