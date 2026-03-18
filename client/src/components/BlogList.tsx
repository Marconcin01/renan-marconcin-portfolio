import { useState } from 'react';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { Link } from 'wouter';

type Category = 'Automação' | 'BI' | 'Python' | 'Dados' | 'Todos';

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');

  const categories: Category[] = ['Todos', 'Automação', 'BI', 'Python', 'Dados'];

  const filteredPosts = selectedCategory === 'Todos'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
          <div className="w-16 h-1 bg-primary" />
          <p className="text-lg text-muted-foreground mt-4">
            Artigos sobre automação, dados e desenvolvimento de software
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 font-bold transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <a className="block group">
                  <article className="bg-card border border-border p-8 hover:border-primary transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="flex-1">
                        {/* Category Badge */}
                        <span className="inline-block bg-primary text-primary-foreground px-3 py-1 text-xs font-bold mb-4">
                          {post.category}
                        </span>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-foreground mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            {post.readTime} min de leitura
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-xs px-3 py-1"
                            >
                              <Tag size={12} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Read More Button */}
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                          Ler
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  </article>
                </a>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum artigo encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
