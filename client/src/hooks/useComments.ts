import { useState, useEffect } from 'react';

export interface Reply {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  isAuthor?: boolean;
}

export interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  postId: string;
  replies?: Reply[];
}

export function useComments(postId: string, authorEmail?: string) {
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
      replies: [],
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);

    // Salvar no localStorage
    const storageKey = `comments_${postId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));

    return newComment;
  };

  // Adicionar resposta a um comentário
  const addReply = (commentId: string, name: string, email: string, message: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const newReply: Reply = {
          id: Date.now().toString(),
          name,
          email,
          message,
          date: new Date().toISOString(),
          isAuthor: email === authorEmail,
        };

        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);

    // Salvar no localStorage
    const storageKey = `comments_${postId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
  };

  // Remover comentário
  const removeComment = (commentId: string) => {
    const updatedComments = comments.filter(c => c.id !== commentId);
    setComments(updatedComments);

    const storageKey = `comments_${postId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
  };

  // Remover resposta
  const removeReply = (commentId: string, replyId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: (comment.replies || []).filter(r => r.id !== replyId),
        };
      }
      return comment;
    });

    setComments(updatedComments);

    const storageKey = `comments_${postId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
  };

  return {
    comments,
    isLoading,
    addComment,
    addReply,
    removeComment,
    removeReply,
    totalComments: comments.length,
  };
}
