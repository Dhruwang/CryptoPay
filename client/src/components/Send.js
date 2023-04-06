import React, { useState, useEffect } from 'react'
import Spinner from './Spinner'
const Web3 = require("web3")


export default function Send(props) {
    const [receiverAddress, setreceiverAddress] = useState("")
    const [amount, setAmount] = useState("")
    const [loading, setloading] = useState(false)

    const web3 = new Web3(window.ethereum)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if(receiverAddress===""){
            document.getElementById("alertMsg").innerHTML = "Please Enter address"
            document.getElementById("alertMsg").style.opacity = 1
            return
        }
        if(amount<=0 || amount===""){
            console.log("hello")
            document.getElementById("alertMsg").innerHTML = "Invalid Amount"
            document.getElementById("alertMsg").style.opacity = 1
            return
        }
        if (amount>props.balance) {
            document.getElementById("alertMsg").innerHTML = "Insufficient Funds"
            document.getElementById("alertMsg").style.opacity = 1
            return
        }
        setloading(true)
        await web3.eth.sendTransaction({
            from: props.senderAddress,
            to: receiverAddress,
            value: web3.utils.toWei(amount, "ether")
        })
            .then(function (receipt) {
                setreceiverAddress("")
                setAmount("")
                setloading(false)
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
                    <input type='string' value={receiverAddress} onChange={handleAddress}></input>
                </div>
                <div className='inputDiv'>
                    <label>Enter amount</label>
                    <input type='number' id='numberInput' step="any" value={amount} onChange={handleAmount}></input>
                    <p className='textred' id='alertMsg'>Insufficient Funds</p>
                </div>
                {loading?<Spinner/>:<button className='btn'>Next</button>}
            </form>
        </div>
    )
}
