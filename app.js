var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/26899ef6feb74fba84a1b04fca65199b')

const account1 = '0x5b6d18054a6c88923F9202607726c4c50e091822'
const account2 = '0x6302d56f3030E17B477bEFB9000d01d210C8882D'
/*
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1)
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2)

web3.eth.getBalance(account1, (err, bal) => {
    console.log('account 1 balance:', web3.utils.fromWei(bal,'ether'))
})

web3.eth.getBalance(account2, (err, bal) => {
    console.log('account 2 balance:', web3.utils.fromWei(bal,'ether'))
})
*/



web3.eth.getTransactionCount(account1, (err, txCount) => {

    //build a transaction
    const txObject ={
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    console.log(txObject)
})

    //sign the transaction
    /*
    const tx=  new Tx(txObject)
    tx.sign(privateKey1)
    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')

    // broadcast the transaction

    web3.eth.sendSignedTransaction(raw, (err, txHash) =>{
        console.log('Tx hash: ', txHash)
    } ) 
})
*/