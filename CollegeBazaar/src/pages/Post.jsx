import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });        
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className=" border-4 border-orange-100 max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-80 object-cover rounded-t-xl"
                    />

                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
                            {isAuthor && (
                                <div className="flex">
                                    <Link to={`/edit-post/${post.$id}`} state={{ post: post }}>
                                        <Button bgColor="bg-green-500" className="mr-3">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button bgColor="bg-red-500" onClick={deletePost}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-yellow-600">Price (INR): {post.price}-/</h2>
                        </div>

                        <div className="mb-4 text-gray-700">
                            Description: {parse(post.description)}
                        </div>

                        {!isAuthor && (
                            <div>
                                <Link to={`/BuyNow/${post.$id}`}>
                                    <Button bgColor="bg-green-500">
                                        <h3 className="text-lg font-semibold">Buy Now</h3>
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
