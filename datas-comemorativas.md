# Datas comemorativas do bom dia da RNA

Pedido do Obadia em 08/11/2026: em datas importantes, principalmente do mercado magistral e da saúde, o story de bom dia sai PERSONALIZADO para a data (no lugar do assunto normal do dia), podendo ter a Hana vestida do profissional homenageado ou um visual temático.

Como funciona:
- O campo `"tag"` do JSON troca o "Bom dia" do topo pelo nome da data (ex.: "Dia do Farmacêutico"). No máximo 22 caracteres; se for maior, abrevie (ex.: "Educação Física").
- Frase e apoio homenageiam a profissão ou a causa, no tom premium da RNA, sem promessa nem alegação terapêutica.
- Data que cai no domingo (dia sem story) é homenageada no SÁBADO anterior, com a frase no futuro ("amanhã é...").
- O tema de cores continua o do dia da semana.
- A tarefa semanal (segunda) prepara com antecedência o JSON das datas da semana seguinte e mostra na página de aprovação do Chefe; a tarefa diária usa o JSON pronto.
- CARACTERIZAÇÃO (pedido do Obadia em 08/11/2026): toda data tem um SELO temático animado embaixo dos dizeres: anel dourado com o nome da data, o dia e "RNA Manipulação Farmacêutica", e no centro um ícone em traço fino dourado que se desenha no vídeo. No JSON: `"icone"` (nome em `templates/icones.json`, conforme a tabela) e, opcional, `"selo"` (texto do anel, ex.: "DIA DO BIOMÉDICO • 20 DE NOVEMBRO • RNA MANIPULAÇÃO FARMACÊUTICA •"). Sem `"selo"`, o texto é montado com a tag e a data.
- Hana: fora por enquanto (decisão do Obadia em 08/11/2026). O modelo aceita `"hana": "assets/hana/<profissao>.png"` (Hana caracterizada, embaixo dos dizeres), mas só use quando o Chefe liberar e mandar as imagens.

Fontes das datas: Calendarr (calendarr.com/brasil/datas-comemorativas-da-saude) e Estado de Minas/Ministério da Saúde (em.com.br, 14/03/2023), lidas em 08/11/2026. Datas que não estavam nas fontes ficaram de fora; antes de incluir uma nova, confirme em fonte confiável.

## Profissões (prioridade)
| Data | Data comemorativa | Tag sugerida | Ícone |
|---|---|---|---|
| 20/01 | Dia do Farmacêutico | Dia do Farmacêutico | almofariz |
| 05/02 | Dia do Dermatologista | Dia do Dermatologista | gota |
| 12/05 | Dia da Enfermagem | Dia da Enfermagem | cruz |
| 27/07 | Dia do Pediatra | Dia do Pediatra | ursinho |
| 05/08 | Dia Nacional da Farmácia e Dia Nacional da Saúde | Dia da Farmácia | frasco |
| 14/08 | Dia do Cardiologista | Dia do Cardiologista | coracao |
| 27/08 | Dia do Psicólogo | Dia do Psicólogo | lotus |
| 31/08 | Dia do Nutricionista | Dia do Nutricionista | maca |
| 01/09 | Dia do Profissional de Educação Física | Educação Física | cronometro |
| 05/09 | Dia do Oficial de Farmácia | Oficial de Farmácia | frasco |
| 08/09 | Dia Mundial da Fisioterapia | Dia da Fisioterapia | coluna |
| 25/09 | Dia Internacional do Farmacêutico | Dia do Farmacêutico | almofariz |
| 03/10 | Dia Mundial do Dentista | Dia do Dentista | dente |
| 13/10 | Dia do Fisioterapeuta e do Terapeuta Ocupacional | Dia do Fisioterapeuta | coluna |
| 18/10 | Dia do Médico | Dia do Médico | estetoscopio |
| 20/11 | Dia do Biomédico | Dia do Biomédico | microscopio |
| 07/12 | Dia do Cirurgião Plástico | Cirurgia Plástica | brilho |

## Saúde e bem-estar
| Data | Data comemorativa | Tag sugerida | Ícone |
|---|---|---|---|
| 08/03 | Dia Internacional da Mulher | Dia da Mulher | flor |
| 31/03 | Dia da Saúde e da Nutrição | Saúde e Nutrição | maca |
| 07/04 | Dia Mundial da Saúde | Dia da Saúde | coracao |
| 28/05 | Dia Internacional de Luta pela Saúde da Mulher | Saúde da Mulher | flor |
| 10/10 | Dia Mundial da Saúde Mental | Saúde Mental | lotus |

## Família (casam com o sábado)
- Dia das Mães: 2º domingo de maio → homenagem no sábado anterior (ícone flor).
- Dia dos Pais: 2º domingo de agosto → homenagem no sábado anterior (ícone coracao).

## Proibido (decisão do Obadia em 08/11/2026)
Nada de temas pesados no Instagram da RNA: câncer, Aids, prevenção do suicídio, doenças graves e afins são SUPER DISPENSÁVEIS. Não entram no bom dia nem em nenhum outro post, nem como data comemorativa.
