
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import allBirds from '@/data/birds.json';

// 型定義
interface Bird {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Markdownファイルのパスを構築
  const mdFilePath = path.join(process.cwd(), 'src', 'data', 'birds_md', `${id}.md`);

  try {
    // Markdownファイルが存在するか試す
    const fileContents = await fs.readFile(mdFilePath, 'utf8');

    // gray-matterでメタデータとコンテンツをパース
    const matterResult = matter(fileContents);

    // remarkでMarkdownをHTMLに変換
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    // ブログ記事形式でデータを返す
    return NextResponse.json({
      type: 'markdown',
      id,
      contentHtml,
      ...matterResult.data, // title, author, dateなど
    });

  } catch (e) {
    // Markdownファイルがなければ、JSONから探す
    const bird = allBirds.find((b: Bird) => b.id === id);

    if (bird) {
      // 標準のJSON形式でデータを返す
      return NextResponse.json({ type: 'json', ...bird });
    } else {
      // それでも見つからなければ404エラー
      return new NextResponse(JSON.stringify({ message: 'Not Found' }), { status: 404 });
    }
  }
}
