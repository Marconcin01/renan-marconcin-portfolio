import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  status: 'Completo' | 'Em Desenvolvimento';
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: 'Automação Wrike-BI',
    description: 'Pipeline de ETL desenvolvida em Python e Playwright para integração Wrike-BI. Extração automática de dados e processamento para dashboards.',
    tags: ['Python', 'Playwright', 'ETL', 'Automação'],
    status: 'Completo',
    github: 'https://github.com/Marconcin01/automacao-wrike-bi',
  },
  {
    title: 'Pipeline Freshdesk-Outlook',
    description: 'Sistema de automação que integra Freshdesk com Outlook. Inclui diagnóstico de falhas, notificações via Adaptive Cards e deployment automatizado.',
    tags: ['Python', 'Playwright', 'Freshdesk', 'Outlook'],
    status: 'Completo',
    github: 'https://github.com/Marconcin01/automacao-freshdesk-outlook',
  },
  {
    title: 'Data Discovery SSAS',
    description: 'Scripts para escaneamento automatizado de metadados, descoberta de colunas e orquestração de leitura de esquemas em modelos Microsoft Analysis Services.',
    tags: ['Python', 'SSAS', 'SQL', 'Data Discovery'],
    status: 'Completo',
    github: 'https://github.com/Marconcin01/Implementa-o-de-ferramentas-para-Data-Discovery-e-Mapeamento-de-SSAS',
  },
  {
    title: 'App de Estudos e Revisões',
    description: 'Aplicativo para gerenciar cursos, estudos e revisões. Foco em produtividade e organização do aprendizado com notificações e acompanhamento de progresso.',
    tags: ['React', 'TypeScript', 'Produtividade'],
    status: 'Em Desenvolvimento',
  },
  {
    title: 'App Bíblia com Quiz',
    description: 'Aplicativo interativo para leitura da Bíblia com sistema de quiz integrado e recompensas por progresso. Gamificação da leitura espiritual.',
    tags: ['React', 'Gamificação', 'Quiz'],
    status: 'Em Desenvolvimento',
  },
  {
    title: 'Análise de Gêneros de Filmes',
    description: 'Análise exploratória da distribuição de gêneros de filmes usando o dataset MovieLens 25M. Visualizações e insights sobre tendências.',
    tags: ['Python', 'Pandas', 'Data Analysis', 'Jupyter'],
    status: 'Completo',
    github: 'https://github.com/Marconcin01/analise-generos-filmes',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Projetos Destacados</h2>
          <div className="w-16 h-1 bg-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-card border border-border p-6 hover:border-primary transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground flex-1">{project.title}</h3>
                <span
                  className={`text-xs font-bold px-3 py-1 whitespace-nowrap ml-2 ${
                    project.status === 'Completo'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-foreground mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold bg-muted text-muted-foreground px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-bold"
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-bold"
                  >
                    <ExternalLink size={18} />
                    Ver Projeto
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-card border-2 border-primary">
          <h3 className="text-xl font-bold text-foreground mb-3">+ 10 Scripts de Automação</h3>
          <p className="text-foreground mb-4">
            Além dos projetos acima, desenvolvi mais de 10 scripts personalizados para automação de processos, extração de dados, e ganho de produtividade em diferentes contextos.
          </p>
          <a
            href="https://github.com/Marconcin01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 font-bold hover:opacity-90 transition-opacity"
          >
            Ver todos no GitHub
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
