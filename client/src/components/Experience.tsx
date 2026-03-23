import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: 'Estagiário de BI e Dados',
    company: 'Olos Tecnologia',
    period: 'Out 2025 - Presente',
    location: 'São Paulo, SP',
    highlights: [
      'Desenvolvimento de scripts em Python (Selenium, Openpyxl, OS) para automação de extração, limpeza e consolidação de dados',
      'Criação e manutenção de dashboards dinâmicos em Power BI e Grafana',
      'Análise SQL Server para validação e extração de informações',
      'Implementação de Power Query para processos de ETL e modelagem de dados',
      'Consultoria de dados para times de vendas e operações',
    ],
  },
  {
    title: 'Estagiário de TI',
    company: 'Secretária Municipal de Saúde',
    period: 'Jun 2025 - Out 2025',
    location: 'São Paulo, SP',
    highlights: [
      'Coleta, padronização e limpeza de dados de múltiplas fontes',
      'Extração e manipulação de dados para relatórios e dashboards',
      'Visualização de dados para análise de tendências',
      'Implementação de controles de acesso e backup de dados',
      'Suporte técnico em hardware e software',
    ],
  },
  {
    title: 'Auxiliar Administrativo',
    company: 'Elgin S/A',
    period: 'Jun 2024 - Abr 2025',
    location: 'São Paulo, SP',
    highlights: [
      'Atendimento ao prestador de serviço e suporte administrativo',
      'Gestão de dados em SAP ERP',
      'Processamento de pagamentos e análise de conformidade',
      'Monitoramento de peças e faturamento',
      'Comunicação proativa com stakeholders',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-card">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Experiência Profissional</h2>
          <div className="w-16 h-1 bg-primary" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="border-l-4 border-primary pl-8 py-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary text-primary-foreground mt-1">
                  <Briefcase size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                  <p className="text-primary font-bold mt-1">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {exp.period} • {exp.location}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 ml-16">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3 text-foreground">
                    <span className="text-primary font-bold mt-1">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
