const express = require("express");
const { authenticateOwner } = require("../middleware/authentication");
const {
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/property");

const router = express.Router();

// Create a property
router.post("/properties", authenticateOwner, createProperty);

// Get all properties
router.get("/properties", authenticateOwner, getProperty);

// Update a property
router.put("/properties/:id", authenticateOwner, updateProperty);

// Delete a property
router.delete("/properties/:id", authenticateOwner, deleteProperty);

module.exports = router;
