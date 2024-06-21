import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage, price, color = 'bg-white' }) {
  return (
    <div className="max-w-sm w-full">
      <Link to={`/post/${$id}`}>
        <div className={`w-full ${color} rounded-xl p-4 flex flex-col`}>
          <div className="w-full h-40 flex justify-center items-center mb-4 overflow-hidden">
            <img className="object-contain h-full w-full" src={service.getFilePreview(featuredImage)} alt={title} />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="text-red-800 text-xs">Product's Name</div>
              <div className="text-yellow-600 font-bold">{title}</div>
            </div>
            <h2 className="text-xs font-bold">
              Price = {price} -/
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
