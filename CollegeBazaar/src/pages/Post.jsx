import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector,useDispatch } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    console.log("Slug in edit" ,slug)
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const product=useSelector((state)=>state.post.posts)
    console.log(post?post.userId : null)
    console.log(userData?userData.$id:null)
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
                <div className="w-200  flex mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="ml-3 mr-20 rounded-xl w-200 h-80"
                    />

                    {isAuthor && (
                        <div className="flex absolute mleft-3 bottom-3">
                            <div className="p-4">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3  ">
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                            
                            <Button bgColor="bg-red-500 h-10 mt-4"  onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                    {
                        !isAuthor && (
                            <div className="flex absolute left-5 bottom-3">
                                                        
                            <Button bgColor="bg-green-500 h-10 mt-4"  >
                                <h3>Buy Product </h3>
                            </Button>
                        </div>
                        )
                    }
                
                    <div className="">
                        <div className="w-full mb-6">
                            <h1 className="text-2xl font-bold">Product : {post.title}</h1>
                        </div>
                        <div className="w-full mb-6">
                            <h1 className="text-2xl font-bold">Price (inr):   {post.price}-/</h1>
                        </div>
                        <div className="browser-css">
                            Description :
                            {parse(post.description)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}