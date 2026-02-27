const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const adminRoutes = require("./routes/adminRoute");
const productAdminRoutes = require("./routes/productAdminRoutes");
const orderAdminRoutes = require("./routes/adminOrderRoute");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "https://full-stack-ecom-xtle.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors()); // important for preflight

app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT Full Stack API!");
});

app.get("/api/test-db", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState === 1) {
      res.json({ status: "connected" });
    } else {
      res.json({ status: "not connected" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/admin/user", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", orderAdminRoutes);

const PORT = process.env.PORT || 3000;

// 👉 Run server only in local/dev, not in Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// 👉 Export for Vercel
module.exports = app;
