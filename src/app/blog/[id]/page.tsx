
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import InteractionButtons from '@/components/InteractionButtons';
import Comments from '@/components/Comments';

// 型定義
interface PostData {
  id: string;
  title: string;
  author: string;
  date: string;
  coverImage: string;
  contentHtml: string;
}

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.id}`);
        if (!res.ok) {
          throw new Error('Post not found');
        }
        const data: PostData = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (isLoading) {
    return <div className="text-center py-16">読み込み中...</div>;
  }

  if (!post) {
    notFound();
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 text-sm">
            <span>{new Date(post.date).toLocaleDateString()} by {post.author}</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            layout="fill"
            objectFit="cover"
            className="bg-gray-200"
          />
        </div>

        {/* Post Content */}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        {/* --- Interactive Components --- */}
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">リアクションを送る</h2>
          <InteractionButtons postId={post.id} />
          <Comments postId={post.id} />
        </div>
      </article>
    </div>
  );
}
