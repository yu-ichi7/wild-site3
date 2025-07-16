import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="w-full h-96 bg-gray-300 flex items-center justify-center mb-12">
        <h1 className="text-5xl font-bold text-white">ようこそ！野鳥の世界へ</h1>
      </div>

      {/* Introduction Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">このサイトについて</h2>
        <p className="text-lg max-w-3xl mx-auto">
          このサイトは、野鳥の魅力を多くの人に伝えるためのウェブサイトです。
          図鑑やブログ、ギャラリーを通じて、バードウォッチングの楽しさや奥深さを発見してください。
        </p>
      </div>

      {/* Category Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Link href="/zukan" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold mb-2 text-green-800">図鑑</h3>
          <p className="text-gray-600">様々な野鳥の情報を調べることができます。</p>
        </Link>
        <Link href="/blog" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold mb-2 text-green-800">ブログ</h3>
          <p className="text-gray-600">日々の観察記録やイベント情報をお届けします。</p>
        </Link>
        <Link href="/column" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold mb-2 text-green-800">コラム</h3>
          <p className="text-gray-600">野鳥に関する深い知識や読み物を掲載します。</p>
        </Link>
        <Link href="/gallery" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold mb-2 text-green-800">ギャラリー</h3>
          <p className="text-gray-600">美しい野鳥たちの写真をお楽しみください。</p>
        </Link>
      </div>
    </div>
  );
}
