import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [currUserId, setUserId] = useState('');
    const selector = useSelector((state) => state.auth.userData);
    const [listed, setListed] = useState(false);
    const featuredImage="6673c7e6002b2921abb3"

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

    if (posts.length === 0 || !listed) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">
                            Welcome to College Bazaar
                        </h1>
                        <p className="text-lg text-gray-600 mb-4">
                            No current posts available.
                        </p>
                        <p className="text-sm text-gray-500 mb-8">
                            Start exploring and find something interesting!
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        post.userId === currUserId ? (
                            <div key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        ) : null
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
