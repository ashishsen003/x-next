'use client'
import React from 'react'
import {useRecoilState} from 'recoil'
import {modalState, postIdState} from '../atom/modalAtom'
import Modal from 'react-modal'
import {HiX} from 'react-icons/hi'
const  {useSession} = require('next-auth/react')

const CommentModal = () => {
    const [open, setopen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)
    const {data: session} = useSession()

  return (
    <div>
        {open && (
          <Modal 
          isOpen={open}
          onRequestClose={()=>setopen(false)}
          ariaHideApp={false}
          className={'max-w-lg w-90% absolute top-24 left-[-50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md  '}
          >
            
          </Modal>
        )}
    </div>
  )
}

export default CommentModal