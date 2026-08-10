const conn = require("../Config/dbconfig.js");
const crypto = require("crypto");

// =====================================================
// CREATE ORDER
// =====================================================
async function createOrder(orderData) {
  try {

    // =================================================
    // VALIDATE EMPLOYEE
    // =================================================
    const employee = await conn.query(
      `
      SELECT employee_id
      FROM employee
      WHERE employee_id = ?
      `,
      [orderData.employee_id]
    );

    if (!employee || employee.length === 0) {
      throw new Error("Employee ID does not exist");
    }

    // =================================================
    // VALIDATE CUSTOMER
    // =================================================
    const customer = await conn.query(
      `
      SELECT customer_id
      FROM customer_identifier
      WHERE customer_id = ?
      `,
      [orderData.customer_id]
    );

    if (!customer || customer.length === 0) {
      throw new Error("Customer ID does not exist");
    }

    // =================================================
    // VALIDATE DEVICE
    // =================================================
    const device = await conn.query(
      `
      SELECT device_id
      FROM customer_device_info
      WHERE device_id = ?
      `,
      [orderData.device_id]
    );

    if (!device || device.length === 0) {
      throw new Error("Device ID does not exist");
    }

    // =================================================
    // VALIDATE SERVICES
    // =================================================
    if (
      Array.isArray(orderData.services) &&
      orderData.services.length > 0
    ) {
      for (const service of orderData.services) {

        const serviceExists = await conn.query(
          `
          SELECT service_id
          FROM common_services
          WHERE service_id = ?
          `,
          [service.service_id]
        );

        if (!serviceExists || serviceExists.length === 0) {
          throw new Error(
            `Service ID ${service.service_id} does not exist`
          );
        }
      }
    }

    // =================================================
    // GENERATE ORDER ID
    // =================================================
    const orderIdResult = await conn.query(
      `
      SELECT COALESCE(MAX(order_id), 0) + 1 AS nextOrderId
      FROM orders
      `
    );

    const order_id = Number(orderIdResult[0].nextOrderId);

    // =================================================
    // GENERATE ORDER INFO ID
    // =================================================
    const orderInfoIdResult = await conn.query(
      `
      SELECT COALESCE(MAX(order_info_id), 0) + 1 AS nextOrderInfoId
      FROM order_info
      `
    );

    const order_info_id =
      Number(orderInfoIdResult[0].nextOrderInfoId);

    // =================================================
    // GENERATE ORDER HASH
    // =================================================
    const orderHash = crypto
      .randomBytes(16)
      .toString("hex");

    // =================================================
    // INSERT INTO ORDERS
    // =================================================
    const orderQuery = `
      INSERT INTO orders (
        order_id,
        employee_id,
        customer_id,
        device_id,
        active_order,
        order_hash
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const orderResult = await conn.query(
      orderQuery,
      [
        order_id,
        orderData.employee_id,
        orderData.customer_id,
        orderData.device_id,
        orderData.active_order ?? 1,
        orderHash,
      ]
    );

    if (orderResult.affectedRows !== 1) {
      throw new Error("Failed to create order");
    }

    // =================================================
    // INSERT INTO ORDER INFO
    // =================================================
    const orderInfoQuery = `
      INSERT INTO order_info (
        order_info_id,
        order_id,
        order_total_price,
        estimated_completion_date,
        completion_date,
        additional_request,
        notes_for_internal_use,
        notes_for_customer,
        additional_requests_completed
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await conn.query(
      orderInfoQuery,
      [
        order_info_id,
        order_id,
        orderData.order_total_price ?? 0,
        orderData.estimated_completion_date || null,
        orderData.completion_date || null,
        orderData.additional_request || "",
        orderData.notes_for_internal_use || "",
        orderData.notes_for_customer || "",
        orderData.additional_requests_completed ?? 0,
      ]
    );

    // =================================================
    // INSERT INTO ORDER SERVICES
    // =================================================
    if (
      Array.isArray(orderData.services) &&
      orderData.services.length > 0
    ) {
      for (const service of orderData.services) {

        await conn.query(
          `
          INSERT INTO order_services (
            order_id,
            service_id,
            service_completed
          )
          VALUES (?, ?, ?)
          `,
          [
            order_id,
            service.service_id,
            service.service_completed ?? 0,
          ]
        );
      }
    }

    // =================================================
    // INSERT INTO ORDER STATUS
    // =================================================
    await conn.query(
      `
      INSERT INTO order_status (
        order_id,
        order_status
      )
      VALUES (?, ?)
      `,
      [
        order_id,
        orderData.order_status || "Pending",
      ]
    );

    // =================================================
    // RETURN SUCCESS
    // =================================================
    return {
      success: true,
      order_id: order_id,
      order_info_id: order_info_id,
      order_hash: orderHash,
    };

  } catch (error) {

    console.log("CREATE ORDER ERROR:", error);

    throw error;
  }
}


// =====================================================
// GET ALL ORDERS
// =====================================================
async function getAllOrders() {
  try {

    const query = `
      SELECT
        o.order_id,
        o.order_date,
        o.active_order,

        ei.employee_first_name,
        ei.employee_last_name,

        c.customer_first_name,
        c.customer_last_name,

        ci.customer_email,
        ci.customer_phone_number,

        v.device_make,
        v.device_model,
        v.device_year,
        v.device_brand,

        oi.order_total_price,
        oi.estimated_completion_date,

        os.order_status

      FROM orders o

      JOIN employee e
        ON o.employee_id = e.employee_id

      JOIN employee_info ei
        ON e.employee_id = ei.employee_id

      JOIN customer_identifier ci
        ON o.customer_id = ci.customer_id

      JOIN customer_info c
        ON ci.customer_id = c.customer_id

      JOIN customer_device_info v
        ON o.device_id = v.device_id

      JOIN order_info oi
        ON o.order_id = oi.order_id

      JOIN order_status os
        ON o.order_id = os.order_id

      ORDER BY o.order_id DESC
    `;

    return await conn.query(query);

  } catch (error) {

    console.log("GET ALL ORDERS ERROR:", error);

    throw error;
  }
}


// =====================================================
// GET SINGLE ORDER
// =====================================================
async function getSingleOrder(orderId) {
  try {

    const query = `
      SELECT
        o.order_id,
        o.employee_id,
        o.customer_id,
        o.device_id,
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

    const rows = await conn.query(
      query,
      [orderId]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];

  } catch (error) {

    console.log("GET SINGLE ORDER ERROR:", error);

    throw error;
  }
}


// =====================================================
// UPDATE ORDER
// =====================================================
async function updateOrder(orderId, data) {
  try {

    // =================================================
    // CHECK ORDER EXISTS
    // =================================================
    const orderRows = await conn.query(
      `
      SELECT
        o.employee_id,
        o.customer_id,
        o.device_id,

        oi.order_total_price,
        oi.estimated_completion_date,
        oi.completion_date,
        oi.additional_request,
        oi.notes_for_internal_use,
        oi.notes_for_customer,

        os.order_status

      FROM orders o

      LEFT JOIN order_info oi
        ON o.order_id = oi.order_id

      LEFT JOIN order_status os
        ON o.order_id = os.order_id

      WHERE o.order_id = ?
      `,
      [orderId]
    );

    if (!orderRows || orderRows.length === 0) {
      throw new Error("Order not found");
    }

    const current = orderRows[0];

    // =================================================
    // FINAL VALUES
    // =================================================
    const updated = {
      employee_id:
        data.employee_id ?? current.employee_id,

      customer_id:
        data.customer_id ?? current.customer_id,

      device_id:
        data.device_id ?? current.device_id,

      order_total_price:
        data.order_total_price ??
        current.order_total_price,

      estimated_completion_date:
        data.estimated_completion_date ??
        current.estimated_completion_date,

      completion_date:
        data.completion_date ??
        current.completion_date,

      additional_request:
        data.additional_request ??
        current.additional_request,

      notes_for_internal_use:
        data.notes_for_internal_use ??
        current.notes_for_internal_use,

      notes_for_customer:
        data.notes_for_customer ??
        current.notes_for_customer,

      order_status:
        data.order_status ??
        current.order_status,
    };

    // =================================================
    // VALIDATE EMPLOYEE
    // =================================================
    const employee = await conn.query(
      `
      SELECT employee_id
      FROM employee
      WHERE employee_id = ?
      `,
      [updated.employee_id]
    );

    if (!employee || employee.length === 0) {
      throw new Error("Employee ID does not exist");
    }

    // =================================================
    // VALIDATE CUSTOMER
    // =================================================
    const customer = await conn.query(
      `
      SELECT customer_id
      FROM customer_identifier
      WHERE customer_id = ?
      `,
      [updated.customer_id]
    );

    if (!customer || customer.length === 0) {
      throw new Error("Customer ID does not exist");
    }

    // =================================================
    // VALIDATE DEVICE
    // =================================================
    const device = await conn.query(
      `
      SELECT device_id
      FROM customer_device_info
      WHERE device_id = ?
      `,
      [updated.device_id]
    );

    if (!device || device.length === 0) {
      throw new Error("Device ID does not exist");
    }

    // =================================================
    // UPDATE ORDERS
    // =================================================
    await conn.query(
      `
      UPDATE orders
      SET
        employee_id = ?,
        customer_id = ?,
        device_id = ?
      WHERE order_id = ?
      `,
      [
        updated.employee_id,
        updated.customer_id,
        updated.device_id,
        orderId,
      ]
    );

    // =================================================
    // UPDATE ORDER INFO
    // =================================================
    await conn.query(
      `
      UPDATE order_info
      SET
        order_total_price = ?,
        estimated_completion_date = ?,
        completion_date = ?,
        additional_request = ?,
        notes_for_internal_use = ?,
        notes_for_customer = ?
      WHERE order_id = ?
      `,
      [
        updated.order_total_price,
        updated.estimated_completion_date,
        updated.completion_date,
        updated.additional_request,
        updated.notes_for_internal_use,
        updated.notes_for_customer,
        orderId,
      ]
    );

    // =================================================
    // UPDATE ORDER STATUS
    // =================================================
    await conn.query(
      `
      UPDATE order_status
      SET order_status = ?
      WHERE order_id = ?
      `,
      [
        updated.order_status,
        orderId,
      ]
    );

    // =================================================
    // UPDATE SERVICES
    // =================================================
    if (Array.isArray(data.services)) {

      await conn.query(
        `
        DELETE FROM order_services
        WHERE order_id = ?
        `,
        [orderId]
      );

      for (const service of data.services) {

        const serviceExists = await conn.query(
          `
          SELECT service_id
          FROM common_services
          WHERE service_id = ?
          `,
          [service.service_id]
        );

        if (!serviceExists || serviceExists.length === 0) {
          throw new Error(
            `Service ID ${service.service_id} does not exist`
          );
        }

        await conn.query(
          `
          INSERT INTO order_services (
            order_id,
            service_id,
            service_completed
          )
          VALUES (?, ?, ?)
          `,
          [
            orderId,
            service.service_id,
            service.service_completed ?? 0,
          ]
        );
      }
    }

    return {
      success: true,
      message: "Order updated successfully",
    };

  } catch (error) {

    console.log("UPDATE ORDER ERROR:", error);

    throw error;
  }
}


// =====================================================
// DELETE ORDER
// =====================================================
async function deleteOrder(orderId) {
  try {

    // =================================================
    // CHECK ORDER EXISTS
    // =================================================
    const order = await conn.query(
      `
      SELECT order_id
      FROM orders
      WHERE order_id = ?
      `,
      [orderId]
    );

    if (!order || order.length === 0) {
      throw new Error("Order not found");
    }

    // =================================================
    // DELETE CHILD TABLES FIRST
    // =================================================
    await conn.query(
      `
      DELETE FROM order_services
      WHERE order_id = ?
      `,
      [orderId]
    );

    await conn.query(
      `
      DELETE FROM order_info
      WHERE order_id = ?
      `,
      [orderId]
    );

    await conn.query(
      `
      DELETE FROM order_status
      WHERE order_id = ?
      `,
      [orderId]
    );

    // =================================================
    // DELETE MAIN ORDER
    // =================================================
    await conn.query(
      `
      DELETE FROM orders
      WHERE order_id = ?
      `,
      [orderId]
    );

    return {
      success: true,
      message: "Order deleted successfully",
    };

  } catch (error) {

    console.log("DELETE ORDER ERROR:", error);

    throw error;
  }
}


// =====================================================
// EXPORT
// =====================================================
module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
```
