import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState={
    posts:[{
        title:null,
        description:null,
        price:null,
        slug:null,
        featuredImage:null,
        userId:null
    }]
}
const postSlice=createSlice({
    name:"post",
    initialState,
    reducers:{
        createPost:(state,action)=>{
            state.posts.push(action.payload)
        },
        updatePost:(state,action)=>{
            state.posts.forEach((post)=>{
                if (post.slug === action.payload.slug) {
                    post.title = action.payload.title;
                    post.description = action.payload.description;
                    post.price=action.payload.price;
                    post.featuredImage = action.payload.featuredImage;
                    post.status = action.payload.status;
                    post.userId = action.payload.userId;
                }
            })
        },
        deletePost:(state,action)=>{
            state.posts=state.posts.filter((post)=>post.slug!==action.payload)
        }
    }
})

export const{createPost,updatePost,deletePost}=postSlice.actions
export default postSlice.reducer