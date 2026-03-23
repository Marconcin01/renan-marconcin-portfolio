import { Code, Database, BarChart3, Zap } from 'lucide-react';

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Linguagens & Frameworks',
    icon: <Code size={24} />,
    skills: ['Python', 'JavaScript', 'TypeScript', 'React', 'SQL'],
  },
  {
    name: 'BI & Dados',
    icon: <BarChart3 size={24} />,
    skills: ['Power BI', 'Grafana', 'Power Query', 'Excel', 'SQL Server'],
  },
  {
    name: 'Automação & Ferramentas',
    icon: <Zap size={24} />,
    skills: ['Selenium', 'Playwright', 'Openpyxl', 'Pandas', 'ETL'],
  },
  {
    name: 'Sistemas & Plataformas',
    icon: <Database size={24} />,
    skills: ['SAP', 'Salesforce', 'GitHub', 'Teams', 'Outlook'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-card">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Skills Técnicas</h2>
          <div className="w-16 h-1 bg-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="bg-background border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-primary">{category.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-primary text-primary-foreground px-4 py-2 font-semibold text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div className="mt-12 bg-background border-2 border-primary p-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Soft Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-primary font-bold">▸</span>
              <div>
                <p className="font-bold text-foreground">Automação & Eficiência</p>
                <p className="text-muted-foreground">Foco em processos que ganham tempo e produtividade</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-bold">▸</span>
              <div>
                <p className="font-bold text-foreground">Análise de Dados</p>
                <p className="text-muted-foreground">Transformação de dados em insights acionáveis</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-bold">▸</span>
              <div>
                <p className="font-bold text-foreground">Comunicação Técnica</p>
                <p className="text-muted-foreground">Apresentação clara de insights para stakeholders</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-bold">▸</span>
              <div>
                <p className="font-bold text-foreground">Resolução de Problemas</p>
                <p className="text-muted-foreground">Abordagem sistemática para desafios técnicos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
