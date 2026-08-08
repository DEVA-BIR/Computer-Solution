const orderService = require("../Services/order.service");

// CREATE ORDER
async function createOrder(req, res) {
  try {
    const order = await orderService.createOrder(req.body);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
// GET ALL ORDERS
async function getAllOrders(req, res) {
  try {
    const orders = await orderService.getAllOrders();

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
}

// GET SINGLE ORDER
async function getSingleOrder(req, res) {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await orderService.getSingleOrder(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.error("GET SINGLE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
}
// UPDATE ORDER
async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;

    const body = req.body;
const cleanData = {
  employee_id: body.employee_id,
  customer_id: body.customer_id,
  device_id: body.device_id,
  order_total_price: body.order_total_price,
  estimated_completion_date: body.estimated_completion_date,
  completion_date: body.completion_date,
  additional_request: body.additional_request,
  notes_for_internal_use: body.notes_for_internal_use,
  notes_for_customer: body.notes_for_customer,
  order_status: body.order_status,
  services: body.services,
};
   

    await orderService.updateOrder(orderId, cleanData);

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
    });
  } catch (error) {
    console.log("UPDATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
}
async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;

    await orderService.deleteOrder(orderId);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (error) {
    console.log("DELETE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder
};
