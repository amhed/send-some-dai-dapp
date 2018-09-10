const path = require('path')
const express = require('express')
const mongojs = require('mongojs')
const ethUtil = require('ethereumjs-util')
const session = require('express-session')
const wallet = require('ethereumjs-wallet')

const app = express()
const port = process.env.PORT || 5000

const config = require('./config')

const db = mongojs(
  config.mongodb.connString,
  config.mongodb.collections
)

app.use(session({
  secret: config.express.sessionSecret,
  resave: false,
  saveUninitialized: true
}))

//TODO: Amhed: Remove this, not needed?
// app.get('/test-sess', (req, res) => {
//   req.session.test = 'hey'
//   res.send(req.session.test)
// })

// app.get('/ses', (req, res) => {
//   res.send(req.session.test)
// })

app.get('/api/start-login/:address', (req, res) => {
  var randomNumber 

  if (req.session.loggedIn) return res.send({loggedIn: true})
  db.users.findOne({address: req.params.address}, onuser)

  function onuser (err, user) {
    if (err) return res.status(500).send({error: err})
    if (!user) return db.users.insert({address: req.params.address}, oninsert)
    oninsert(null, user)
  }

  function oninsert (err, user) {
    randomNumber = Math.floor(Math.random() * 1000000).toString()
    db.users.update({
      address: req.params.address
    }, {
      $set: {nonce: `Hey, I'm logging in to send-some-dai with ${randomNumber}`}
    }, onupdate)
  }

  function onupdate (err) {
    if (err) return res.status(500).send({error: err})
    db.users.findOne({address: req.params.address}, onuseragain)
  }

  function onuseragain (err, user) {
    if (err) return res.status(500).send({error: err})
    res.send(user)
  }
})

app.get('/api/finish-login/:address', (req, res) => {
  db.users.findOne({address: req.params.address}, onuser)

  function onuser (err, user) {
    if (err) return res.status(500).send({error: err})

    var msgHash = ethUtil.hashPersonalMessage(ethUtil.toBuffer(user.nonce))
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
    if (address.toLowerCase() === user.address.toLowerCase()) {
      req.session.loggedIn = true
      res.send({loggedIn: true})
    } else {
      res.send({loggedIn: false})
    }
  }
})

app.get('/api/create-disposable-wallet', (req, res) => {
  const dwallet = wallet.generate()

  db.disposableWallets.insert({
    pubKey: `0x${dwallet.pubKey.toString('hex')}`,
    privKey: `0x${dwallet.privKey.toString('hex')}`,
    address: dwallet.getAddressString()
  }, oninsert)

  function oninsert (err, wlt) {
    if (err) return res.status(500).send({error: err})
    res.send(wlt)
  }
})

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`))
