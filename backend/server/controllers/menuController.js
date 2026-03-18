import Menu from "../models/Menu.js";
import mongoose from "mongoose";

export const getMenuItems = async (req, res, next) => {
  try {
    const items = await Menu.find().sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getMenuItemById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, image, category } = req.body;

    const item = await Menu.create({ name, description, price, image, category });
    return res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    const item = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await Menu.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    return res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
