const installService = require('../Services/install.service');
//create a function to handle the install request
async function install(req, res, next) {
  // call the database to create the tables
  const installMessage = await installService.install();
  if (installMessage.status === 200) {  
    res.status(200).json(installMessage);
  } else {
    res.status(500).json(installMessage);
  }
}
    module.exports = {
        install
    };