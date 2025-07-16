
import Link from 'next/link';
import Image from 'next/image';
import { birds } from '@/data/birds';

const ZukanPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">野鳥図鑑</h1>

      {/* TODO: Search and Filter UI */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-center">（ここに検索・絞り込み機能が入ります）</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {birds.map((bird) => (
          <Link key={bird.id} href={`/zukan/${bird.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative w-full h-48">
              <Image
                src={bird.content.find(b => b.type === 'image')?.value || '/images/placeholder.svg'}
                alt={bird.name}
                layout="fill"
                objectFit="cover"
                className="bg-gray-200"
              />
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-bold text-green-800">{bird.name}</h2>
              <p className="text-gray-600 mt-2">{bird.scientificName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ZukanPage;
