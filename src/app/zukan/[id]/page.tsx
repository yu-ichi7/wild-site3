
import { notFound } from 'next/navigation';
import Image from 'next/image';

async function getBird(id: string) {
  const res = await fetch(`http://localhost:1337/api/birds/${id}?populate=blocks.image_content`);
  if (!res.ok) {
    notFound();
  }
  const data = await res.json();
  if (!data.data) {
    notFound();
  }
  const bird = data.data;
  return {
    id: bird.id,
    name: bird.attributes.name,
    englishName: bird.attributes.englishName,
    scientificName: bird.attributes.scientificName,
    content: bird.attributes.blocks.map((block: any) => ({
      type: block.type,
      value: block.type === 'image' ? `http://localhost:1337${block.image_content.data.attributes.url}` : block.text_content,
    })),
  };
}

// This tells Next.js what pages to generate at build time
export async function generateStaticParams() {
  const res = await fetch('http://localhost:1337/api/birds');
  const data = await res.json();
  return data.data.map((item: any) => ({
    id: item.id.toString(),
  }));
}

const BirdDetailPage = async ({ params }: { params: { id: string } }) => {
  const bird = await getBird(params.id);

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
