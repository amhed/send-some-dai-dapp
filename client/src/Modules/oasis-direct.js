import { contractAddresses } from '../client-config'
import oasisContractAbi from './odcontract.json'
import erc20contractAbi from './erc20contract.json'

const web3 = window.web3
const addresses = contractAddresses

let _oasisContract, _wethContract, _daiContract
const contracts = () => {
  if (!web3) {
    throw Error('Web3 is not present')
  }

  _oasisContract = _oasisContract || web3.eth.contract(oasisContractAbi).at(addresses.oasis)
  _wethContract = _wethContract || web3.eth.contract(erc20contractAbi).at(addresses.weth)
  _daiContract = _daiContract || web3.eth.contract(erc20contractAbi).at(addresses.weth)

  return {
    oasis: _oasisContract,
    weth: _wethContract,
    dai: _daiContract
  }
}

export function buyDai(amount, cb) {
  //TODO: use await instead? keeping track of variables is hard
  //TODO: keep track of all transaction fees
  let transactionHash
  contracts().oasis.buyAllAmount.sendTransaction(
    addresses.dai,
    amount,
    addresses.weth,
    500000000000000000000,
    {
      from: web3.eth.accounts[0],
      gas: 4000000
    },
    onbuy
  )

  function onbuy(err, _transactionHash) {
    if (err) return cb(err)
    transactionHash = _transactionHash
    web3.eth.getTransaction(transactionHash, ontransaction)
  }

  function ontransaction(err, transaction) {
    if (err) return cb(err)
    if (transaction && transaction.blockNumber) return cb(null, transactionHash)
    setTimeout(() => web3.eth.getTransaction(transactionHash, ontransaction), 1000)
  }
}

export function approveWeth(cb) {
  let transactionHash
  contracts().weth.approve.sendTransaction(
    addresses.oasis,
    -1,
    {
      from: web3.eth.accounts[0],
      gas: 4000000
    },
    onsend
  )

  function onsend(err, _transactionHash) {
    if (err) return cb(err)
    transactionHash = _transactionHash
    web3.eth.getTransaction(transactionHash, ontransaction)
  }

  function ontransaction(err, transaction) {
    if (err) return cb(err)
    if (transaction && transaction.blockNumber) return cb(null, transactionHash)
    setTimeout(() => web3.eth.getTransaction(transactionHash, ontransaction), 1000)
  }
}

export function buyWeth(val, cb) {
  let transactionHash
  contracts().weth.deposit.sendTransaction(
    {
      from: web3.eth.accounts[0],
      gas: 4000000,
      value: val
    },
    ondeposit
  )

  function ondeposit(err, _transactionHash) {
    if (err) return cb(err)
    transactionHash = _transactionHash
    web3.eth.getTransaction(transactionHash, ontransaction)
  }

  function ontransaction(err, transaction) {
    if (err) return cb(err)
    if (transaction && transaction.blockNumber) return cb(null, transactionHash)
    setTimeout(() => web3.eth.getTransaction(transactionHash, ontransaction), 1000)
  }
}

export function transferDai(toAddr, amount, cb) {
  let transactionHash
  contracts().dai.transfer.sendTransaction(
    toAddr,
    amount,
    {
      from: web3.eth.accounts[0],
      gas: 4000000
    },
    ontransfer
  )

  function ontransfer(err, _transactionHash) {
    if (err) return cb(err)
    transactionHash = _transactionHash
    web3.eth.getTransaction(transactionHash, ontransaction)
  }

  function ontransaction(err, transaction) {
    if (err) return cb(err)
    if (transaction && transaction.blockNumber) return cb(null, transactionHash)
    setTimeout(() => web3.eth.getTransaction(transactionHash, ontransaction), 1000)
  }
}

export function checkApproval(cb) {
  const event = contracts().weth.Approval({ src: web3.eth.accounts[0] }, { fromBlock: 0, toBlock: 'latest' })

  event.get((err, evts) => (err ? cb(err) : cb(null, !!evts.length)))
}
