# Site do Matriz Grill

Página única (`index.html`) com as áreas Início, Agenda, Cardápio, Delivery, Fotos e vídeos e A casa.

## Programação (shows do mês)

No `index.html`, procure por **PROGRAMAÇÃO**: é uma lista com uma linha por show (`dia`, `artista`, `foto`).

1. Para incluir os shows do mês, acrescente as linhas em ordem de data. Sem foto, deixe `foto: ''`: a linha aparece só com o nome.
2. Quando a foto ou a arte chegar, salve em `public/midia/` (ex.: `sexta-16-10.jpg`) e ponha o caminho em `foto`. O ideal é quadrada e limpa (sem logo e sem textos), 1200x1200: a data e o nome o site já escreve.
3. Use sempre um nome de arquivo novo (o navegador guarda as fotos por um dia; com o mesmo nome, quem já visitou veria a foto antiga).
4. Opcional: salve em `public/midia/fundo/` uma cópia pequena e desfocada da arte (192 px de largura) e aponte em `fundo`. Sem ela, entra o fundo padrão.

Show que já passou some sozinho. A Agenda destaca o próximo show e lista os seguintes por mês; a página inicial mostra sempre a próxima sexta. Sem nenhum show na lista, o site volta para "Ao vivo toda sexta".

## Especial (véspera de feriado, encontros)

É uma linha da mesma lista com `especial: 'Nome do evento'` (e `hora`, se souber). Nas 3 semanas antes da data ele ganha a faixa vermelha no início do site, que leva para a Agenda. Não existe mais a aba Feriados.

## Cardápio

Os itens ficam no bloco `var cardapio` do `index.html`. Os preços precisam bater com o cardápio digital (https://cardapio-matrizgrill.vercel.app/).

## Pastas

- `public/midia` fotos e vídeos
- `public/fontes` letras do site
- `public/vendor` animações (GSAP, Lenis) e `efeitos.js`

## Desempenho

Os fundos desfocados e o granulado são imagens prontas (pasta `public/midia/fundo`), não efeitos calculados pelo navegador. Não volte a usar `filter: blur`, `mix-blend-mode` em camada fixa nem `background-attachment: fixed`: foi isso que deixava a rolagem pesada.
