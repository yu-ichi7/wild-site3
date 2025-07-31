
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';

interface Comment {
  id?: string;
  name: string;
  text: string;
  createdAt: Timestamp;
}

interface Props {
  postId: string;
}

export default function Comments({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // コメントのリアルタイム取得
  useEffect(() => {
    if (!postId) return;

    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData: Comment[] = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(commentsData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  // コメントの投稿処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    setIsSubmitting(true);
    try {
      const commentsRef = collection(db, 'posts', postId, 'comments');
      await addDoc(commentsRef, {
        name: newName,
        text: newText,
        createdAt: Timestamp.now(),
      });
      setNewName('');
      setNewText('');
    } catch (error) {
      console.error("Error adding comment: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">コメント ({comments.length})</h3>

      {/* コメント投稿フォーム */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg bg-gray-50">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">お名前</label>
          <input
            id="name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="ニックネーム"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">コメント</label>
          <textarea
            id="comment"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="コメントを入力してください..."
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? '送信中...' : 'コメントを送信'}
        </button>
      </form>

      {/* コメント一覧 */}
      <div className="space-y-4">
        {isLoading ? (
          <p>コメントを読み込んでいます...</p>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="p-4 border rounded-lg bg-white">
              <p className="font-bold">{comment.name}</p>
              <p className="text-xs text-gray-500 mb-2">
                {comment.createdAt.toDate().toLocaleString()}
              </p>
              <p className="text-gray-800 whitespace-pre-wrap">{comment.text}</p>
            </div>
          ))
        ) : (
          <p>まだコメントはありません。</p>
        )}
      </div>
    </div>
  );
}
