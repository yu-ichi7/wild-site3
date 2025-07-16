
import { birds } from '@/data/birds';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateStaticParams() {
  return birds.map((bird) => ({
    id: bird.id.toString(),
  }));
}

const BirdDetailPage = ({ params }: { params: { id: string } }) => {
  const bird = birds.find((b) => b.id.toString() === params.id);

  if (!bird) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Bird Name and Scientific Name */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold">{bird.name}</h1>
        <p className="text-xl text-gray-500 mt-2">{bird.englishName}</p>
        <p className="text-lg text-gray-400 italic mt-1">{bird.scientificName}</p>
      </div>

      {/* Content Blocks */}
      <div className="space-y-8">
        {bird.content.map((block, index) => {
          if (block.type === 'image') {
            return (
              <div key={index} className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={block.value}
                  alt={`${bird.name} ${index}`}
                  layout="fill"
                  objectFit="cover"
                  className="bg-gray-200"
                />
              </div>
            );
          }
          if (block.type === 'text') {
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg leading-relaxed">{block.value}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default BirdDetailPage;
