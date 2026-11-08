# Datas comemorativas do bom dia da RNA

Pedido do Obadia em 08/11/2026: em datas importantes, principalmente do mercado magistral e da saúde, o story de bom dia sai PERSONALIZADO para a data (no lugar do assunto normal do dia), podendo ter a Hana vestida do profissional homenageado ou um visual temático.

Como funciona:
- O campo `"tag"` do JSON troca o "Bom dia" do topo pelo nome da data (ex.: "Dia do Farmacêutico"). No máximo 22 caracteres; se for maior, abrevie (ex.: "Educação Física").
- Frase e apoio homenageiam a profissão ou a causa, no tom premium da RNA, sem promessa nem alegação terapêutica.
- Data que cai no domingo (dia sem story) é homenageada no SÁBADO anterior, com a frase no futuro ("amanhã é...").
- O tema de cores continua o do dia da semana.
- A tarefa semanal (segunda) prepara com antecedência o JSON das datas da semana seguinte e mostra na página de aprovação do Chefe; a tarefa diária usa o JSON pronto.
- Hana = a boneca loira em estilo 3D/cartoon dos posts da RNA (ex.: carrossel de 09/11/2026, feed/2026-11-06-teste/02.jpg, a de rabo de cavalo). Pedido do Obadia: nas datas de profissão, a Hana aparece vestida do profissional do dia (ex.: jaleco branco com o logo da RNA e escrito "Biomédica" ou "Farmacêutica", óculos, braços cruzados), animada no story.
- Imagens da Hana ficam em `assets/hana/<profissao>.png` (ex.: `assets/hana/biomedica.png`, `assets/hana/farmaceutica.png`), formato vertical 4:5 (ex.: 1080x1320), Hana centralizada e com a cabeça no terço de cima. Se existir a imagem da profissão do dia, acrescente ao JSON `"hana": "assets/hana/<profissao>.png"`: o modelo coloca o texto no alto e a Hana num arco dourado EMBAIXO dos dizeres (pedido do Obadia), com animação de entrada e respiração. No Metricool, use isAiGenerated true. Sem imagem, vai a versão temática sem a Hana.

Fontes das datas: Calendarr (calendarr.com/brasil/datas-comemorativas-da-saude) e Estado de Minas/Ministério da Saúde (em.com.br, 14/03/2023), lidas em 08/11/2026. Datas que não estavam nas fontes ficaram de fora; antes de incluir uma nova, confirme em fonte confiável.

## Profissões (prioridade)
| Data | Data comemorativa | Tag sugerida |
|---|---|---|
| 20/01 | Dia do Farmacêutico | Dia do Farmacêutico |
| 05/02 | Dia do Dermatologista | Dia do Dermatologista |
| 12/05 | Dia da Enfermagem | Dia da Enfermagem |
| 27/07 | Dia do Pediatra | Dia do Pediatra |
| 05/08 | Dia Nacional da Farmácia e Dia Nacional da Saúde | Dia da Farmácia |
| 14/08 | Dia do Cardiologista | Dia do Cardiologista |
| 27/08 | Dia do Psicólogo | Dia do Psicólogo |
| 31/08 | Dia do Nutricionista | Dia do Nutricionista |
| 01/09 | Dia do Profissional de Educação Física | Educação Física |
| 05/09 | Dia do Oficial de Farmácia | Oficial de Farmácia |
| 08/09 | Dia Mundial da Fisioterapia | Dia da Fisioterapia |
| 25/09 | Dia Internacional do Farmacêutico | Dia do Farmacêutico |
| 03/10 | Dia Mundial do Dentista | Dia do Dentista |
| 13/10 | Dia do Fisioterapeuta e do Terapeuta Ocupacional | Dia do Fisioterapeuta |
| 18/10 | Dia do Médico | Dia do Médico |
| 20/11 | Dia do Biomédico | Dia do Biomédico |
| 07/12 | Dia do Cirurgião Plástico | Cirurgia Plástica |

## Saúde e bem-estar
| Data | Data comemorativa | Tag sugerida |
|---|---|---|
| 08/03 | Dia Internacional da Mulher | Dia da Mulher |
| 31/03 | Dia da Saúde e da Nutrição | Saúde e Nutrição |
| 07/04 | Dia Mundial da Saúde | Dia da Saúde |
| 28/05 | Dia Internacional de Luta pela Saúde da Mulher | Saúde da Mulher |
| 10/10 | Dia Mundial da Saúde Mental | Saúde Mental |

## Família (casam com o sábado)
- Dia das Mães: 2º domingo de maio → homenagem no sábado anterior.
- Dia dos Pais: 2º domingo de agosto → homenagem no sábado anterior.

## Proibido (decisão do Obadia em 08/11/2026)
Nada de temas pesados no Instagram da RNA: câncer, Aids, prevenção do suicídio, doenças graves e afins são SUPER DISPENSÁVEIS. Não entram no bom dia nem em nenhum outro post, nem como data comemorativa.
