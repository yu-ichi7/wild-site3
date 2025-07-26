'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// 鳥のデータ型を定義
interface Bird {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
}

export default function BirdDetailPage({ params }: { params: { id: string } }) {
  const [bird, setBird] = useState<Bird | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    const fetchBirdDetails = async () => {
      try {
        const res = await fetch('/api/birds');
        const birds: Bird[] = await res.json();
        const foundBird = birds.find(b => b.id === params.id);
        
        if (foundBird) {
          setBird(foundBird);
        } else {
          // notFound() はClient Componentでは直接使えないため、ローディング状態で制御
        }
      } catch (error) {
        console.error("Failed to fetch bird data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBirdDetails();
  }, [params.id]);

  if (isLoading) {
    return <div className="text-center py-16">読み込み中...</div>;
  }

  if (!bird) {
    // データが見つからなかった場合にnot-foundページを表示する（Next.js 13+ App Routerの標準的な方法）
    notFound();
    return null; 
  }

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bird Details */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">{bird.name}</h1>
        <p className="text-lg text-gray-600 italic mb-4">{bird.scientificName}</p>
        <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
          <Image 
            src={bird.mainImage} 
            alt={bird.name} 
            layout="fill" 
            objectFit="cover" 
            className="bg-gray-200"
          />
        </div>
        <p className="text-gray-800 leading-relaxed">{bird.description}</p>
      </div>

      {/* Image Gallery */}
      <div>
        <h2 class="text-3xl font-bold mb-4">ギャラリー</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bird.galleryImages.map((image, index) => (
            <div key={index} className="relative w-full h-40 cursor-pointer rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300" onClick={() => openModal(image)}>
              <Image 
                src={image} 
                alt={`${bird.name} gallery image ${index + 1}`} 
                layout="fill" 
                objectFit="cover" 
                className="bg-gray-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={selectedImage} 
              alt="Enlarged view" 
              width={1200} 
              height={800} 
              objectFit="contain" 
              className="rounded-lg"
            />
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-white text-3xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}