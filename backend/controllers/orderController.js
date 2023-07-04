const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;

//get all orders for a user
const getUserOrders = async (req, res, next) => {
  try {
    //find all orders with user id from request (from cookie)
    const orders = await Order.find({ user: new ObjectId(req.user._id) });
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

//get a specific order
const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "-password -isAdmin -id -__v -createdAt -updatedAt")
      .orFail();
    res.send(order);
  } catch (err) {
    next(err);
  }
};

//make a new order by user
const createOrder = async (req, res, next) => {
  try {
    const { cartItems, orderTotal, paymentMethod } = req.body;
    if (!cartItems || !orderTotal || !paymentMethod) {
      return res.status(400).send("All inputs are required");
    }
    //creating ids array with each products id
    let ids = cartItems.map((item) => {
      return item.productID;
    });
    //array with quantities of each product
    let qty = cartItems.map((item) => {
      return Number(item.quantity);
    });
    //find each cart item in products collection and increase their sales
    await Product.find({ _id: { $in: ids } }).then((products) => {
      products.forEach(function (product, idx) {
        product.sales += qty[idx];
        product.save();
      });
    });
    //save new order
    const order = new Order({
      user: new ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod,
    });
    const createdOrder = await order.save();
    res.status(201).send(createdOrder);
  } catch (err) {
    next(err);
  }
};

//updating order to payed state
const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    //isPayed default value is false
    order.isPaid = true;
    order.payedAt = Date.now();

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
};

//updating order by admin to delivered state
const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    //isDelivered default value is false
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
};

//represent all orders to admin
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password")
      .sort({ paymentMethod: "desc" });

    res.send(orders);
  } catch (err) {
    next(err);
  }
};

//getting orders for analysis
const getOrderForAnalysis = async (req, res, next) => {
  try {
    //to fetch all orders for a specific day, start and end times are needed
    const start = new Date(req.params.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(req.params.date);
    end.setHours(23, 59, 59, 999);

    const order = await Order.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: "asc" });

    res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderForAnalysis,
};
