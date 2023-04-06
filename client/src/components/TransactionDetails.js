import React from 'react'

export default function TransactionDetails(props) {
  return (
    <div className='TransactionDetails'>
        <p className='textDullWhite'>{props.direction}</p>
        <p>{props.toAddress}</p>
        <p className={`text${props.color}`}>{props.value} Eth</p>

    </div>
  )
}
