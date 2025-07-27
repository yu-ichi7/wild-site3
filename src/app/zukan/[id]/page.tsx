
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// 型定義
interface BirdJsonData {
  type: 'json';
  id: string;
  name: string;
  scientificName: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
}

interface BirdMarkdownData {
  type: 'markdown';
  id: string;
  title: string;
  author: string;
  date: string;
  contentHtml: string;
}

type BirdData = BirdJsonData | BirdMarkdownData;

// --- Components ---

// ブログ記事形式のコンポーネント
function BlogArticle({ data }: { data: BirdMarkdownData }) {
  return (
    <article className="prose lg:prose-xl mx-auto py-8">
      <h1>{data.title}</h1>
      <div className="text-gray-600 text-sm mb-8">
        <span>{data.author}</span> | <span>{new Date(data.date).toLocaleDateString()}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </article>
  );
}

// 標準の図鑑形式のコンポーネント
function StandardEntry({ data }: { data: BirdJsonData }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
        <p className="text-lg text-gray-600 italic mb-4">{data.scientificName}</p>
        <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
          <Image src={data.mainImage} alt={data.name} layout="fill" objectFit="cover" className="bg-gray-200" />
        </div>
        <p className="text-gray-800 leading-relaxed">{data.description}</p>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-4">ギャラリー</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.galleryImages.map((image, index) => (
            <div key={index} className="relative w-full h-40 cursor-pointer rounded-lg overflow-hidden transform hover:scale-105 transition-transform" onClick={() => openModal(image)}>
              <Image src={image} alt={`${data.name} gallery image ${index + 1}`} layout="fill" objectFit="cover" className="bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <Image src={selectedImage} alt="Enlarged view" width={1200} height={800} objectFit="contain" className="rounded-lg" />
            <button onClick={closeModal} className="absolute top-4 right-4 text-white text-3xl font-bold">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Page Component ---

export default function BirdDetailPage({ params }: { params: { id: string } }) {
  const [birdData, setBirdData] = useState<BirdData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    const fetchBirdDetails = async () => {
      try {
        const res = await fetch(`/api/birds/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data: BirdData = await res.json();
        setBirdData(data);
      } catch (error) {
        setBirdData(null); // データ取得失敗
      } finally {
        setIsLoading(false);
      }
    };

    fetchBirdDetails();
  }, [params.id]);

  if (isLoading) {
    return <div className="text-center py-16">読み込み中...</div>;
  }

  if (!birdData) {
    notFound();
    return null;
  }

  // データタイプに応じて表示するコンポーネントを切り替える
  switch (birdData.type) {
    case 'markdown':
      return <BlogArticle data={birdData} />;
    case 'json':
      return <StandardEntry data={birdData} />;
    default:
      notFound();
      return null;
  }
}
