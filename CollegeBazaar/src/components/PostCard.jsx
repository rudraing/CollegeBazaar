import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage, price, color = 'bg-white' }) {
  return (
    <div className="max-w-sm w-full">
      <Link to={`/post/${$id}`}>
        <div className={`w-full ${color} rounded-xl p-4 flex flex-col h-full border-4 border-orange-200`}>
          <div className="w-full h-40 overflow-hidden">
            <img className="object-cover w-full h-full rounded-xl  border-4 border-orange-100" src={service.getFilePreview(featuredImage)} alt={title} />
          </div>
          <div className="flex flex-col justify-between flex-1 p-4 ">
            <div>
              <div className="text-gray-800 font-bold text-lg mb-2">{title}</div>
              <div className="text-yellow-600 text-xs font-bold">Price: {price}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
