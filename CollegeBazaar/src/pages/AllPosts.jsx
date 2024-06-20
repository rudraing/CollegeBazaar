import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

function AllPosts() {

    const product=useSelector((state)=>state.post.posts)
    const [posts, setPosts] = useState([])
    const data=useLoaderData()
    const [currUserId,setUserId]=useState('')
    const selector=useSelector((state)=>state.auth.userData)

    useEffect(() => {
        appwriteService.getPosts().then((posts)=>setPosts(posts.documents))
        setUserId(selector.$id)
    }, [])
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (

                     post.userId!==currUserId?                    
                     <div key={post.$id} className='p-2 w-1/4'>
                             <PostCard {...post} />
                     </div>
                     : <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} color="bg-red-300"  />
                        </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts