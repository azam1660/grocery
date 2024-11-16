import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  const { products, totalAmount, name, email, address } = req.body;

  // Ensure the user provides the necessary information
  if (
    !products ||
    products.length === 0 ||
    !totalAmount ||
    !name ||
    !email ||
    !address
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch product details from the database to check if they exist
    const productDetails = await Product.find({
      _id: { $in: products.map((product) => product.productId) },
    });

    if (productDetails.length !== products.length) {
      return res
        .status(404)
        .json({ message: "One or more products not found" });
    }

    // Calculate total amount and check stock
    let calculatedTotal = 0;
    for (const item of products) {
      const product = productDetails.find(
        (p) => p._id.toString() === item.productId
      );
      if (!product || product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.name}` });
      }
      calculatedTotal += product.price * item.quantity;
    }

    if (calculatedTotal !== totalAmount) {
      return res.status(400).json({ message: "Total amount mismatch" });
    }

    // Create the order
    const order = new Order({
      customer: req.user.id,
      products: products.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      })),
      totalAmount,
      status: "pending",
      deliveryPerson: null, // Will be assigned later
      name,
      email,
      address,
    });

    await order.save();

    // Update product stock after order
    for (const item of products) {
      const product = await Product.findById(item.productId);
      product.stock -= item.quantity;
      await product.save();
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignDeliveryPerson = async (req, res) => {
  const { orderId } = req.params;
  const { deliveryPersonId } = req.body; // Assume the delivery person is passed in the request body

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Assign the delivery person to the order
    order.deliveryPerson = deliveryPersonId;
    await order.save();

    res
      .status(200)
      .json({ message: "Delivery person assigned successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the status of an order
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // Status can be "pending", "prepared", "in transit", or "delivered"

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure the status is valid
    const validStatuses = ["pending", "prepared", "in transit", "delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Update the order status
    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: `Order status updated to ${status}`, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === "delivery") {
      // Fetch orders assigned to the delivery person or unassigned
      orders = await Order.find();
    } else {
      // Fetch orders placed by the customer
      orders = await Order.find({ customer: req.user.id }).populate(
        "products.product"
      );
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
