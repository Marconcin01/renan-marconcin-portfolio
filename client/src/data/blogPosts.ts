export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Automação' | 'BI' | 'Python' | 'Dados';
  author: string;
  date: string;
  readTime: number;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'automacao-wrike-bi',
    title: 'Como Automatizar Extração de Dados do Wrike com Python e Playwright',
    excerpt: 'Aprenda a criar um pipeline ETL automatizado para extrair dados do Wrike e processá-los para dashboards de BI.',
    content: `# Como Automatizar Extração de Dados do Wrike com Python e Playwright

## Introdução

Neste artigo, vou compartilhar como criei um sistema de automação para extrair dados do Wrike e processá-los automaticamente para dashboards de BI. Essa solução eliminou horas de trabalho manual e aumentou a eficiência da equipe.

## O Desafio

Antes dessa automação, o processo era:
1. Acessar manualmente o Wrike
2. Exportar relatórios em Excel
3. Limpar e processar os dados
4. Atualizar os dashboards no Power BI

Tudo isso levava cerca de 2-3 horas por semana.

## A Solução

### Tecnologias Utilizadas
- **Python**: Linguagem principal
- **Playwright**: Automação de navegador (modo CDP)
- **Openpyxl**: Processamento de arquivos Excel
- **Pandas**: Manipulação de dados

### Arquitetura

\`\`\`python
# Fluxo principal
1. Autenticar no Wrike
2. Navegar até relatórios
3. Exportar dados
4. Processar com Pandas
5. Atualizar Power BI
\`\`\`

## Implementação

### Passo 1: Configurar Playwright

\`\`\`python
from playwright.async_api import async_playwright

async def extrair_dados_wrike():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('https://app.wrike.com')
\`\`\`

### Passo 2: Automação de Login

\`\`\`python
async def fazer_login(page, usuario, senha):
    await page.fill('input[name="email"]', usuario)
    await page.fill('input[name="password"]', senha)
    await page.click('button[type="submit"]')
    await page.wait_for_load_state('networkidle')
\`\`\`

### Passo 3: Extrair e Processar Dados

\`\`\`python
import pandas as pd

def processar_dados(arquivo_excel):
    df = pd.read_excel(arquivo_excel)
    # Limpeza e transformação
    df['data'] = pd.to_datetime(df['data'])
    df['status'] = df['status'].str.lower()
    return df
\`\`\`

## Resultados

Após implementar essa automação:
- ⏱️ **Tempo reduzido**: De 2-3 horas para 15 minutos
- 📊 **Acurácia**: 100% - sem erros manuais
- 🔄 **Frequência**: Agora roda diariamente automaticamente

## Lições Aprendidas

1. **Playwright é poderoso**: Modo CDP oferece mais controle que Selenium
2. **Tratamento de erros é essencial**: Adicione retry logic para falhas de rede
3. **Logs são seus amigos**: Registre tudo para debugging

## Próximos Passos

Estou trabalhando em:
- Notificações automáticas quando há erros
- Dashboard de monitoramento da automação
- Integração com Slack para alertas

---

**Quer aprender mais sobre automação com Python? Confira meu GitHub para ver o código completo!**`,
    category: 'Automação',
    author: 'Renan Marconcin',
    date: '2026-03-15',
    readTime: 8,
    tags: ['Python', 'Playwright', 'ETL', 'Wrike', 'Automação'],
  },
  {
    id: 'pipeline-freshdesk-outlook',
    title: 'Integrando Freshdesk com Outlook: Um Pipeline Completo',
    excerpt: 'Descubra como criar um pipeline de automação que integra Freshdesk com Outlook, incluindo diagnóstico de falhas e notificações.',
    content: `# Integrando Freshdesk com Outlook: Um Pipeline Completo

## Visão Geral

Este projeto demonstra como criar um pipeline robusto que integra Freshdesk (sistema de suporte) com Outlook (email), automatizando o fluxo de tickets e notificações.

## Arquitetura do Sistema

\`\`\`
Freshdesk API → Python Script → Processamento → Outlook Integration
                                    ↓
                            Diagnóstico de Falhas
                                    ↓
                            Adaptive Cards (Teams)
\`\`\`

## Componentes Principais

### 1. Extração de Dados do Freshdesk

\`\`\`python
import requests

class FreshdeskClient:
    def __init__(self, api_key, domain):
        self.api_key = api_key
        self.domain = domain
    
    def obter_tickets(self):
        url = f'https://{self.domain}.freshdesk.com/api/v2/tickets'
        headers = {'Authorization': f'Basic {self.api_key}'}
        response = requests.get(url, headers=headers)
        return response.json()
\`\`\`

### 2. Processamento e Limpeza

\`\`\`python
def processar_tickets(tickets):
    processados = []
    for ticket in tickets:
        processados.append({
            'id': ticket['id'],
            'assunto': ticket['subject'],
            'status': ticket['status'],
            'prioridade': ticket['priority'],
            'cliente': ticket['requester']['name']
        })
    return processados
\`\`\`

### 3. Integração com Outlook

\`\`\`python
from office365.outlook.mail import Message

def enviar_email_outlook(destinatario, assunto, corpo):
    message = Message()
    message.subject = assunto
    message.body = corpo
    message.to.add(destinatario)
    message.send()
\`\`\`

## Sistema de Diagnóstico

O pipeline inclui um sistema robusto de diagnóstico:

- ✅ Verificação de conectividade
- ✅ Validação de credenciais
- ✅ Tratamento de erros de API
- ✅ Retry automático com backoff exponencial
- ✅ Logging detalhado

## Notificações via Adaptive Cards

Para Teams, criamos Adaptive Cards customizadas:

\`\`\`json
{
  "type": "message",
  "attachments": [
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "contentUrl": null,
      "content": {
        "type": "AdaptiveCard",
        "body": [
          {
            "type": "TextBlock",
            "text": "Novo Ticket Freshdesk",
            "weight": "bolder",
            "size": "large"
          }
        ]
      }
    }
  ]
}
\`\`\`

## Deployment Automatizado

O pipeline é deployado automaticamente usando GitHub Actions:

\`\`\`yaml
name: Deploy Pipeline
on:
  schedule:
    - cron: '0 * * * *'  # A cada hora

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Pipeline
        run: python main.py
\`\`\`

## Benefícios

- 🚀 **Automação completa** do fluxo de suporte
- 📧 **Notificações em tempo real** no Outlook
- 🔍 **Diagnóstico automático** de problemas
- 📊 **Rastreamento** de todos os eventos

---

**Código disponível no meu GitHub. Sinta-se livre para adaptar para seus casos de uso!**`,
    category: 'Automação',
    author: 'Renan Marconcin',
    date: '2026-03-10',
    readTime: 10,
    tags: ['Python', 'Freshdesk', 'Outlook', 'API', 'Automação'],
  },
  {
    id: 'power-bi-dashboards',
    title: 'Criando Dashboards Impactantes com Power BI',
    excerpt: 'Aprenda as melhores práticas para criar dashboards em Power BI que comunicam insights de forma clara e efetiva.',
    content: `# Criando Dashboards Impactantes com Power BI

## Introdução

Um bom dashboard é mais que visualizações bonitas - é uma ferramenta de comunicação que transforma dados em ações. Neste artigo, compartilho as melhores práticas que aprendi desenvolvendo dashboards para diferentes áreas.

## Princípios de Design

### 1. Clareza Acima de Tudo

Seu dashboard deve responder uma pergunta específica. Antes de começar:
- Defina o objetivo principal
- Identifique a audiência
- Escolha as métricas certas

### 2. Hierarquia Visual

Use tamanho, cor e posição para guiar o olhar:

\`\`\`
KPI Principal (Grande, Destaque)
    ↓
Gráficos de Suporte
    ↓
Detalhes (Tabelas)
\`\`\`

### 3. Paleta de Cores

- Use no máximo 3-4 cores principais
- Mantenha consistência com brand guidelines
- Considere daltonismo na escolha

## Estrutura Recomendada

### Camada 1: KPIs (Key Performance Indicators)

\`\`\`
┌─────────────────────────────────┐
│  Receita Total    │  Crescimento │
│  R$ 1.2M          │  +15%        │
└─────────────────────────────────┘
\`\`\`

### Camada 2: Análise Temporal

Gráficos de linha ou área mostrando tendências:
- Receita por mês
- Tickets por semana
- Performance por trimestre

### Camada 3: Segmentação

Gráficos de barras ou pizza para:
- Vendas por região
- Tickets por categoria
- Distribuição por status

## Técnicas Avançadas

### Drill-Down Interativo

\`\`\`
Clique em "São Paulo" → Detalhes por cidade
                     → Detalhes por vendedor
                     → Detalhes por produto
\`\`\`

### Filtros Dinâmicos

Use slicers para permitir exploração:
- Por período
- Por região
- Por categoria

### Bookmarks para Narrativa

Crie diferentes "visualizações" do mesmo dashboard:
- Visão Executiva
- Visão Operacional
- Visão Detalhada

## Exemplo Prático: Dashboard de Vendas

### Dados Necessários
- Transações (data, valor, vendedor, região)
- Produtos (categoria, preço)
- Clientes (localização, segmento)

### Visualizações Recomendadas

1. **KPI Cards**: Receita total, Número de transações, Ticket médio
2. **Gráfico de Linha**: Receita ao longo do tempo
3. **Mapa**: Vendas por região
4. **Tabela**: Top 10 vendedores

## Otimização de Performance

- Reduza o volume de dados com filtros
- Use agregações apropriadas
- Evite cálculos complexos em tempo real
- Considere usar DirectQuery para dados grandes

## Dicas Finais

✅ Teste com usuários reais
✅ Itere baseado em feedback
✅ Documente fórmulas complexas
✅ Mantenha o dashboard atualizado

---

**Próximo artigo: Power Query - Transformação de Dados Avançada**`,
    category: 'BI',
    author: 'Renan Marconcin',
    date: '2026-03-05',
    readTime: 7,
    tags: ['Power BI', 'Dashboard', 'Visualização', 'BI'],
  },
  {
    id: 'python-data-cleaning',
    title: 'Limpeza de Dados com Python: Guia Prático',
    excerpt: 'Técnicas essenciais para limpar e preparar dados usando Pandas, tratando valores ausentes, duplicatas e inconsistências.',
    content: `# Limpeza de Dados com Python: Guia Prático

## Por Que Limpeza de Dados é Crítica?

"Garbage in, garbage out" - dados sujos levam a análises ruins. Estima-se que 80% do tempo de um analista é gasto limpando dados.

## Problemas Comuns

### 1. Valores Ausentes (NaN)

\`\`\`python
import pandas as pd

df = pd.read_csv('dados.csv')

# Verificar valores ausentes
print(df.isnull().sum())

# Estratégias de tratamento
df['coluna'].fillna(df['coluna'].mean())  # Preencher com média
df.dropna(subset=['coluna_importante'])    # Remover linhas
df['coluna'].fillna(method='ffill')        # Forward fill
\`\`\`

### 2. Duplicatas

\`\`\`python
# Encontrar duplicatas
duplicatas = df[df.duplicated()]

# Remover duplicatas
df = df.drop_duplicates()

# Remover baseado em colunas específicas
df = df.drop_duplicates(subset=['id', 'email'])
\`\`\`

### 3. Inconsistências de Tipo

\`\`\`python
# Converter tipos
df['data'] = pd.to_datetime(df['data'])
df['valor'] = pd.to_numeric(df['valor'], errors='coerce')

# Verificar tipos
print(df.dtypes)
\`\`\`

### 4. Valores Outliers

\`\`\`python
# Método IQR (Interquartile Range)
Q1 = df['coluna'].quantile(0.25)
Q3 = df['coluna'].quantile(0.75)
IQR = Q3 - Q1

outliers = df[(df['coluna'] < Q1 - 1.5*IQR) | 
              (df['coluna'] > Q3 + 1.5*IQR)]
\`\`\`

## Pipeline Completo de Limpeza

\`\`\`python
def limpar_dados(arquivo):
    # 1. Carregar
    df = pd.read_csv(arquivo)
    
    # 2. Remover duplicatas
    df = df.drop_duplicates()
    
    # 3. Tratar valores ausentes
    df = df.dropna(subset=['id'])
    df['descricao'].fillna('N/A', inplace=True)
    
    # 4. Padronizar tipos
    df['data'] = pd.to_datetime(df['data'])
    df['valor'] = pd.to_numeric(df['valor'])
    
    # 5. Remover espaços extras
    df['nome'] = df['nome'].str.strip()
    
    # 6. Padronizar texto
    df['categoria'] = df['categoria'].str.lower()
    
    # 7. Validar dados
    assert df['valor'].min() >= 0, "Valores negativos encontrados"
    
    return df
\`\`\`

## Validação de Dados

\`\`\`python
def validar_dados(df):
    validacoes = {
        'sem_nulos': df.isnull().sum().sum() == 0,
        'sem_duplicatas': not df.duplicated().any(),
        'datas_validas': df['data'].min() < df['data'].max(),
        'valores_positivos': (df['valor'] > 0).all()
    }
    
    for validacao, resultado in validacoes.items():
        print(f"{validacao}: {'✓' if resultado else '✗'}")
\`\`\`

## Ferramentas Úteis

- **Pandas Profiling**: Análise automática de qualidade
- **Great Expectations**: Validação de dados em produção
- **Dask**: Para datasets muito grandes

## Conclusão

Dados limpos = Análises confiáveis = Decisões melhores

---

**Próximo: Análise Exploratória de Dados (EDA)**`,
    category: 'Python',
    author: 'Renan Marconcin',
    date: '2026-02-28',
    readTime: 9,
    tags: ['Python', 'Pandas', 'Dados', 'Limpeza'],
  },
];
