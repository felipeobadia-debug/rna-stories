# Rotina do story diário da RNA

Story de bom dia publicado todos os dias às 7:20 (America/Sao_Paulo) no Instagram da RNA (@rnamanipulacao), via Metricool (blogId 7545319). Autorizado pelo Obadia em 04/11/2026: conferir às 7:00 e, se estiver tudo certo, publicar sem consultá-lo.

## Passo a passo
1. `stories/AAAA-MM-DD.json` com `{"frase", "apoio", "tema", "legenda"}`.
2. `NODE_PATH=$(npm root -g) node tools/render.js AAAA-MM-DD` gera `stories/AAAA-MM-DD.jpg` (1080x1920). Se o playwright não estiver instalado: `npm install -g playwright` (só o pacote; nunca `playwright install`).
3. Olhar a imagem: texto inteiro e legível, logo visível, sem `{{` ou `}}`.
4. Commit e push na branch `main`.
5. Imagem pública: `https://raw.githubusercontent.com/felipeobadia-debug/rna-stories/main/stories/AAAA-MM-DD.jpg`
6. Metricool `createScheduledPost`: blogId 7545319, data de hoje 07:20 America/Sao_Paulo, `autoPublish: true`, `draft: false`, providers instagram, `instagramData.type: "STORY"`, media com o link acima, sem texto.

## Regras da frase
- Frase ORIGINAL da RNA, nunca atribuída a ninguém. Frase principal curta (até ~10 palavras) + frase de apoio de 1 a 2 linhas.
- Tom: tocante, elegante, feminino e afetivo (pedido do Obadia em 04/11/2026). Público principal: mulheres.
- Puxar para a cultura da RNA: cuidado sob medida, atendimento humanizado, qualidade, bem-estar, autocuidado, longevidade, esporte.
- Tema por dia: segunda, coragem para começar a semana; terça a quinta, autocuidado (variar o ângulo); sexta, movimento/esporte e se cuidar no fim de semana (tema "preto"); sábado e domingo, descanso, pausa e afeto. Demais dias: tema "bordo".
- Proibido: prometer cura ou resultado, citar medicamentos, ativos, fórmulas, preços ou promoções, alegação terapêutica.
- Não repetir frases dos últimos 30 dias (consultar `stories/*.json`).

# Story pessoal do Obadia (envio diário, postagem manual)

Todo dia a lâmina pessoal (frase estoica/clássica) é gerada e enviada ao Obadia no celular com a legenda e o link para baixar. Ele posta manualmente no Instagram pessoal (não há conta pessoal no Metricool).

1. `stories/pessoal-AAAA-MM-DD.json` com `{"frase", "autor", "obra", "legenda"}`.
2. `NODE_PATH=$(npm root -g) node tools/render-pessoal.js AAAA-MM-DD` gera `stories/pessoal-AAAA-MM-DD.jpg` (1080x1920).
3. Commit e push; link para baixar: `https://raw.githubusercontent.com/felipeobadia-debug/rna-stories/main/stories/pessoal-AAAA-MM-DD.jpg`

Regras da frase pessoal: pegada grega/estoica sobre vitória, bem-estar e força interior. Somente autores clássicos: segunda Sêneca, terça Epicteto, quarta Marco Aurélio, quinta um filósofo grego (Aristóteles, Heráclito, Sócrates via Platão, Epicuro, Zenão), sexta Kant ou outro clássico (Cícero, Musônio Rufo, Schopenhauer), sábado Sêneca (Cartas a Lucílio), domingo Epicteto (Discursos) ou Marco Aurélio. Apenas citações com atribuição comprovada, com obra e passagem; se não conseguir confirmar a fonte, troque de frase; nunca frases apócrifas. Não repetir passagens dos últimos 60 dias (`stories/pessoal-*.json`). Legenda de 1 a 2 frases, tom positivo, com 4 a 6 hashtags.
