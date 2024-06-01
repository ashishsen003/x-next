import {collection, getDocs, getFirestore, orderby, query} from 'firebase/firestore'
import {app} from '../firebase'
import React from 'react'

const Feed = async () => {
    const db = getFirestore(app)
    const q = query(collection(db,'posts'), orderby('timestamps', 'desc'))
    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach((doc)=>{
        data.push({id: doc.id, })
    })
  return (
    <div>Feed</div>
  )
}

export default Feed