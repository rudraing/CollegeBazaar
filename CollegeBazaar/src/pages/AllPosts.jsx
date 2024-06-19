import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

function AllPosts() {

    const product=useSelector((state)=>state.post.posts)
    const [posts, setPosts] = useState([])
    const data=useLoaderData()
    useEffect(() => {
        appwriteService.getPosts().then((posts)=>setPosts(posts.documents))
    }, [])
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts