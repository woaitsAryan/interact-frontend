import PostComponent from '@/components/home/post';
import { Post } from '@/types';
import React from 'react';

interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {
  return (
    <div className="w-[50vw] mx-auto max-md:w-screen flex flex-col gap-2">
      {posts.length === 0 ? (
        <>No Posts</>
      ) : (
        <>
          {posts.map(post => {
            return <PostComponent key={post.id} post={post} />;
          })}
        </>
      )}
    </div>
  );
};

export default Posts;
