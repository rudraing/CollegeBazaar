import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [currUserId, setUserId] = useState('');
    const selector = useSelector((state) => state.auth.userData);
    const [listed, setListed] = useState(false);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });

        // Set current user ID
        if (selector && selector.$id) {
            setUserId(selector.$id);
        }
    }, [selector]); // Only re-run the effect if selector changes

    // Set listed to true if any post belongs to the current user
    useEffect(() => {
        if (posts.some(post => post.userId === currUserId)) {
            setListed(true);
        }
    }, [posts, currUserId]);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Welcome to the COLLEGE BAZAAR
                                <p className='text-xs'> No current posts  </p>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        post.userId === currUserId ?                    
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                        : null
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
