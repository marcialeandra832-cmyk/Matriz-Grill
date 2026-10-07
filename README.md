# Site do Matriz Grill

Página única (`index.html`) com as áreas Início, Agenda, Feriados, Cardápio, Delivery, Fotos e vídeos e A casa.

## Atualização semanal (sexta ao vivo)

1. Salve a foto da semana em `public/midia/` (ex.: `sexta-09-10.jpg`). O ideal é a arte quadrada e limpa (sem logo e sem textos), 1200x1200: a data e o nome o site já escreve. Se só houver o story, vale recortar a faixa dos músicos.
2. No `index.html`, procure por **ATUALIZAR TODA SEMANA** e troque `dia`, `artista` e `foto`.

3. Use sempre um nome de arquivo novo a cada semana (ex.: `sexta-16-10.jpg`). O navegador guarda as fotos por um dia; com o mesmo nome, quem já visitou veria a foto antiga.
4. Opcional: salve em `public/midia/fundo/` uma cópia pequena e desfocada da arte (192 px de largura) e aponte em `fundo`. Sem ela, entra o fundo padrão.

Depois que a sexta passa, o site volta sozinho para "Ao vivo toda sexta".

## Especial de feriado

Procure por `data-fim` no `index.html`: é a data em que o aviso some sozinho.

## Cardápio

Os itens ficam no bloco `var cardapio` do `index.html`. Os preços precisam bater com o cardápio digital (https://cardapio-matrizgrill.vercel.app/).

## Pastas

- `public/midia` fotos e vídeos
- `public/fontes` letras do site
- `public/vendor` animações (GSAP, Lenis) e `efeitos.js`

## Desempenho

Os fundos desfocados e o granulado são imagens prontas (pasta `public/midia/fundo`), não efeitos calculados pelo navegador. Não volte a usar `filter: blur`, `mix-blend-mode` em camada fixa nem `background-attachment: fixed`: foi isso que deixava a rolagem pesada.
