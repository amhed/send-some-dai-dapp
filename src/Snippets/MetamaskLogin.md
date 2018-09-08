### Metamask login sample

```js
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
    var msgHash = ethUtil.hashPersonalMessage(ethUtil.toBuffer(`I'm using mandai ${accounts[req.query.account]}`))
(accounts[req.query.account]))
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
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  MetaMask test
</body>
<script>
  setTimeout(function () {
    var nonce = fetch('/start-login?address=' + web3.eth.accounts[0]).then(r => r.json()).then(x => x.nonce)
    var sig = nonce.then(n => {
      return new Promise((resolve, reject) => {
        console.log('ACCS', web3.eth.accounts)
        web3.personal.sign(web3.fromUtf8(n), web3.eth.accounts[0], (err, res) => resolve(res))
      })
    })
     sig.then(s => fetch(`/complete-login?address=${web3.eth.accounts[0]}&signature=${s}`)).then(x => x.json()).then(console.log)
  }, 1000)
  // 
</script>
</html>
```