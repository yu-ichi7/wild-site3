
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ブログ記事の型定義
interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  coverImage: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-16">読み込み中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">ブログ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
              <div className="relative w-full h-56">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="bg-gray-200"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  {new Date(post.date).toLocaleDateString()} by {post.author}
                </p>
                <p className="text-gray-700 flex-grow">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">まだ投稿がありません。</p>
        </div>
      )}
    </div>
  );
}
