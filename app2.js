var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/26899ef6feb74fba84a1b04fca65199b')

/*
,,There was issue on truffle wallet provider url. 
I was going to use Goerli and there was enough fund but I wrote with mainnet url. 
So it was checking mainnet account and showing me insufficient balance. 
After I indicate wallet provider to goerli then it worked. Thanks."
From: https://ethereum.stackexchange.com/questions/93428/error-returned-error-insufficient-funds-for-gas-price-value-at-object-erro
and the new tx()...
*/

const account1 = '0x5b6d18054a6c88923F9202607726c4c50e091822'
const account2 = '0x6302d56f3030E17B477bEFB9000d01d210C8882D'

const privateKey1 = Buffer.from('8846a95a810caca9eee3751e39219ba96ebdbf6d11f5498ca0df78776a67e696', 'hex')
const privateKey2 = Buffer.from('9ca0b28d6438296d8be8ae90b7b0ad68280101be8e4b38e0dfea1efdd0eb3e72', 'hex')


const contractABI = [{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contractAddress = '0x03E2Dc66c023537CF582058A60193D1d6F1a409c'
var storageContract = new web3.eth.Contract(contractABI, contractAddress)

//storageContract.methods.name().call((err, result) => {console.log(result)})




web3.eth.getTransactionCount(account1, (err, txCount) => {
//smart contract data
const data = '0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea26469706673582212209a159a4f3847890f10bfb87871a61eba91c5dbf5ee3cf6398207e292eee22a1664736f6c63430008070033'


//create trans object

const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    data: data
}

//sign the transaction
var tx = new Tx(txObject,{ chain: 'ropsten' }) 
    tx.sign(privateKey1)

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')


    //broadcast the transaction
web3.eth.sendSignedTransaction(raw, (err, txHash) =>{
    console.log('Tx hash: ', txHash, 'err:' , err)
} ) 

/*console.log('data:', data)
console.log('gaslimit: ', txObject.gasLimit)
console.log('gasprice: ', txObject.gasPrice)
*/
})