'use client'
import React from 'react'

const Comment = ({comment, id}) => {
    console.log(comment);
  return (
    <div>{comment.comment}</div>
  )
}

export default Comment