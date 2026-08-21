# Checkpoint — Site WERTHAUS v3

Data: 20/08/2026

## Estado atual

Branch de trabalho: `agent/site-v2-simulador`

PR: #1 — `Site v3: posicionamento alto padrão + simulador técnico`

O PR permanece em **draft**. Nada deve ser publicado ou mesclado em `main` sem autorização explícita.

## Posicionamento aprovado

A WERTHAUS deve se apresentar como **especialista em obras de alto padrão, residenciais e comerciais**.

Não usar hierarquia entre os segmentos, como:
- foco principal / atuação complementar;
- residencial como especialidade e comercial como secundário.

Residencial e comercial devem ter o mesmo peso institucional.

## Arquitetura da home aprovada

A home foi enxugada para seguir esta jornada:

1. Hero / posicionamento
2. Obras realizadas
3. Simulador WERTHAUS
4. Atuação — residencial e comercial
5. Como trabalhamos
6. WERTHAUS / engenheiro
7. FAQ
8. CTA final

Princípio de conteúdo: menos repetição, mais prova real. A profundidade deve existir sob demanda, sem transformar a home em apresentação institucional longa.

### Hero

Direção aprovada:
- engenharia e gestão de obras em Juiz de Fora e região;
- alto padrão residencial e comercial;
- CTAs para simulador e obras realizadas.

Removida a frase antiga sobre “foco principal em residências / atuação também em comerciais”.

### Obras realizadas

As obras aparecem logo após o hero.

Estrutura atual ainda usa três imagens genéricas do repositório e legendas provisórias. Próximo passo é substituir por **casos reais**.

Cada caso deve, idealmente, registrar:
- identificação pública da obra;
- residencial/comercial;
- localização divulgável;
- área aproximada;
- concluída/em andamento;
- escopo WERTHAUS;
- desafios/particularidades;
- atuação concreta da WERTHAUS;
- fotos;
- autorização para nome/logo quando aplicável.

Objetivo: mostrar 3 casos fortes na home e ampliar para 5–8 em futura página de Obras.

Não usar textos internos como “a próxima evolução desta área será transformar cada obra em um caso completo”.

### Simulador

Mantido em página dedicada: `simulador.html`.

A home apenas apresenta a ferramenta e direciona para ela.

Sem cadastro obrigatório. O visitante recebe o resultado completo antes de qualquer CTA de WhatsApp.

### Atuação

Texto e design devem tratar igualmente:
- Residencial de alto padrão
- Comercial de alto padrão

Sem rótulos de prioridade entre os dois.

### Como trabalhamos

Método condensado em:
- Planejar
- Coordenar
- Controlar

A profundidade entra em expansão opcional.

Texto aprovado para expansão:
`Ver o escopo completo que faz parte do gerenciamento`

### WERTHAUS / engenheiro

Manter identificação:

João Paulo Lopes Werneck
Engenheiro Civil
Registro CREA 2018013262
Visto CREA-MG 283898

Evitar usar “responsável técnico” de forma genérica, pois isso depende da ART de cada obra.

## FAQ — direção aprovada

A FAQ deve refletir dúvidas reais de quem pesquisa construção, gerenciamento e contratação de obra.

Temas selecionados:
- Quanto custa uma obra de alto padrão?
- Qual a diferença entre obra por administração e preço fechado?
- Quando devo contratar o gerenciamento da obra?
- Como a WERTHAUS controla o orçamento e evita que os custos saiam do previsto?
- Quem compra os materiais e contrata os prestadores?
- Como o prazo da obra é definido e acompanhado?
- A WERTHAUS atende tanto construção nova quanto reforma?

## Motor do simulador — decisões fechadas

### Área equivalente
`Ae = área construída × 0,935`

### CUB local — Sinduscon Juiz de Fora, julho/2026
- R1-N: R$ 2.614,32/m²
- R1-A: R$ 3.180,47/m²
- Premium: R1-A × 1,30

