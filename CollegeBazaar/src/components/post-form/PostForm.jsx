import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { createPost, deletePost, updatePost } from "../../store/postSlice";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            name:post?.name ||"",
            gmail:post?.gmail||"",
            title: post?.title || "",
            slug: post?.$id || "",
            description: post?.description || "",
            price:post?.price || 0,
            status: post?.status || "active",
        },
    });



    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const postCard=useSelector((state)=>state.post.posts)
    const dispatch=useDispatch()

    
    const submit = async (data) => {
      
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
           
            appwriteService.deleteFile(post.featuredImage);

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            if(dbPost) dispatch(updatePost({ ...data,image:null, featuredImage: file ? file.$id : undefined,slug:dbPost.$id}));

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 
        
        else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    dispatch(createPost({ ...data, userId: userData.$id ,slug:dbPost.$id}))
                    
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                 <Input
                    value={userData?.name}
                    label="name :"
                    placeholder="name"
                    className="mb-4"
                    {...register("name", { required: true })}
                    readOnly
                />
                 <Input
                    value={userData?.email}
                    label="gmail :"
                    placeholder="gmail"
                    className="mb-4"
                    {...register("gmail", { required: true })}
                    readOnly
                />
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Input
                    label="Price :"
                    placeholder="Price"
                    className="mb-4"
                    {...register("price", { required: true })}
                />
                <RTE label="Description :" name="description" control={control} defaultValue={getValues("description")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}