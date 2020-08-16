import React from 'react'

export default function Message(props) {
  const message = props.message

  return (
    <div className='singleMessage'>
      <div className='messageImage'>
        <img className='messageImage'
          src={message.author.image}
          alt="image"
        />
      </div>
      <div className='messageAuthor'>
        <h4>{message.author.name}</h4>
      </div>
      <div className='messageContent'>
        {message.content}
      </div>
    </div>
  )
}
