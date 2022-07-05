const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/26899ef6feb74fba84a1b04fca65199b')

//web3.eth.getBlockNumber().then(console.log)
web3.eth.getBlock('latest').then((block) => {
    console.log(block.hash)
})