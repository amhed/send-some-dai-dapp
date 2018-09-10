import { contractAddresses } from '../../client-config'
const addresses = contractAddresses

const web3 = window.web3 || {}
import oasisContractAbi from './odcontract.json'
const oasis = web3.eth.contract(oasisContractAbi).at(addresses.oasis)

import erc20contractAbi from './erc20contract.json'
const weth = web3.eth.contract(erc20contractAbi).at(addresses.weth)
const dai = web3.eth.contract(erc20contractAbi).at(addresses.weth)

export function buyDai(amount, cb) {
  //TODO: use await instead? keeping track of variables is hard
  let transactionHash
  oasis.buyAllAmount.sendTransaction(
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
  weth.approve.sendTransaction(
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
  weth.deposit.sendTransaction(
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
  dai.transfer.sendTransaction(
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
  const event = weth.Approval({ src: web3.eth.accounts[0] }, { fromBlock: 0, toBlock: 'latest' })

  event.get((err, evts) => (err ? cb(err) : cb(null, !!evts.length)))
}
