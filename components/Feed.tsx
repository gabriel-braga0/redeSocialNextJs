import React from "react";
import Card from "./Card";
import type { PostData } from "../types";
import CardSkeleton from "./CardSkeleton";

type FeedProps = {
  posts: PostData[];
};

export default function Feed({ posts }: FeedProps) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Nenhum post para mostrar ainda.
      </p>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.id}
          id={post.id}
          conteudo={post.conteudo}
          userName={post.userName}
          userHandle={post.userHandle}
          avatarInitials={post.avatarInitials}
          initialLikes={post.initialLikes}
          initialIsLikedByCurrentUser={post.initialIsLikedByCurrentUser}
          comments={post.commentsCount}
        />
      ))}
    </>
  );
}
