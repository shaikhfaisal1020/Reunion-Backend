const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Property = require("../models/property");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).populate("owner");
    res.status(200).json({ data: properties, hits: properties.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filterProperties = async (req, res) => {
  try {
    const { city, availableFromDate, minPrice, maxPrice, propertyType } =
      req.query;

    const filters = {};

    if (city) {
      filters.city = city;
    }

    if (availableFromDate) {
      filters.availableFromDate = { $gte: new Date(availableFromDate) };
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      filters.rent = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }

    if (propertyType) {
      filters.propertyType = propertyType;
    }

    const filteredProperties = await Property.find(filters).populate(
      "owner",
      "username"
    );
    res
      .status(200)
      .json({ data: filteredProperties, hits: filteredProperties.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login, listProperties, filterProperties };
