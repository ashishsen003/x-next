'use client'
import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil'
import {modalState, postIdState} from '../atom/modalAtom'
import Modal from 'react-modal'
import {HiX} from 'react-icons/hi'
const  {useSession} = require('next-auth/react')
import {app} from '../firebase'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'

const CommentModal = () => {
    const [open, setOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)
    const [post, setPost] = useState({})
    const {data: session} = useSession()
    const db =  getFirestore(app)

    useEffect(()=>{
      if(postId !== ''){
        const postRef = doc(db, 'posts', postId)
        const unsubscribe = onSnapshot(
          postRef, 
          (snapshot)=>{
            if(snapshot.exists()){
              setPost(snapshot.data())
            } else {
              console.log('no such document');
            }
        })
        return ()=>unsubscribe()
      }
    },[postId])

  return (
    <div>
        {open && (
          <Modal 
          isOpen={open}
          onRequestClose={()=>setOpen(false)}
          ariaHideApp={false}
          className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md'
          >
            <div className='p-4'>
              <div className='border-b border-gray-200 py-2 px-1.5'>
                <HiX className='text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer' onClick={()=>setOpen(false)} />
                  Hello ashish
              </div>
              <div className='p-2 flex items-center space-x-1 relative'>
                <span className='w-0.5 h-full z-[-1] absolsute left-8 top-11 bg-gray-300' />
                <img src={post?.profileImg} alt="" />
              </div>
            </div>
          </Modal>
        )}
    </div>
  )
}

export default CommentModal