### Tipologia
- Alvenaria estrutural: 0,88
- Concreto convencional: 1,00
- Tijolo ecológico: 0,94
- Estrutura metálica: 1,15
- Estrutura metálica + tijolo ecológico: 1,08
- Ainda não sei: 1,00

### Topografia
- Plano: 1,00
- Leve aclive: 1,02
- Leve declive: 1,02
- Aclive acentuado: 1,15
- Declive acentuado: 1,10

### Margens finais
- Normal: ±10%
- Alto: ±10%
- Premium: -10% / +20%

### Muro
- terreno aproximado retangular, profundidade = 2 × largura;
- fechar duas laterais + fundos;
- altura: 2 m;
- custo-base: R$ 300/m²;
- estrutura pronta para correção por INCC.

### SERO
Estimativa automática para pessoa física, obra nova, residencial unifamiliar, sem créditos/abatimentos futuros.

- estrutura convencional, alvenaria estrutural e tijolo ecológico → SERO tipo alvenaria;
- estrutura metálica e metálica + tijolo ecológico → tipo mista;
- “não sei” → alvenaria por conservadorismo;
- VAU-MG usado no motor: agosto/2026 = R$ 3.058,04/m²;
- cálculo incorpora fator social e contribuições conforme metodologia definida.

### Serviços complementares
5% conforme modelo fechado.

### Gerenciamento
A taxa de gerenciamento faz parte do valor total e **não aparece separada** para o cliente.

Na distribuição visual por etapas, a administração fica diluída nos grupos, pois é assim que é cobrada.

Tabela comercial:
- 500k → 18%
- 600k → 17%
- 700k → 16%
- 800k → 15%
- 900k → 14,5%
- 1,0m → 14%
- 1,25m → 13%
- 1,5m → 12%
- 2,0m → 11%
- 2,5m → 10%
- 3,0m → 9%

### Prazo
Tabela codificada entre R$ 500 mil / 12 meses e R$ 3 milhões / 30 meses, com interpolação.

### Distribuição por etapas
Aplicar os percentuais diretamente sobre o valor central total.

Não abrir memória de cálculo ao cliente.

Agrupamento usado:
- Fundação
- Estrutura e vedações
- Cobertura
- Revestimentos e pisos
- Esquadrias e vidros
- Instalações
- Acabamentos finais
- Áreas externas

Normal usa matriz Normal da publicação técnica de referência; Alto e Premium usam a matriz de Alto padrão.

## Estratégia comercial do simulador

Não exigir WhatsApp para liberar resultado.

Entregar gratuitamente:
1. faixa total de investimento;
2. R$/m²;
3. distribuição por etapas;
4. prazo provável.

Depois, CTA de alta intenção:
`Falar com um engenheiro`

O link de WhatsApp envia automaticamente o contexto da simulação.

## Próximo passo exato

Retomar pela estruturação de **casos reais**.

Solicitar/receber do usuário 5–6 obras representativas, priorizando variedade entre residencial e comercial.

Para cada obra, coletar:
- identificação pública;
- tipo;
- localização;
- área;
- status;
- escopo WERTHAUS;
- desafios técnicos/comerciais;
- entregas concretas da WERTHAUS;
- fotos;
- autorização para nome/logo quando houver cliente comercial.

Depois:
1. escolher 3 casos para a home;
2. estruturar os demais para futura página `Obras`;
3. criar faixa de “clientes atendidos” apenas com nomes/logos confirmados para uso público;
4. evitar qualquer depoimento, nome ou logo placeholder.

## Pendências futuras

- casos reais de obras;
- clientes/logos reais autorizados;
- confirmar e-mail público definitivo;
- conferir visualmente em dispositivos reais;
- rotina mensal de atualização de CUB, VAU e INCC;
- eventual página detalhada de Obras;
- eventual conteúdo aprofundado sobre Residencial, Comercial e Como Trabalhamos.
