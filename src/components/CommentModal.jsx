'use client'
import React from 'react'
import {useRecoilState} from 'recoil'
import {modalState, postIdState} from '../atom/modalAtom'

const CommentModal = () => {
    const [open, setopen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)

  return (
    <div>
        <h1>Comment Modal</h1>
        {open && <h1>{postId}</h1>}
    </div>
  )
}

export default CommentModal