import { useRoute } from 'wouter';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { blogPosts } from '@/data/blogPosts';
import ShareButtons from '@/components/ShareButtons';
import CommentsSection from '@/components/CommentsSection';

export default function BlogPost() {
  // 1. Correção: Avisamos o TypeScript que o params tem um 'id' do tipo string
  const [match, params] = useRoute<{ id: string }>('/blog/:id');

  if (!match) return null;

  // 2. Correção: Forçamos o post a ser do tipo 'any' para evitar o erro 'never'
  const post: any = blogPosts.find((p: any) => p.id === params?.id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post não encontrado</h1>
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
              <ArrowLeft size={20} />
              Voltar ao Blog
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const relatedPosts = blogPosts
    .filter((p: any) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.id}` : '';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:gap-3 transition-all">
              <ArrowLeft size={20} />
              Voltar ao Blog
            </a>
          </Link>

          <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-sm font-bold mb-4">
            {post.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              {post.readTime} min de leitura
            </div>
            <div className="text-sm">
              Por <span className="font-bold text-foreground">{post.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-invert max-w-none">
          <div className="bg-white text-foreground p-8 rounded-none">
            {/* Render markdown content */}
            <div className="space-y-6 leading-relaxed">
              {post.content.split('\n\n').map((paragraph: string, idx: number) => {
                if (paragraph.startsWith('#')) {
                  const level = paragraph.match(/^#+/)?.[0].length || 1;
                  const text = paragraph.replace(/^#+\s/, '');
                  const className: Record<number, string> = {
                    1: 'text-4xl font-bold mt-8 mb-4',
                    2: 'text-3xl font-bold mt-6 mb-3',
                    3: 'text-2xl font-bold mt-4 mb-2',
                  };
                  const headingClass = className[level] || 'text-lg font-bold';
                  return (
                    <div key={idx} className={headingClass}>
                      {text}
                    </div>
                  );
                }
                if (paragraph.startsWith('```')) {
                  const code = paragraph.replace(/```\w*\n?/g, '').trim();
                  return (
                    <pre key={idx} className="bg-muted p-4 overflow-x-auto rounded-none border border-border">
                      <code className="text-sm text-foreground font-mono">{code}</code>
                    </pre>
                  );
                }
                if (paragraph.startsWith('-') || paragraph.startsWith('•')) {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2">
                      {paragraph.split('\n').map((item: string, i: number) => (
                        <li key={i} className="text-foreground">
                          {item.replace(/^[-•]\s/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <ol key={idx} className="list-decimal list-inside space-y-2">
                      {paragraph.split('\n').map((item: string, i: number) => (
                        <li key={i} className="text-foreground">
                          {item.replace(/^\d+\.\s/, '')}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={idx} className="text-foreground">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </article>

        {/* Share Buttons */}
        <div className="mt-12 pt-8 border-t border-border">
          <ShareButtons 
            title={post.title}
            url={postUrl}
            excerpt={post.excerpt}
          />
        </div>

        {/* Tags */}
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2 font-semibold"
              >
                <Tag size={16} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border">
            <h3 className="text-2xl font-bold text-foreground mb-8">Artigos Relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <a className="block group">
                    <div className="bg-card border border-border p-6 h-full hover:border-primary transition-colors">
                      <span className="inline-block bg-primary text-primary-foreground px-2 py-1 text-xs font-bold mb-3">
                        {relatedPost.category}
                      </span>
                      <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <CommentsSection 
        postId={post.id} 
        postTitle={post.title}
        authorEmail="renanmarconcin220@gmail.com"
      />
    </div>
  );
}