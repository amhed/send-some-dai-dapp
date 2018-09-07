var express = require('express')
var web3 = require('web3')
var ethUtil = require('ethereumjs-util')

var app = express()
app.use(express.static('public'))


var accounts = {}
app.get('/start-login', function (req, res) {
  var account = req.query.account
  accounts[account] = Math.floor(Math.random() * 1000000).toString()
  res.send({nonce: `I'm using mandai ${accounts[account]}`})
})

app.get('/complete-login', function (req, res) {
  var msgHash = ethUtil.hashPersonalMessage(ethUtil.toBuffer(`I'm using mandai ${accounts[req.query.account]}`))

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
    res.status(200).send({msg:'yay!'})
  } else {
    res.status(401).send({msg:'awww'})
  }
})

app.listen(3100)
