const express = require("express");
const Order = require("../models/Order");
const { protect, Admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all order (Admin only)
// @access Private/Admin
router.get("/", protect, Admin, async (req, res) => {
  try {
 
    const orders = await Order.find({}).populate("user", "name email");
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:id", protect, Admin, async (req, res) => {
  try {
      
    const order = await Order.findById(req.params.id).populate("user","name");
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updatedOrder = await order.save();
    
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Errro" });
  }
});

router.delete("/:id", protect, Admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order removed" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
