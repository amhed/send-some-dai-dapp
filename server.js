const express = require('express')
const mongojs = require('mongojs')
const ethUtil = require('ethereumjs-util')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 5000

const db = mongojs('mongodb://app:sendsomedai1@ds149732.mlab.com:49732/send-some-dai', ['users'])

app.use(session({
  secret: 'my name is ed and I am awesome',
  resave: false,
  saveUninitialized: true
}))

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' })
})

app.get('/sess', (req, res) => {
  req.session.test = 'hey'
  res.send(req.session.test)
})

app.get('/ses', (req, res) => {
  res.send(req.session.test)
})

app.get('/api/start-login/:username', (req, res) => {
  var randomNumber 

  console.log(req.session, req.session.loggedIn)
  if (req.session.loggedIn) return res.send({loggedIn: true})
  db.users.findOne({username: req.params.username}, onuser)

  function onuser (err, user) {
    if (err) return res.status(500).send({error: err})
    if (!user) return res.status(404).send({error: 'user not found'})

    randomNumber = Math.floor(Math.random() * 1000000).toString()
    db.users.update({
      username: req.params.username
    }, {
      $set: {nonce: `Hey, I'm logging in to send-some-dai with ${randomNumber}`}
    }, onupdate)
  }

  function onupdate (err) {
    if (err) return res.status(500).send({error: err})
    db.users.findOne({username: req.params.username}, onuseragain)
  }

  function onuseragain (err, user) {
    if (err) return res.status(500).send({error: err})
    res.send(user)
  }
})

app.get('/api/finish-login/:username', (req, res) => {
  db.users.findOne({username: req.params.username}, onuser)

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
    if (address.toLowerCase() === req.query.address.toLowerCase()) {
      console.log('SESSION BABY!')
      req.session.loggedIn = true
      res.send({loggedIn: true})
    } else {
      res.send({loggedIn: false})
    }
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`))
