import React from 'react'

export default function Send() {
  return (
    <div className='send'>
        <form>
            <div className='inputDiv'>
                <label>Enter address</label>
                <input type='string'></input>
            </div>
            <div className='inputDiv'>
                <label>Enter amount</label>
                <input type='number' step="any"></input>
            </div>
            <button className='btn'>Send</button>
        </form>
    </div>
  )
}
