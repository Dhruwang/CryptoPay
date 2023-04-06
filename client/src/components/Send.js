import React,{useState,useEffect} from 'react'
const Web3 = require("web3")


export default function Send(props) {
    const [receiverAddress, setreceiverAddress] = useState("")
    const [amount, setAmount] = useState()
  
    const web3 = new Web3(window.ethereum)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await web3.eth.sendTransaction({
          from: props.senderAddress,
          to: receiverAddress,
          value: web3.utils.toWei(amount, "ether")
        })
          .then(function (receipt) {
            setreceiverAddress("")
            setAmount("")
          });
      }
    
      const handleAddress = (e) => {
        setreceiverAddress(e.target.value)
      }
      const handleAmount = (e) => {
        setAmount(e.target.value)
      }


  return (
    <div className='send'>
        <form onSubmit={handleOnSubmit}>
            <div className='inputDiv'>
                <label>Enter address</label>
                <input type='string' onChange={handleAddress}></input>
            </div>
            <div className='inputDiv'>
                <label>Enter amount</label>
                <input type='number' id='numberInput' step="any" onChange={handleAmount}></input>
            </div>
            <button className='btn'>Send</button>
        </form>
    </div>
  )
}
