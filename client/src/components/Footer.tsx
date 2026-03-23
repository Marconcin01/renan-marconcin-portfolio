import { Github, Mail, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappMessage = encodeURIComponent("Olá Renan! Vi seu portfólio de Automação & Dados e gostaria de conversar.");
  const whatsappUrl = `https://wa.me/5511940068958?text=${whatsappMessage}`;

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary flex items-center justify-center text-foreground font-bold text-sm">
                RM
              </div>
              <span className="font-bold text-lg">Renan Marconcin</span>
            </div>
            <p className="text-background/80">
              Desenvolvedor apaixonado por automação e dados.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#experience" className="hover:text-primary transition-colors">
                  Experiência
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/Marconcin01"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary text-foreground hover:opacity-80 transition-opacity"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/renan-marconcin-almeida"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary text-foreground hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:Renanmarconcin220@gmail.com"
                className="p-3 bg-primary text-foreground hover:opacity-80 transition-opacity"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary text-foreground hover:opacity-80 transition-opacity"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-background/60 text-sm">
            © {currentYear} Renan Marconcin. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}