import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0
    },
    image: {
      type: String
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["coffee", "food", "dessert"],
        message: "Category must be one of coffee, food, dessert"
      },
      lowercase: true,
      trim: true
    }
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
