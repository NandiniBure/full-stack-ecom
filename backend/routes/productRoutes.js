const express = require("express");
const Product = require("../models/Product");
const { protect, Admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new Product
// @access  Private/Admin
router.post("/create", protect, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      size,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      ispublished,
      tags,
      sku,
      dimensions,
      weight,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      size,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      ispublished,
      tags,
      sku,
      dimensions,
      weight,
      user: req.user._id,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", protect, Admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      size,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      ispublished,
      tags,
      sku,
      dimensions,
      weight,
    } = req.body;

    const product = await Product.findById(req.params.id);

   
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.size = size || product.size;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.ispublished =
        ispublished !== undefined ? ispublished : product.ispublished;
      product.tags = tags || product.tags;
      product.sku = sku || product.sku;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protect, Admin, async (req, res) => {
  try {

    

    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};
    let sort = {};

   

    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.size = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: color.split(",") };
    }

    if (gender) {
      query.gender = { $in: gender.split(",") };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

   
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = {
            rating: -1,
          };
          break;
        default:
          break;
      }
    }

    let product = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/new-arrivals", async (req, res) => {
  try {
   
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error from new arrivals");
  }
});

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.json(404).json({ message: "No best seller" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Servver Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
   
    if (product) {
     return res.json(product);
    } else {
    return  res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404), json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
