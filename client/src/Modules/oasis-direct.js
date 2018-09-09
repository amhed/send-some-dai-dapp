var web3 = window.web3 || {}
var oasisDesc = require('./odcontract.json')
var oasisAddress = '0x8cf1cab422a0b6b554077a361f8419cdf122a9f9'
var oasis = web3.eth.contract(oasisDesc).at(oasisAddress);

var wethAddress = '0xd0a1e359811322d97991e03f863a0c30c2cf029c'
var erc20contract = require('./erc20contract.json')
var weth = web3.eth.contract(erc20contract).at(wethAddress)

var daiAddress = '0xc4375b7de8af5a38a93548eb8453a498222c4ff2'
var dai = web3.eth.contract(erc20contract).at(daiAddress)

exports.buyDai = function (amount, cb) {
  var transactionHash
  oasis.buyAllAmount.sendTransaction(daiAddress, amount, wethAddress, 500000000000000000000, {
    from: web3.eth.accounts[0],
    gas:4000000
  }, onbuy)

  function onbuy (err, _transactionHash) {
    if (err) return cb(err)
    transactionHash = _transactionHash
    web3.eth.getTransaction(transactionHash, ontransaction)
  }

  function ontransaction (err, transaction) {
    if (err) return cb(err)
    if (transaction && transaction.blockNumber) return cb(null, transactionHash)
    setTimeout(() => web3.eth.getTransaction(transactionHash, ontransaction), 1000)
  }
}

exports.approveWeth = function (cb) {
  var transactionHash
  weth.approve.sendTransaction(oasisAddress, -1, {
    from: web3.eth.accounts[0],
    gas:4000000
  }, onsend)
  
  function onsend (err, _transactionHash) {
    if (err) return cb(err)
    transactionHash = _transactionHash
    web3.eth.getTransaction(transactionHash, ontransaction)
  }

  function ontransaction (err, transaction) {
    if (err) return cb(err)
    if (transaction && transaction.blockNumber) return cb(null, transactionHash)
    setTimeout(() => web3.eth.getTransaction(transactionHash, ontransaction), 1000)
  }
}

exports.buyWeth = function (val, cb) {
  var transactionHash
  weth.deposit.sendTransaction({
    from: web3.eth.accounts[0],
    gas:4000000,
    value: val
  }, ondeposit)

  function ondeposit (err, _transactionHash) {
    if (err) return cb(err)
    transactionHash = _transactionHash
    web3.eth.getTransaction(transactionHash, ontransaction)
  }

  function ontransaction (err, transaction) {
    if (err) return cb(err)
    if (transaction && transaction.blockNumber) return cb(null, transactionHash)
    setTimeout(() => web3.eth.getTransaction(transactionHash, ontransaction), 1000)
  }
}

exports.transferDai = function (toAddr, amount, cb) {
  var transactionHash
  dai.transfer.sendTransaction(toAddr, amount, {
    from: web3.eth.accounts[0],
    gas:4000000
  }, ontransfer)

  function ontransfer (err, _transactionHash) {
    if (err) return cb(err)
    transactionHash = _transactionHash
    web3.eth.getTransaction(transactionHash, ontransaction)
  }

  function ontransaction (err, transaction) {
    if (err) return cb(err)
    if (transaction && transaction.blockNumber) return cb(null, transactionHash)
    setTimeout(() => web3.eth.getTransaction(transactionHash, ontransaction), 1000)
  }
}

exports.checkApproval = function (cb) {
  var event = weth.Approval({src: web3.eth.accounts[0]}, {fromBlock: 0, toBlock: 'latest'})
  event.get(function (err, evts) {
    if (err) return cb(err)
    cb(null, !!evts.length)
  })
}
