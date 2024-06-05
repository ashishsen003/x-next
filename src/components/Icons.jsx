'use client'
import {HiOutlineChat, HiOutlineHeart, HiOutlineTrash, HiHeart} from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { collection, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { app } from '../firebase'

const Icons = ({id}) => {
  const {data: session} = useSession()
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState([])
  const db = getFirestore(app)

  const likePost = async ()=>{
    if(session){
       await setDoc(doc(db, 'posts', id, 'likes', session.user.uid),{
        username: session.user.username,
        timestamp: serverTimestamp()
       })
    } else {
      signIn()
    }
  }

  useEffect(()=>{
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot)=>{
      setLikes(snapshot.docs)
    })
  }, [db])

  useEffect(()=>{
    setIsLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
  },[likes])

  return (
    <div className='flex justify-start gap-5 p-2 text-gray-500'>
        <HiOutlineChat className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
        {
          isLiked ? (
            <HiHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100' />
          ) : (
            <HiOutlineHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
            
          )
        }
        <HiOutlineTrash className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
    </div>
  )
}

export default Icons