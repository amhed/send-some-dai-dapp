### Metamask login sample

```js
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
```