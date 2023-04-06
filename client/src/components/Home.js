import React, { useEffect, useState } from 'react'
const Web3 = require("web3")


export default function Home(props) {


  return (
    <div className='home'>
      {!props.walletConnected && <div className='walletConnectAlert'>
        <p>Please Connect your wallet</p>
        <button className='btn-primary' onClick={()=>{props.connectWallet()}}>Connect</button>
      </div>}
      {props.walletConnected && <div className='homeInner'>

        <div className='homeUpper'>
          <div className='adddressDiv'>
            <p className='textDullWhite'>Your Address</p>
            <p className='textWhite'>{props.senderAddress}</p>
          </div>
          <div className='balanceDiv'>
            <p className='textDullWhite'>Your account balance</p>
            <p className='textWhite' id='balanceAmount'>{props.balance} Eth</p>
          </div>
        </div>
        <div className='homeLower'>
          <button className='btn-primary' onClick={() => { props.setsend(false) }}>History</button>
          <button className='btn-secondary' onClick={() => { props.setsend(true) }}>Send</button>
        </div>
      </div>}
    </div>
  )
}
