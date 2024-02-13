import { useEffect } from "react"
import { useParams } from "react-router-dom"
import PostCard from "../components/PostCard"
import { useAppDispatch, useAppSelector } from "../app/hook"
import { IPost } from "../types/type"
import { getPosts } from "../features/posts/postSlice"

const PostPreview = () => {
  const { id } = useParams();
  const post = useAppSelector(state => state?.posts?.posts?.find(post => post.id === id))
  return (
    <PostCard
      post={post!}
    />
  )
}

export default PostPreview
