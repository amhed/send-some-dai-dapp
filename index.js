var express = require('express')
var web3 = require('web3')
var ethUtil = require('ethereumjs-util')

var app = express()
app.use(express.static('public'))


var accounts = {}
app.get('/start-login', function (req, res) {
  var account = req.query.account
  accounts[account] = Math.floor(Math.random() * 1000000).toString()
  res.send({nonce: accounts[account]})
})

app.get('/complete-login', function (req, res) {
  var msgHash = ethUtil.hashPersonalMessage(ethUtil.toBuffer(accounts[req.query.account]))

  var signatureBuffer = ethUtil.toBuffer(req.query.signature)
  var signatureParams = ethUtil.fromRpcSig(signatureBuffer)
  var publicKey = ethUtil.ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  )
  var addressBuffer = ethUtil.publicToAddress(publicKey)
  var address = ethUtil.bufferToHex(addressBuffer)

  if (address.toLowerCase() === req.query.address.toLowerCase()) {
    res.send({msg:'yay!'})
  } else {
    res.send({msg:'awww'})
  }
})

app.listen(3100)
