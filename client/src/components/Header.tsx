import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'wouter';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50">
      <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary flex items-center justify-center text-white font-bold text-sm">
              RM
            </div>
            <span className="font-bold text-lg text-foreground">Renan Marconcin</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Sobre
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Experiência
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Projetos
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Skills
          </button>
          <Link href="/blog">
            <a className="text-foreground hover:text-primary transition-colors font-medium">
              Blog
            </a>
          </Link>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Contato
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-border bg-white">
          <div className="container max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Experiência
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Projetos
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Skills
            </button>
            <Link href="/blog">
              <a className="text-foreground hover:text-primary transition-colors font-medium text-left">
                Blog
              </a>
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Contato
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
