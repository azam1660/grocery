import Product from "../models/Product.js";

// Add a product
export const addProduct = async (req, res) => {
  const { name, price, description, category, stock } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      vendor: req.user.id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
