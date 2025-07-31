'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';

interface Props {
  postId: string;
}

export default function InteractionButtons({ postId }: Props) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const postRef = doc(db, 'posts', postId);

    const fetchLikes = async () => {
      try {
        const docSnap = await getDoc(postRef);
        if (docSnap.exists()) {
          setLikes(docSnap.data().likes || 0);
        } else {
          // ドキュメントがなければ初期値0で作成
          await setDoc(postRef, { likes: 0 });
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();

    // ローカルストレージで「いいね」の状態を管理
    if (localStorage.getItem(`liked-${postId}`)) {
      setIsLiked(true);
    }

  }, [postId]);

  const handleLike = async () => {
    if (isLiked) return; // すでに「いいね」していたら何もしない

    const postRef = doc(db, 'posts', postId);
    try {
      await setDoc(postRef, { likes: increment(1) }, { merge: true });
      setLikes(prevLikes => prevLikes + 1);
      setIsLiked(true);
      localStorage.setItem(`liked-${postId}`, 'true');
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        disabled={isLiked || isLoading}
        className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 
          ${isLiked 
            ? 'bg-pink-500 text-white cursor-not-allowed' 
            : 'bg-gray-200 hover:bg-pink-200'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
        </svg>
        <span>{isLiked ? 'ありがとう！' : 'いいね！'}</span>
      </button>
      <div className="text-lg text-gray-700">
        {isLoading ? '...' : `${likes} 件のいいね`}
      </div>
    </div>
  );
}