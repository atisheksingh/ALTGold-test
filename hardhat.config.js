require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require("@openzeppelin/hardhat-upgrades");
require("@primitivefi/hardhat-dodoc")
require("dotenv").config();



module.exports = {
   gasReporter: {
    enabled: true,
  },

  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
     hodi: {
      url: "https://eth-hoodi.g.alchemy.com/v2/-BEr0WV42JVdU2BXjs9L_HGGkxBDdkGH", 
      accounts :  process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
      chainId: 560048,
    }
  },
};