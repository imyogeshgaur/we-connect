import React from 'react'
import loader from "../../images/loader.gif"

const Loader = () => {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        marginTop:"13rem"
      }}>
        <img src={loader} alt="load" />
      </div>
  )
}

export default Loader