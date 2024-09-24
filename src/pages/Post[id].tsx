import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { LoadingState } from "../ui/shared/LoadingState";
import { useGetPostQuery } from "../features/posts/postSlice";
import { CustomPageError } from "../ui/shared/CustomPageError";
import { NotFoundState } from "../ui/shared/NotFoundState";
import PostItem from "../ui/shared/PostItem";
import { Post } from "../types/type";
import { BackBtn } from "../ui/shared/BackBtn";

interface PostPreviewProps {
  post: Post;
}

const dummyRecommendations: Post[] = [
  {
    _id: "1",
    title: "The Rise of Quantum Computing",
    content:
      "Quantum computing is poised to revolutionize the tech industry. With its ability to solve complex problems in seconds that would take traditional computers years...",
    createdAt: "2024-09-15T10:00:00Z",
    author: {
      _id: "a1",
      username: "QuantumQueen",
      photo: "/api/placeholder/40/40",
    },
    tags: [
      { _id: "t1", text: "Quantum" },
      { _id: "t2", text: "Computing" },
    ],
    likes: ["user1", "user2", "user3"],
    comments: [{}, {}, {}],
  },
  {
    _id: "2",
    title: "Cybersecurity in the Age of AI",
    content:
      "As AI continues to advance, so do the threats to our digital security. This post explores cutting-edge cybersecurity measures designed to counteract AI-powered attacks...",
    createdAt: "2024-09-18T14:30:00Z",
    author: {
      _id: "a2",
      username: "CyberSentinel",
      photo: "/api/placeholder/40/40",
    },
    tags: [
      { _id: "t3", text: "Cybersecurity" },
      { _id: "t4", text: "AI" },
    ],
    likes: ["user4", "user5", "user6", "user7"],
    comments: [{}, {}],
  },
  {
    _id: "3",
    title: "The Ethics of Brain-Computer Interfaces",
    content:
      "Brain-computer interfaces promise to change how we interact with technology, but they also raise significant ethical questions. This post delves into the moral implications...",
    createdAt: "2024-09-20T09:15:00Z",
    author: {
      _id: "a3",
      username: "NeuroEthicist",
      photo: "/api/placeholder/40/40",
    },
    tags: [
      { _id: "t5", text: "Neurotech" },
      { _id: "t6", text: "Ethics" },
    ],
    likes: ["user8", "user9"],
    comments: [{}, {}, {}, {}],
  },
];

const PostPreview: React.FC<PostPreviewProps> = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: post, isLoading, error } = useGetPostQuery(postId as string);

  if (isLoading) return <LoadingState />;
  if (error) return <CustomPageError error={error} title="Error" />;
  if (!post)
    return (
      <NotFoundState
        title="Post Not Found"
        message="We couldn't find the post you are looking for with that postId"
      />
    );

  return (
    <>
      <div className="mb-8">
        <BackBtn text="Back to posts" to="/" />
      </div>
      <PostItem post={post} isPreview />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-electricCyan-300">
          Recommended Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyRecommendations.map((rec) => (
            <PostItem post={rec} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostPreview;
