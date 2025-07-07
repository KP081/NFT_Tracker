const { buildModule } = require("@nomicfoundation/ignition-core");

module.exports = buildModule("MyDeploymentModule", (m) => {
  const myToken = m.contract("MyNFT");

  return { myToken };
});
