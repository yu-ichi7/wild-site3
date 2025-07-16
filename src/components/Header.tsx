
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-800">
          Wild Bird Site
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/zukan" className="text-gray-700 hover:text-green-600">図鑑</Link></li>
            <li><Link href="/blog" className="text-gray-700 hover:text-green-600">ブログ</Link></li>
            <li><Link href="/column" className="text-gray-700 hover:text-green-600">コラム</Link></li>
            <li><Link href="/gallery" className="text-gray-700 hover:text-green-600">ギャラリー</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
