import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
  try {
    const { items, totalPrice } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    if (typeof totalPrice !== "number" || totalPrice < 0) {
      return res.status(400).json({ message: "Valid totalPrice is required" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      status: "pending"
    });

    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getAdminOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
