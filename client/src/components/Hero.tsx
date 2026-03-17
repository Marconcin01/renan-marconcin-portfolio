import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663160843330/UAggvGh7NimvW7gyVYY59S/hero-background-MYYYkJzuHeE2LYNtYEsM3p.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-primary font-bold text-sm tracking-widest uppercase">
                Bem-vindo ao meu portfólio
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Automação & Dados
              </h1>
              <p className="text-xl text-muted-foreground">
                Estudante de ADS | Estagiário de BI e Dados
              </p>
            </div>

            <p className="text-lg text-foreground leading-relaxed max-w-lg">
              Sou apaixonado por criar automações que ganham tempo e produtividade. Com experiência em Python, Power BI e SQL, transformo dados em insights acionáveis.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-bold hover:opacity-90 transition-opacity"
              >
                Ver Projetos
                <ArrowRight size={20} />
              </a>
              <a
                href="https://github.com/Marconcin01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground text-foreground px-6 py-3 font-bold hover:bg-foreground hover:text-background transition-colors"
              >
                GitHub
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/Marconcin01"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:Renanmarconcin220@gmail.com"
                className="p-3 border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex justify-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663160843330/UAggvGh7NimvW7gyVYY59S/automation-visual-UTY48NJgJRdHWuSGq.webp"
              alt="Automation workflow"
              className="w-full max-w-md"
            />
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-4 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">10+</div>
            <p className="text-muted-foreground mt-2">Scripts de Automação</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">2</div>
            <p className="text-muted-foreground mt-2">Apps em Desenvolvimento</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">1+</div>
            <p className="text-muted-foreground mt-2">Anos de Estágio</p>
          </div>
        </div>
      </div>
    </section>
  );
}
