import React from 'react'

const FriendCard = (props) => {
  return (
    <>
      <div className="col col-md-4 col-lg-4 col-sm-4 col-xs-12" key={props.id}>
        <div className={"card card-light mt-4"} key={props.id}>
          <img src={props.image} alt="data" className='card-img-top' height="235px" />
          <h1 className='text-center'>@{props.userName}</h1>
          <button className="btn btn-danger w-50 mx-auto" onClick={(e) => props.setSelected(props.id)} id="addFriend">{props.btnName}</button>
        </div>
      </div>
    </>
  )
}

export default FriendCard