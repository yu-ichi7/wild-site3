'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 鳥のデータ型を定義
interface Bird {
  id: string;
  name: string;
  category: string;
  mainImage: string;
}

export default function ZukanPage() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [filteredBirds, setFilteredBirds] = useState<Bird[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  // 初期データのフェッチとカテゴリーのセットアップ
  useEffect(() => {
    const fetchBirds = async () => {
      const res = await fetch('/api/birds');
      const data: Bird[] = await res.json();
      setBirds(data);
      setFilteredBirds(data);

      // カテゴリーのリストを動的に生成
      const uniqueCategories = ['all', ...Array.from(new Set(data.map(bird => bird.category)))];
      setCategories(uniqueCategories);
    };
    fetchBirds();
  }, []);

  // 検索とフィルタリングのロジック
  useEffect(() => {
    let result = birds;

    // 名前による検索
    if (searchTerm) {
      result = result.filter(bird =>
        bird.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // カテゴリーによる絞り込み
    if (selectedCategory !== 'all') {
      result = result.filter(bird => bird.category === selectedCategory);
    }

    setFilteredBirds(result);
  }, [searchTerm, selectedCategory, birds]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">野鳥図鑑</h1>

      {/* 検索とフィルター */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="名前で検索..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'すべてのカテゴリー' : category}
            </option>
          ))}
        </select>
      </div>

      {/* 野鳥カード一覧 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBirds.map(bird => (
          <Link href={`/zukan/${bird.id}`} key={bird.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-48">
                 <Image
                  src={bird.mainImage}
                  alt={bird.name}
                  layout="fill"
                  objectFit="cover"
                  className="bg-gray-200" // 画像がない場合のプレースホルダー色
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{bird.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 結果がない場合 */}
      {filteredBirds.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">該当する野鳥が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}