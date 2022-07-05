var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/26899ef6feb74fba84a1b04fca65199b')

const account1 = '0x5b6d18054a6c88923F9202607726c4c50e091822'
const account2 = '0x6302d56f3030E17B477bEFB9000d01d210C8882D'

const privateKey1 = Buffer.from('8846a95a810caca9eee3751e39219ba96ebdbf6d11f5498ca0df78776a67e696', 'hex')
const privateKey2 = Buffer.from('9ca0b28d6438296d8be8ae90b7b0ad68280101be8e4b38e0dfea1efdd0eb3e72', 'hex')

const contractABI = [{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contractAddress = '0xc5bE4C7d41746B3e40ECb18102fBa21B30dbfcd8'


const storageContract  = new web3.eth.Contract(contractABI, contractAddress)


const data = storageContract.methods.retrieve().encodeAbi()

//console.log(data)




web3.eth.getTransactionCount(account1, (err, txCount) => {

   // const data = '0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea26469706673582212209a159a4f3847890f10bfb87871a61eba91c5dbf5ee3cf6398207e292eee22a1664736f6c63430008070033'

    //create tarns object
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        data: data
    }


    //sign the tr
    var tx = new Tx(txObject) 
        tx.sign(privateKey1)

        const serializedTransaction = tx.serialize()
        const raw = '0x' + serializedTransaction.toString('hex')


    //broadcast trans
    web3.eth.sendSignedTransaction(raw, (err, txHash) =>{
        console.log('err', err, 'Tx hash: ', txHash)
    } ) 

})
