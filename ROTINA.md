# Rotina do story diário da RNA

Story de bom dia publicado de segunda a sábado às 7:20 (domingo sem story, pedido do Obadia em 08/11/2026) (America/Sao_Paulo) no Instagram da RNA (@rnamanipulacao), via Metricool (blogId 7545319). Autorizado pelo Obadia em 04/11/2026: conferir às 7:00 e, se estiver tudo certo, publicar sem consultá-lo.

## Passo a passo
Padrão desde 06/11/2026 (pedido do Obadia): o story sai ANIMADO (vídeo MP4 de 8 s). A imagem JPG continua sendo gerada, mas só é postada em último caso.

1. `stories/AAAA-MM-DD.json` com `{"frase", "apoio", "tema", "destaque", "legenda"}` e, se a frase for citação, também `"autor"` e `"obra"` (aparecem logo abaixo da frase como "— Autor, Obra"). `destaque` é UMA palavra da frase (a mais afetiva, ex.: "carinho"), que acende em dourado no vídeo; escreva-a exatamente como está na frase, sem pontuação.
2. Imagem (plano B): `NODE_PATH=$(npm root -g) node tools/render.js AAAA-MM-DD` gera `stories/AAAA-MM-DD.jpg` (1080x1920). Se o playwright não estiver instalado: `npm install -g playwright` (só o pacote; nunca `playwright install`).
3. Vídeo (padrão): `NODE_PATH=$(npm root -g) node tools/render-video.js AAAA-MM-DD` gera `stories/AAAA-MM-DD.mp4` (1080x1920, 8 s, 30 fps, H.264 + áudio AAC silencioso). Usa o modelo `templates/rna-story-video.html` e o HyperFrames em versão fixa via `npx`, com telemetria desligada (demora 1 a 2 minutos na primeira vez; precisa de `ffmpeg`). Mesmo tema de cores do dia (`bordo`, `branco` ou `preto`).
4. Conferir:
   - Imagem: texto inteiro e legível, logo visível, sem `{{` ou `}}`.
   - Vídeo: tirar o último quadro com `ffmpeg -v error -y -sseof -0.1 -i stories/AAAA-MM-DD.mp4 -frames:v 1 /tmp/final.png` e olhar: frase inteira, apoio, logo, destaque em dourado, tema certo, sem `{{` ou `}}`. `ffprobe` deve mostrar duração de 8 s.
5. Commit e push na branch `main` (JSON, JPG e MP4).
6. Links públicos:
   - Vídeo: `https://raw.githubusercontent.com/felipeobadia-debug/rna-stories/main/stories/AAAA-MM-DD.mp4`
   - Imagem: `https://raw.githubusercontent.com/felipeobadia-debug/rna-stories/main/stories/AAAA-MM-DD.jpg`
7. Metricool `createScheduledPost`: blogId 7545319, data de hoje 07:20 America/Sao_Paulo, `autoPublish: true`, `draft: false`, providers instagram, `instagramData.type: "STORY"`, media com o link do VÍDEO, sem texto.
8. Último recurso: o estático só sai se o problema com a animação for insolúvel. Antes, leia o erro e resolva a causa (instalar playwright ou ffmpeg, limpar o cache do npx com `rm -rf ~/.npm/_npx`, encurtar a frase, corrigir o `destaque`), quantas vezes for útil enquanto houver tempo para agendar até 7:18. Se o Metricool recusar o vídeo, tente corrigir e reenviar pelo menos 2 vezes. Só então agende com o link da IMAGEM, como era feito antes, e avise o Obadia em uma frase que hoje saiu a versão estática e por quê.

## Cores por dia (definido pelo Obadia em 08/11/2026)
Todos os dias o story sai animado (vídeo). Campo `tema` do JSON:
- Segunda, quarta e sábado: `bordo` (fundo bordô, textos claros, dourado nos detalhes).
- Terça e quinta: `branco` (fundo branco, todos os dizeres em dourado escuro).
- Sexta: `preto`.
- Domingo: sem story.

