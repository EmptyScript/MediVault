const MyContract = artifacts.require("Authentication");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};
