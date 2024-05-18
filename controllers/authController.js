import { comparePassword, hashPassword } from "../utils/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name || !email || !password || !phone || !address) {
      return res.send({ message: "Please fill all fields" });
    }
    //check mail
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already exist",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//LOGIN Checks
export const loginController = async (req, res) => {
  try {
    // console.log(req.body.email);
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "invalid username or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    //token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRETCODE,
      { expiresIn: "1d" }
    );
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send("protected route");
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role != 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "error in admin middleware",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        email: user.email,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "error in admin middleware",
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    console.log(req.user._id);
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
export const getAllOrdersController = async (req, res) => {
  try {
    console.log(req.user._id);
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

export const getOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
