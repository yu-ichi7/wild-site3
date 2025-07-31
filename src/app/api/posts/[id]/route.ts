
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src', 'data', 'posts');

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const filePath = path.join(postsDirectory, `${id}.md`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return NextResponse.json({
      id,
      contentHtml,
      ...matterResult.data,
    });

  } catch (error) {
    console.error(`Failed to fetch post ${id}:`, error);
    return new NextResponse(JSON.stringify({ message: 'Post not found' }), { status: 404 });
  }
}
