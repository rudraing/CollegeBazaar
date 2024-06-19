import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    posts: []  // Start with an empty array instead of an array with a single object
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPost: (state, action) => {
            state.posts.push(action.payload);
            console.log(state.posts)
        },
        updatePost: (state, action) => {
            const { slug, title, description, price, featuredImage, status, userId } = action.payload;
            const post = state.posts.find(post => post.slug === slug);
            if (post) {
                post.title = title;
                post.description = description;
                post.price = price;
                post.featuredImage = featuredImage;
                post.status = status;
                post.userId = userId;
            }
        },
        deletePost: (state, action) => {
            const slug = action.payload.slug;  // Correctly extract slug from the payload
            state.posts = state.posts.filter(post => post.slug !== slug);
        }
    }
});

export const { createPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
