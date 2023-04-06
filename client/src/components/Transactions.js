import React, { useState, useEffect } from 'react'
import TransactionDetails from './TransactionDetails';

export default function Transactions(props) {
    const [sentTransactions, setsentTransactions] = useState()
    const [direction, setdirection] = useState("from")


    const fetchSentTransactions = async () => {
        let params={}
        console.log("hello")
        if(direction==="from"){

             params = {
                fromBlock: "0x0",
                category: ["external", "internal", "erc20", "erc721", "erc1155"],
                fromAddress: props.senderAddress
              };
        }
        else{
             params = {
                fromBlock: "0x0",
                category: ["external", "internal", "erc20", "erc721", "erc1155"],
                toAddress: props.senderAddress
              };
        }

        let data = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 0,
            "method": "alchemy_getAssetTransfers",
            "params": [
                params
            ]
        });


        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data,
            redirect: 'follow'
        };

        const baseURL = process.env.REACT_APP_SEPOLIA_URL;
        const fetchURL = `${baseURL}`;

        fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then(result => setsentTransactions(result.result.transfers))
            .catch(error => console.log('error', error));

    }


    useEffect(() => {
        props.senderAddress && fetchSentTransactions()
    }, [props.senderAddress,direction])




    return (
        <div className='transactions'>
            <h2>Transactions</h2>
            <div className='sentReceivedToggle'>
                <button className='btn1' onClick={()=>{setdirection("from")}}>Sent</button>
                <button className='btn2'  onClick={()=>{setdirection("to")}}>Received</button>
            </div>
          {direction==="from" && sentTransactions && sentTransactions.map((element) => {
                return <TransactionDetails toAddress={element.to} value={element.value} color="red" direction="To" />

            })}
          {direction==="to" && sentTransactions && sentTransactions.map((element) => {
                return <TransactionDetails toAddress={element.from} value={element.value} color="green" direction="From"/>

            })}
        </div>
    )
}