## Assunto por dia (definido pelo Obadia em 08/11/2026)
- Segunda: força e encorajamento. Espírito: "reúna suas armas e parta pra guerra, sua semana precisa de você". ATENÇÃO (pedido do Obadia em 08/11/2026): esse é o ESPÍRITO, não o vocabulário. A RNA é farmácia de manipulação boutique, luxo; nada de estética de lutador, academia ou "guerreira". Evitar palavras como guerra, luta, batalha, arma, ringue, soco, "bora", "pra cima", "sangue nos olhos". Traduzir em linguagem elegante e serena: coragem, determinação, presença, protagonismo, confiança, "a semana precisa de você". Força com sofisticação, para a mulher se sentir convidada, não intimidada.
- Terça: beleza e autocuidado.
- Quarta: saúde mental. Recarregar as energias, respirar e seguir em frente.
- Quinta: humor leve e elegante, com sorriso de canto de boca, sobre se cuidar e "não deixar a peteca cair". Sem gíria pesada nem meme. Referência aprovada pelo Obadia: "A peteca pode até balançar. Cair, hoje não. Afinal, amanhã ainda é sexta."
- Sexta: fechar a semana, olhar o que passou e recalcular a rota da próxima. Lembrar de se exercitar e se hidratar bem no fim de semana.
- Sábado: família. Curtir quem você ama e fazer valer cada segundo juntos.
As ideias centrais são fixas, mas as frases devem VARIAR de semana a semana (ângulo, imagem, vocabulário). Pode buscar inspiração na internet.

## Datas comemorativas
Em datas importantes (principalmente do mercado magistral e da saúde: farmacêutico, médico, nutricionista, profissional de educação física etc.), o bom dia sai personalizado para a data, no lugar do assunto do dia. Lista, regras e campo `"tag"` em `datas-comemorativas.md`.

## Regras da frase
- Frase principal curta (até ~10 palavras) + frase de apoio de 1 a 2 linhas.
- Pode ser frase original da RNA (sem autor) ou citação. Preferência (Obadia, 08/11/2026): autores brasileiros, como Rubem Alves, Nelson Rodrigues e Clarice Lispector; de vez em quando um grego, um francês ou outro que sirva à proposta. A citação vai no formato de citação, só mencionando a autoria ("— Autor, Obra"), para deixar claro que a frase não é nossa. Se for citação, é OBRIGATÓRIO preencher `autor` e `obra` (com passagem, quando houver), e só usar citação com atribuição confirmada em fonte confiável; nunca frase apócrifa. Se não confirmar, use frase original. Nunca atribua frase original a alguém. A frase de apoio é sempre da RNA.
- Tom: elegante e afetivo, público principal feminino; o tom de cada dia segue o assunto acima (segunda mais forte, quinta mais divertida).
- Puxar para a cultura da RNA: cuidado sob medida, atendimento humanizado, qualidade, bem-estar, autocuidado, longevidade, esporte.
- Proibido: temas pesados (câncer, Aids, suicídio, doenças graves), prometer cura ou resultado, citar medicamentos, ativos, fórmulas, preços ou promoções, alegação terapêutica.
- Não repetir frases dos últimos 30 dias (consultar `stories/*.json`).

# Story pessoal do Obadia (envio diário, postagem manual)

Todo dia a lâmina pessoal (frase estoica/clássica) é gerada e enviada ao Obadia no celular com a legenda e o link para baixar. Ele posta manualmente no Instagram pessoal (não há conta pessoal no Metricool).

1. `stories/pessoal-AAAA-MM-DD.json` com `{"frase", "autor", "obra", "legenda"}`.
2. `NODE_PATH=$(npm root -g) node tools/render-pessoal.js AAAA-MM-DD` gera `stories/pessoal-AAAA-MM-DD.jpg` (1080x1920).
3. Commit e push; link para baixar: `https://raw.githubusercontent.com/felipeobadia-debug/rna-stories/main/stories/pessoal-AAAA-MM-DD.jpg`

Regras da frase pessoal: pegada grega/estoica sobre vitória, bem-estar e força interior. Somente autores clássicos: segunda Sêneca, terça Epicteto, quarta Marco Aurélio, quinta um filósofo grego (Aristóteles, Heráclito, Sócrates via Platão, Epicuro, Zenão), sexta Kant ou outro clássico (Cícero, Musônio Rufo, Schopenhauer), sábado Sêneca (Cartas a Lucílio), domingo Epicteto (Discursos) ou Marco Aurélio. Apenas citações com atribuição comprovada, com obra e passagem; se não conseguir confirmar a fonte, troque de frase; nunca frases apócrifas. Não repetir passagens dos últimos 60 dias (`stories/pessoal-*.json`). Legenda de 1 a 2 frases, tom positivo, com 4 a 6 hashtags.
