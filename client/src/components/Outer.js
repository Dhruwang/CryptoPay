import React,{useState,useEffect} from 'react'
import Home from './Home'
import Transactions from './Transactions'
import Send from './Send'
import Animation from './Animation'

export default function Outer() {

const Web3 = require("web3")
const [send, setsend] = useState(true)
const [balance, setbalance] = useState(0)
const [senderAddress, setSenderAddress] = useState("")
const [walletConnected, setwalletConnected] = useState(false)



const web3 = new Web3(window.ethereum)

const connectWallet = () => {
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(res => {
        // Return the address of the wallet
        setSenderAddress(res[0])
        setwalletConnected(true)
        web3.eth.getBalance(res[0])
          .then((balance) => {
            setbalance(web3.utils.fromWei(balance))
          })
      })
  } else {
    alert("install metamask extension!!")
  }
}
window.ethereum && window.ethereum.on('accountsChanged', function (accounts) {
    connectWallet()
  })
  window.ethereum && window.ethereum.on('chainChanged', () => {
    connectWallet()
  })
  
useEffect(() => {
    connectWallet()
  }, [])

  return (
    <div className='outer'>
        <Animation />
        <Home balance={balance} connectWallet={connectWallet} senderAddress={senderAddress} setsend={setsend} walletConnected={walletConnected}/>
        {!send && <Transactions senderAddress={senderAddress} />}
        {send && <Send senderAddress={senderAddress} balance={balance}/>}
    </div>
  )
}
