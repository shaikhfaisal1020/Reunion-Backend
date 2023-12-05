const Property = require("../models/property");
const createProperty = async (req, res) => {
  try {
    const {
      propertyName,
      description,
      rent,
      city,
      availableFromDate,
      propertyType,
      bathroom,
      bed,
      area,
    } = req.body;
    // console.log(availabeFromDate);
    const property = new Property({
      owner: req.userId,
      propertyName,
      description,
      rent,
      city,
      availableFromDate: new Date(availableFromDate),
      propertyType,
      bathroom,
      bed,
      area,
    });
    await property.save();
    res.status(201).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProperty = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.userId });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const {
      propertyName,
      description,
      rent,
      city,
      availabeFromDate,
      propertyType,
      bathroom,
      bed,
      area,
    } = req.body;
    const updatingProperty = await Property.findOne({ _id: req.params.id });
    if (updatingProperty.owner._id.toString() !== req.userId) {
      res.status(401).json({
        error: `Owner with id ${req.userId} does not own the property with ${req.params.id}`,
      });
      return;
    }
    const property = await Property.findByIdAndUpdate(req.params.id, {
      propertyName,
      description,
      rent,
      city,
      availabeFromDate,
      propertyType,
      bathroom,
      bed,
      area,
    });
    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const deletingProperty = await Property.findOne({ _id: req.params.id });
    if (deletingProperty.owner._id.toString() !== req.userId) {
      res.status(401).json({
        error: `Owner with id ${req.userId} does not own the property with ${req.params.id}`,
      });
      return;
    }
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
};
