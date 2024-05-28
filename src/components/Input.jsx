'use client'

import { app } from '../firebase'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { HiOutlinePhotograph } from 'react-icons/hi'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'

const Input = () => {
    const {data: session} = useSession()
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [imageFileUploading, setImageFileUploading] = useState(false)
    const imagePickRef = useRef(null)   
    const addImageToPost = (e)=>{
        const file = e.target.files[0]
        if(file){
            setSelectedFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(()=>{
        if(selectedFile){
            uploadImageToStorage()
        }
    }, [selectedFile])

    const uploadImageToStorage = ()=>{
        setImageFileUploading(true)
        const storage = getStorage(app)
        const fileName = new Date().getTime()+'-'+selectedFile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, selectedFile)
        console.log(uploadTask);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
                console.log('upload is ', progress + '% done');
            },
            (error)=>{
                console.log(error);
                setImageFileUploading(false)
                setImageFileUrl(null)
                setSelectedFile(null)
            },
            ()=>{
                getDownloadURL(upload.snapshot.ref).then((downloadURL)=>{
                    setImageFileUrl(downloadURL)
                    setImageFileUploading(false)
                })
            }
        )
    }

    if(!session) return null

  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 w-full '>
        <img src={session.user.image} alt="user-img" className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95' />
        <div className='w-full divide-y divide-gray-200'>
            <textarea className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700' placeholder='Whats happening' row='2'></textarea>
            {
                selectedFile && <img src={imageFileUrl} alt="image" className='w-full max-h-[250px] object-cover cursor-poniter' />
            }
            <div className='flex items-center justify-between pt-2.5'>
                <HiOutlinePhotograph className='w-10 h-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer' onClick={()=>imagePickRef.current.click()}/>
                <input type="file" ref={imagePickRef} accept='image/*' onChange={addImageToPost} className='hidden'/>
                <button className='bg-blue-400 text-white px-5 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'>Post</button>
            </div>
        </div>
    </div>
  )
}

export default Input