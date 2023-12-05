// models/property.js
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyName: { type: String, required: true },
  description: { type: String, required: true },
  rent: { type: Number, required: true },
  city: {
    type: String,
    required: true,
  },
  availableFromDate: { type: Date, required: true },
  propertyType: {
    type: String,
    enum: ["House", "Apartment", "Townhouse", "Villa"],
    default: "House",
  },
  bathroom: { type: Number, required: true },
  bed: { type: Number, required: true },
  area: { type: Number, required: true },
});

module.exports = mongoose.model("Property", propertySchema);
