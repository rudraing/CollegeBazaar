import React from 'react'
import service from '../appwrite/config'
import {Link} from'react-router-dom'

function PostCard({$id,title,featuredImage,price}) {

  return (
    <div>
      <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title} />
                </div>
                <div className='text-xl font-bold'>
                    <h6>Product's Name </h6>
                    {title}
                </div>
                <h2 className='text-xl font-bold'>
                   Price =
                    {price} -/
                </h2>
                
            </div>
      </Link>
    </div>
  )
}

export default PostCard
