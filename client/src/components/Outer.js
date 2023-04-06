import React,{useState,useEffect} from 'react'
import Home from './Home'
import Transactions from './Transactions'

export default function Outer() {

    const Web3 = require("web3")

const [balance, setbalance] = useState(0)
const [senderAddress, setSenderAddress] = useState("")


const web3 = new Web3(window.ethereum)

const connectWallet = () => {
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(res => {
        // Return the address of the wallet
        setSenderAddress(res[0])
        web3.eth.getBalance(res[0])
          .then((balance) => {
            setbalance(web3.utils.fromWei(balance))
          })
      })
  } else {
    alert("install metamask extension!!")
  }
}
useEffect(() => {
    connectWallet()
  }, [])

  return (
    <div className='outer'>
        <Home balance={balance} senderAddress={senderAddress}/>
        <Transactions senderAddress={senderAddress}/>
    </div>
  )
}
