// Import the customer service 
const customerService = require('../Services/customer.service');

// Create customer
async function createCustomer(req, res) {
  console.log(req.body);
  try {
    // Check if customer email already exists
    const customerExists = await customerService.checkIfCustomerExists(
      req.body.customer_email
    );

    if (customerExists) {
      return res.status(400).json({
        error: "This email address is already associated with another customer!"
      });
    }

    // Create customer
    const customer = await customerService.createCustomer(req.body);

    if (!customer) {
      return res.status(400).json({
        error: "Failed to add the customer!"
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Customer created successfully"
    });

  } catch (error) {
    console.error(error); // ✅ FIXED (was err)

    return res.status(500).json({
      error: "Something went wrong!"
    });
  }
}

// Get all customers
async function getAllCustomers(req, res) {
  try {
    const customers = await customerService.getAllCustomers();

   res.status(200).json({
  data: customers,
});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
}
async function updateCustomer(req, res) {
  try {
    const result = await customerService.updateCustomer(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to update customer",
    });
  }
}
async function deleteCustomer(req, res) {
  try {
    await customerService.deleteCustomer(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Failed to delete customer",
    });
  }
}

// Export controllers
module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
};