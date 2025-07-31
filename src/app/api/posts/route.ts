
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';

// postsディレクトリのパス
const postsDirectory = path.join(process.cwd(), 'src', 'data', 'posts');

export async function GET() {
  try {
    const filenames = await fs.readdir(postsDirectory);

    const posts = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.md'))
        .map(async filename => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContents);

          return {
            id: filename.replace(/\.md$/, ''),
            ...data,
          };
        })
    );

    // 日付の降順で記事をソート
    const sortedPosts = posts.sort((a, b) => {
      const dateA = a.date ? new Date(a.date as string).getTime() : 0;
      const dateB = b.date ? new Date(b.date as string).getTime() : 0;
      return dateB - dateA;
    });

    return NextResponse.json(sortedPosts);

  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return new NextResponse(JSON.stringify({ message: 'Failed to fetch posts' }), { status: 500 });
  }
}
