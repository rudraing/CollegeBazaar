import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import emailjs from '@emailjs/browser';
import ContactUs from "./ContactPage"



const BuyerInfoCard = () => {

    
    

    const [post, setPost] = useState(null);
    const { id } = useParams();
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            appwriteService.getPost(id)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    } else {
                        navigate('/');
                    }
                })
                .catch((error) => {
                    
                    navigate('/');
                });
        } else {
            navigate('/');
        }
    }, [id, navigate]);


    if (!post) {
        return <div className="text-center mt-10 text-gray-700">Loading post details...</div>;
    }


    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:max-w-xl my-10">
            <div className="md:flex">
                <div className="md:flex-shrink-0 w-full md:w-64">
                    {post.featuredImage ? (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="object-cover w-full h-48 md:h-auto rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                        />
                    ) : (
                        <div className="bg-gray-400 flex items-center justify-center h-48 md:h-auto rounded-t-lg md:rounded-t-none md:rounded-l-lg">
                            <span className="text-gray-700">No Image Available</span>
                        </div>
                    )}
                </div>
                <div className="p-6 md:p-8 w-full">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="inline-block bg-indigo-600 text-white text-xl px-3 py-1 rounded">OWNER'S INFORMATION</h1>
                          
                        </div>
                        {userData && post.userId === userData.$id && (
                            <span className="inline-block text-xs font-medium text-indigo-600">Your Post</span>
                        )}
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700 font-medium">Name:</span>
                            <p className="text-gray-700">{post.name}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700 font-medium">Email:</span>
                            <p className="text-gray-700">{post.gmail}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700 font-medium"> Product:</span>
                            <p className="text-gray-700">{post.title}</p>
                        </div>
                        {/* <ContactUs/> */}
                        
                    </div>
                </div>
            </div>
        </div>
        
    );
    
};

export default BuyerInfoCard;
