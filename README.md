# Site do Matriz Grill

Página única (`index.html`) com as áreas Início, Agenda, Feriados, Cardápio, Delivery, Fotos e vídeos e A casa.

## Atualização semanal (sexta ao vivo)

1. Salve a foto da semana em `public/midia/` (ex.: `sexta-09-10.jpg`). Vale a faixa dos músicos recortada do story, sem o logo e sem os textos: no story de 941x1672 é o trecho de 398 a 1055 de altura. A data e o nome o site já escreve.
2. No `index.html`, procure por **ATUALIZAR TODA SEMANA** e troque `dia`, `artista` e `foto`.

Depois que a sexta passa, o site volta sozinho para "Ao vivo toda sexta".

## Especial de feriado

Procure por `data-fim` no `index.html`: é a data em que o aviso some sozinho.

## Cardápio

Os itens ficam no bloco `var cardapio` do `index.html`. Os preços precisam bater com o cardápio digital (https://cardapio-matrizgrill.vercel.app/).

## Pastas

- `public/midia` fotos e vídeos
- `public/fontes` letras do site
- `public/vendor` animações (GSAP, Lenis) e `efeitos.js`
