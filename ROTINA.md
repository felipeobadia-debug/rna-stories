# Rotina do story diário da RNA

Story de bom dia publicado todos os dias às 7:20 (America/Sao_Paulo) no Instagram da RNA (@rnamanipulacao), via Metricool (blogId 7545319). Autorizado pelo Obadia em 04/11/2026: conferir às 7:00 e, se estiver tudo certo, publicar sem consultá-lo.

## Passo a passo
Padrão desde 06/11/2026 (pedido do Obadia): o story sai ANIMADO (vídeo MP4 de 8 s). A imagem JPG continua sendo gerada como plano B.

1. `stories/AAAA-MM-DD.json` com `{"frase", "apoio", "tema", "destaque", "legenda"}`. `destaque` é UMA palavra da frase (a mais afetiva, ex.: "carinho"), que acende em dourado no vídeo; escreva-a exatamente como está na frase, sem pontuação.
2. Imagem (plano B): `NODE_PATH=$(npm root -g) node tools/render.js AAAA-MM-DD` gera `stories/AAAA-MM-DD.jpg` (1080x1920). Se o playwright não estiver instalado: `npm install -g playwright` (só o pacote; nunca `playwright install`).
3. Vídeo (padrão): `NODE_PATH=$(npm root -g) node tools/render-video.js AAAA-MM-DD` gera `stories/AAAA-MM-DD.mp4` (1080x1920, 8 s, 30 fps, H.264 + áudio AAC silencioso). Usa o modelo `templates/rna-story-video.html` e o HyperFrames em versão fixa via `npx`, com telemetria desligada (demora 1 a 2 minutos na primeira vez; precisa de `ffmpeg`). Mesmo tema de cores do dia (bordo ou preto).
4. Conferir:
   - Imagem: texto inteiro e legível, logo visível, sem `{{` ou `}}`.
   - Vídeo: tirar o último quadro com `ffmpeg -v error -y -sseof -0.1 -i stories/AAAA-MM-DD.mp4 -frames:v 1 /tmp/final.png` e olhar: frase inteira, apoio, logo, destaque em dourado, tema certo, sem `{{` ou `}}`. `ffprobe` deve mostrar duração de 8 s.
5. Commit e push na branch `main` (JSON, JPG e MP4).
6. Links públicos:
   - Vídeo: `https://raw.githubusercontent.com/felipeobadia-debug/rna-stories/main/stories/AAAA-MM-DD.mp4`
   - Imagem: `https://raw.githubusercontent.com/felipeobadia-debug/rna-stories/main/stories/AAAA-MM-DD.jpg`
7. Metricool `createScheduledPost`: blogId 7545319, data de hoje 07:20 America/Sao_Paulo, `autoPublish: true`, `draft: false`, providers instagram, `instagramData.type: "STORY"`, media com o link do VÍDEO, sem texto.
8. Plano B: se o vídeo não for gerado (ou não passar na conferência) depois de 1 nova tentativa, ou se o Metricool recusar o vídeo, agende com o link da IMAGEM e avise o Obadia em uma frase que hoje saiu a versão estática e por quê.

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
