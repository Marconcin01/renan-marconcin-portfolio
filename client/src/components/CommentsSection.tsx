import { useState } from 'react';
import { MessageCircle, Send, Trash2 } from 'lucide-react';
import { useComments, Comment } from '@/hooks/useComments';

interface CommentsSectionProps {
  postId: string;
  postTitle: string;
}

export default function CommentsSection({ postId, postTitle }: CommentsSectionProps) {
  const { comments, isLoading, addComment, removeComment, totalComments } = useComments(postId);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setIsSubmitting(true);
    
    // Simular delay de envio
    setTimeout(() => {
      addComment(formData.name, formData.email, formData.message);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 500);
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

  if (isLoading) {
    return <div className="py-8 text-center text-muted-foreground">Carregando comentários...</div>;
  }

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle size={24} className="text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          Comentários ({totalComments})
        </h2>
      </div>

      {/* Formulário de Comentário */}
      <div className="bg-card border border-border p-8 mb-8">
        <h3 className="text-lg font-bold text-foreground mb-6">Deixe seu comentário</h3>
        
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 mb-6">
            ✓ Comentário publicado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Seu nome"
                className="w-full px-4 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className="w-full px-4 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Compartilhe seus pensamentos sobre este artigo..."
              rows={5}
              className="w-full px-4 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send size={18} />
            {isSubmitting ? 'Publicando...' : 'Publicar Comentário'}
          </button>
        </form>
      </div>

      {/* Lista de Comentários */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card border border-border p-6 hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-foreground">{comment.name}</h4>
                  <p className="text-sm text-muted-foreground">{formatDate(comment.date)}</p>
                </div>
                <button
                  onClick={() => removeComment(comment.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  title="Remover comentário"
                  aria-label="Remover comentário"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-foreground whitespace-pre-wrap break-words">{comment.message}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
