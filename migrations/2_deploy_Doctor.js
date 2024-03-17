const Contract = artifacts.require("Doctor");

module.exports = function(deployer) {
  deployer.deploy(Contract);
};
