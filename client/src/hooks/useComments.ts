import { useState, useEffect } from 'react';

export interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  postId: string;
}

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar comentários do localStorage
  useEffect(() => {
    const storageKey = `comments_${postId}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setComments(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      }
    }
    setIsLoading(false);
  }, [postId]);

  // Adicionar novo comentário
  const addComment = (name: string, email: string, message: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      name,
      email,
      message,
      date: new Date().toISOString(),
      postId,
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);

    // Salvar no localStorage
    const storageKey = `comments_${postId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));

    return newComment;
  };

  // Remover comentário (apenas para moderação)
  const removeComment = (commentId: string) => {
    const updatedComments = comments.filter(c => c.id !== commentId);
    setComments(updatedComments);

    const storageKey = `comments_${postId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
  };

  return {
    comments,
    isLoading,
    addComment,
    removeComment,
    totalComments: comments.length,
  };
}
