import React from 'react'
import service from '../appwrite/config'
import {Link} from'react-router-dom'

function PostCard({$id,title,featuredImage,price ,color='bg-gray-100'}) {

  return (
    <div>
      <Link to={`/post/${$id}`}>
            <div className={`w-full ${color} rounded-xl p-4 `}>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title} />
                </div>
                <div >
                  <div >
                      <div className='text-red-800 text-xs'>Product's Name </div>
                      <div className='text-yellow-600 font-bold'> {title} </div>
                  </div>
                  <h2 className='text-xs font-bold'>
                    Price =
                      {price} -/
                  </h2>
                </div>
                
                
            </div>
      </Link>
    </div>
  )
}

export default PostCard
