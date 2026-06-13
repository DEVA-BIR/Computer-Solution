const express = require("express")
const router = express.Router()
//import install routes
const installRouter= require('./install.routes')
//Add the install route to the main router 
const loginRoutes = require("./login.routes"); 
//import employee routes
const employeeRouter = require('./employee.routes')
const customerRouter = require('./customer.routes')
router.use(installRouter)
router.use(loginRoutes)
router.use(employeeRouter)
router.use(customerRouter)
module.exports = router