import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Entre em Contato</h2>
          <div className="w-16 h-1 bg-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-lg text-foreground leading-relaxed">
              Estou aberto a novas oportunidades, colaborações e conversas sobre automação, dados e tecnologia. Sinta-se à vontade para entrar em contato!
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary text-primary-foreground mt-1">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-bold text-foreground">Email</p>
                  <a
                    href="mailto:Renanmarconcin220@gmail.com"
                    className="text-primary hover:underline"
                  >
                    Renanmarconcin220@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary text-primary-foreground mt-1">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-bold text-foreground">Telefone</p>
                  <a
                    href="tel:+5511940068958"
                    className="text-primary hover:underline"
                  >
                    (11) 94006-8958
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary text-primary-foreground mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-bold text-foreground">Localização</p>
                  <p className="text-foreground">São Paulo, SP</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-8 border-t border-border">
              <a
                href="https://github.com/Marconcin01"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-card border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:Renanmarconcin220@gmail.com"
                className="p-4 bg-card border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-bold text-foreground mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-bold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-bold text-foreground mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary resize-none"
                  placeholder="Sua mensagem..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-6 py-3 font-bold hover:opacity-90 transition-opacity"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
