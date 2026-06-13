const express = require('express')
const router = express.Router()
//import installController
const installController = require('../Controllers/install.controller')

//create a route handle to install the request on get
router.get('/install', installController.install)
module.exports = router

