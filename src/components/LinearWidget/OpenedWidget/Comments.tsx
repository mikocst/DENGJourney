import React from 'react'

const Comments = () => {
  return (
    <div className = "pb-2 relative">
        <textarea className = "resize-none w-full p-2 bg-gray-100/60 rounded-sm border border-gray-200 mt-2"
        placeholder='Leave a comment...'
        autoCorrect='true'
        >
        </textarea>
    </div>
  )
}

export default Comments