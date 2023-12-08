import AppError from "../utils/appError.js";
import { HttpStatus } from "../config/httpStatus.js";
import User from "../databse/models/userModel.js";
import Product from "../databse/models/productModel.js";
import Cart from "../databse/models/cartModel.js";
import bcrypt from "bcrypt";
export const usercontroller = () => {
  const adduser = async (req, res, next) => {
    try {
      console.log(req.body);
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        const err = new AppError("missing credentials", HttpStatus.BAD_REQUEST);
        return next(err);
      }
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        const err = new AppError("user already exist", HttpStatus.BAD_REQUEST);
        return next(err);
      }
      // adding new user
      const newuser = await User.create({
        username,
        password,
        email,
      });
      res
        .status(HttpStatus.CREATED)
        .json({ messege: "user adder successfully", newuser });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ messege: "Internal server Error" + error });
    }
  };
  const getuser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        const err = new AppError("missing credentials", HttpStatus.BAD_REQUEST);
        return next(err);
      }
      const user = await User.findOne({ email: email });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          const err = new AppError(
            "incorrect password",
            HttpStatus.BAD_REQUEST
          );
          return next(err);
        }
        res.status(HttpStatus.OK).json({
          message: "Get user successfully",
          user: {
            id: user._id,
            email: user.email,
            // Add other user properties as needed
          },
        });
      } else {
        const err = new AppError("User not found", HttpStatus.NOT_FOUND);
        return next(err);
      }
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ messege: "Internal server Error" + error });
    }
  };
  const addproducts = async (req, res, next) => {
    try {
      console.log(req.body);
      const { productname, stock, price } = req.body;
      if (!productname || !stock || !price) {
        const err = new AppError(
          "missing prodcut details",
          HttpStatus.NOT_FOUND
        );
        return next(err);
      }
      const productExist = await Product.findOne({ productname: productname });
      if (productExist) {
        const err = new AppError(
          "Prodcut already exist",
          HttpStatus.BAD_REQUEST
        );
        return next(err);
      }
      const newproduct = await Product.create({
        productname,
        stock,
        price,
      });
      res
        .status(HttpStatus.CREATED)
        .json({ messege: "Product added successfully", newproduct });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ messege: "Internal server Error" + error });
    }
  };
  const ViewProducts = async (req, res, next) => {
    try {
      const Allprodcuts = await Product.find();
      res
        .status(HttpStatus.OK)
        .json({ messege: "get all products Succsessfully", Allprodcuts });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ messege: "Internal server Error" + error });
    }
  };

const addedtocart = async (req, res, next) => {
  try {
    const { productId, userId } = req.params; // Corrected typo in variable name

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Assume you have a user ID (you might get this from authentication)
    // const userId = 'your_user_id'; // Replace with your actual user ID

    // Find the user's cart
    let userCart = await Cart.findOne({ user: userId });

    // If the user doesn't have a cart, create one
    if (!userCart) {
      userCart = new Cart({
        user: userId,
        items: [],
        total: 0
      });
    }

    // Check if the product is already in the cart
    const existingCartItem = userCart.items.find(item => item.product.toString() === productId);

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity and subtotal
      existingCartItem.quantity += 1;
      existingCartItem.subtotal = existingCartItem.quantity * product.price;
    } else {
      // If the product is not in the cart, add it
      userCart.items.push({
        product: productId,
        quantity: 1,
        subtotal: product.price
      });
    }

    // Update the total price of the cart
    userCart.total = userCart.items.reduce((total, item) => total + item.subtotal, 0);

    // Save the updated cart
    await userCart.save();

    return res.status(200).json({ message: 'Product added to cart successfully', cart: userCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

  return {
    adduser,
    getuser,
    addproducts,
    ViewProducts,
    addedtocart
  };
}