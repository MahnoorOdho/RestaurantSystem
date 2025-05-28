const express = require("express");
const router = express.Router();
const multer = require("multer");
const Menu = require("../models/Menu");

// Setup storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// GET route to fetch all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

// POST route to add menu item with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newMenuItem = new Menu({ name, price, description, image });
    await newMenuItem.save();

    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
});
// DELETE menu item
router.delete("/:id", async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// PUT (update) menu item
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedData = { name, price, description };
    if (image) updatedData.image = image;

    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});


module.exports = router;
