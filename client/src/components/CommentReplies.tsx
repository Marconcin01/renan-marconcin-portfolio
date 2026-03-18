import { useState } from 'react';
import { Reply, MessageCircle, Send, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface CommentRepliesProps {
  commentId: string;
  replies: Array<{
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
    isAuthor?: boolean;
  }>;
  onAddReply: (commentId: string, name: string, email: string, message: string) => void;
  onRemoveReply: (commentId: string, replyId: string) => void;
  authorEmail?: string;
}

export default function CommentReplies({
  commentId,
  replies,
  onAddReply,
  onRemoveReply,
  authorEmail,
}: CommentRepliesProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onAddReply(commentId, formData.name, formData.email, formData.message);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setShowReplyForm(false);
    }, 300);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-4 pl-4 md:pl-8 border-l-2 border-primary">
      {/* Botão para mostrar/ocultar respostas */}
      {replies.length > 0 && (
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="inline-flex items-center gap-2 text-primary font-semibold mb-4 hover:opacity-80 transition-opacity"
        >
          {showReplies ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          {replies.length} {replies.length === 1 ? 'resposta' : 'respostas'}
        </button>
      )}

      {/* Lista de respostas */}
      {showReplies && (
        <div className="space-y-4 mb-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className={`bg-background border ${
                reply.isAuthor ? 'border-primary bg-primary/5' : 'border-border'
              } p-4`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-foreground">{reply.name}</h5>
                  {reply.isAuthor && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 font-bold">
                      Autor
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onRemoveReply(commentId, reply.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  title="Remover resposta"
                  aria-label="Remover resposta"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{formatDate(reply.date)}</p>
              <p className="text-foreground text-sm whitespace-pre-wrap break-words">{reply.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Botão para mostrar formulário de resposta */}
      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="inline-flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity mb-4"
      >
        <MessageCircle size={16} />
        {showReplyForm ? 'Cancelar' : 'Responder'}
      </button>

      {/* Formulário de resposta */}
      {showReplyForm && (
        <form onSubmit={handleSubmitReply} className="bg-card border border-border p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome"
              className="px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              className="px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Sua resposta..."
            rows={3}
            className="w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary resize-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send size={16} />
            {isSubmitting ? 'Publicando...' : 'Publicar Resposta'}
          </button>
        </form>
      )}
    </div>
  );
}
