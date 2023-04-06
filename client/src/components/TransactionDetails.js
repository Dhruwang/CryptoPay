import React from 'react'

export default function TransactionDetails(props) {
  return (
    <div className='TransactionDetails'>
        <p className='textDullWhite'>To:</p>
        <p>{props.toAddress}</p>
        <p className='textRed'>{props.value} Eth</p>

    </div>
  )
}
