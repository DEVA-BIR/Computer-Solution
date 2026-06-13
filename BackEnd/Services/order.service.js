const conn = require("../Config/dbconfig.js");
const crypto = require("crypto");

// CREATE ORDER
async function createOrder(orderData) {
  try {

    // Validate Employee
    const employee = await conn.query(
      "SELECT employee_id FROM employee WHERE employee_id = ?",
      [orderData.employee_id]
    );

    if (!employee || employee.length === 0) {
      throw new Error("Employee ID does not exist");
    }

    // Validate Customer
    const customer = await conn.query(
      "SELECT customer_id FROM customer_identifier WHERE customer_id = ?",
      [orderData.customer_id]
    );

    if (!customer || customer.length === 0) {
      throw new Error("Customer ID does not exist");
    }

    // Validate Vehicle
    const vehicle = await conn.query(
      "SELECT vehicle_id FROM customer_vehicle_info WHERE vehicle_id = ?",
      [orderData.vehicle_id]
    );

    if (!vehicle || vehicle.length === 0) {
      throw new Error("Vehicle ID does not exist");
    }

    // Validate Services
    if (orderData.services && orderData.services.length > 0) {
      for (const service of orderData.services) {

        const serviceExists = await conn.query(
          "SELECT service_id FROM common_services WHERE service_id = ?",
          [service.service_id]
        );

        if (!serviceExists || serviceExists.length === 0) {
          throw new Error(
            `Service ID ${service.service_id} does not exist`
          );
        }
      }
    }

    const orderHash = crypto.randomBytes(16).toString("hex");

    // 1. INSERT INTO orders
    const orderQuery = `
      INSERT INTO orders (
        employee_id,
        customer_id,
        vehicle_id,
        active_order,
        order_hash
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const orderResult = await conn.query(orderQuery, [
      orderData.employee_id,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.active_order,
      orderHash,
    ]);

    const orderId = orderResult.insertId;

    // 2. INSERT INTO order_info
    const orderInfoQuery = `
      INSERT INTO order_info (
        order_id,
        order_total_price,
        estimated_completion_date,
        completion_date,
        additional_request,
        notes_for_internal_use,
        notes_for_customer,
        additional_requests_completed
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await conn.query(orderInfoQuery, [
      orderId,
      orderData.order_total_price,
      orderData.estimated_completion_date,
      orderData.completion_date || null,
      orderData.additional_request,
      orderData.notes_for_internal_use,
      orderData.notes_for_customer,
      orderData.additional_requests_completed,
    ]);

    // 3. INSERT INTO order_services
    if (orderData.services && orderData.services.length > 0) {
      for (const service of orderData.services) {

        const serviceQuery = `
          INSERT INTO order_services (
            order_id,
            service_id,
            service_completed
          )
          VALUES (?, ?, ?)
        `;

        await conn.query(serviceQuery, [
          orderId,
          service.service_id,
          service.service_completed,
        ]);
      }
    }

    // 4. INSERT INTO order_status
    const statusQuery = `
      INSERT INTO order_status (
        order_id,
        order_status
      )
      VALUES (?, ?)
    `;

    await conn.query(statusQuery, [
      orderId,
      orderData.order_status,
    ]);

    return {
      success: true,
      order_id: orderId,
      order_hash: orderHash,
    };

  } catch (error) {
    console.log("DATABASE QUERY ERROR:");
    console.log(error);
    throw error;
  }
}

// GET ALL ORDERS
async function getAllOrders() {
  try {
    const query = `
     SELECT 
  o.order_id,
  o.order_date,
  o.active_order,

  c.customer_first_name,
  c.customer_last_name,

  v.vehicle_make,
  v.vehicle_model,
  v.vehicle_year,

  oi.order_total_price,
  oi.estimated_completion_date,

  os.order_status

FROM orders o

JOIN customer_identifier ci 
  ON o.customer_id = ci.customer_id

JOIN customer_info c 
  ON ci.customer_id = c.customer_id

JOIN customer_vehicle_info v 
  ON o.vehicle_id = v.vehicle_id

JOIN order_info oi 
  ON o.order_id = oi.order_id

JOIN order_status os 
  ON o.order_id = os.order_id

ORDER BY o.order_id DESC;
    `;
    const rows = await conn.query(query);
    return rows;

  } catch (error) {
    console.log("DATABASE QUERY ERROR:");
    console.log(error);
    throw error;
  }
}

// GET SINGLE ORDER
async function getSingleOrder(orderId) {
  try {
    const query = `
      SELECT 
        o.order_id,
        o.employee_id,
        o.customer_id,
        o.vehicle_id,
        o.active_order,
        o.order_date,

        oi.order_total_price,
        oi.estimated_completion_date,
        oi.completion_date,
        oi.additional_request,
        oi.notes_for_internal_use,
        oi.notes_for_customer,
        oi.additional_requests_completed,

        os.order_status

      FROM orders o

      LEFT JOIN order_info oi
        ON o.order_id = oi.order_id

      LEFT JOIN order_status os
        ON o.order_id = os.order_id

      WHERE o.order_id = ?
    `;

    const rows = await conn.query(query, [orderId]);

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];

  } catch (error) {
    console.log("GET SINGLE ORDER ERROR:");
    console.log(error);
    throw error;
  }
}
// UPDATE ORDER
async function updateOrder(orderId, data) {
  try {

    // GET VEHICLE ID OF CURRENT ORDER ONLY
    const orderRows = await conn.query(
  `SELECT vehicle_id FROM orders WHERE order_id = ?`,
  [orderId]
);

if (!orderRows || orderRows.length === 0) {
  throw new Error("Order not found");
}

const vehicleId = orderRows[0].vehicle_id;

    // UPDATE VEHICLE
    await conn.query(
      `UPDATE customer_vehicle_info
       SET vehicle_make = ?,
           vehicle_model = ?,
           vehicle_year = ?,
           vehicle_tag = ?
       WHERE vehicle_id = ?`,
      [
        data.vehicle_make,
        data.vehicle_model,
        data.vehicle_year,
        data.vehicle_tag,
        vehicleId,
      ]
    );

    // UPDATE ORDER STATUS
    await conn.query(
      `UPDATE order_status
       SET order_status = ?
       WHERE order_id = ?`,
      [
        data.order_status,
        orderId,
      ]
    );

    return { success: true };

  } catch (error) {
    console.log("UPDATE ORDER ERROR:", error);
    throw error;
  }
}
async function deleteOrder(orderId) {
  try {

    // 1. delete from child tables first (IMPORTANT)

    await conn.query(
      `DELETE FROM order_services WHERE order_id = ?`,
      [orderId]
    );

    await conn.query(
      `DELETE FROM order_info WHERE order_id = ?`,
      [orderId]
    );

    await conn.query(
      `DELETE FROM order_status WHERE order_id = ?`,
      [orderId]
    );

    // 2. delete main order
    await conn.query(
      `DELETE FROM orders WHERE order_id = ?`,
      [orderId]
    );

    return {
      success: true,
      message: "Order deleted successfully"
    };

  } catch (error) {
    console.log("DELETE ORDER ERROR:", error);
    throw error;
  }
}
module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder
};