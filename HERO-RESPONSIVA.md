# Hero e transição para Cursos

As imagens são configuradas no início de `src/sections/Hero.jsx`, em
`heroImages.desktop` e `heroImages.mobile`. O `<picture>` seleciona a versão
mobile até **620px**, sem alterar a arte horizontal do desktop e do tablet.

A versão mobile usa `hero-person-mobile.png`, com a composição vertical e
o texto incorporado ao asset. Para trocar, importe outra composição vertical.
O enquadramento fica em
`.hero__foreground img`, no media query mobile de `src/styles/hero.css`.

## Geometria e movimento

- Desktop/tablet acima de 768px: Hero de `100svh`, mantendo o enquadramento original.
- Até 620px: altura `clamp(560px, calc(78vw + 285px), 760px)`;
  arte mobile com altura de 100% da cena, largura máxima de 100% e base em +2px.
- Removida a trilha vazia (`runway`): antes 60svh no desktop,
  38svh no tablet e 32svh no mobile; agora **zero** em todos os tamanhos.
- O marcador absoluto da animação tem duas vezes a altura da Hero
  (antes 230/205/190svh). Os offsets continuam `start start` e
  `end [altura da Hero]px`: o progresso completa em uma altura de cena.
- O sticky continua em `top: 0`, limitado pelo wrapper Hero + Cursos.
  Cursos vem imediatamente após a Hero e cobre sua base durante a rolagem.
- Deslocamento máximo do retrato: 14% da cena no desktop, 10% até 1024px
  e 3,5% até 620px, limitado pela folga superior medida. Removidas as
  acelerações finais adicionais de 8% e 20% que expunham a base.
- Fundo mantém deslocamento de 2,5% / 2% / 1,5% e a margem de cobertura original.
- Cursos: espaço superior de `clamp(1.25rem, 2.5vw, 2.5rem)`;
  até 620px, `1.25rem`. Fundo uniforme `#f4f8fb` elimina a faixa cinza.
- Cards começam a revelar com 1% visível, em vez de 18%, inclusive nos
  cards longos do celular. A ordem e o conteúdo das seções permanecem iguais.
- Com `prefers-reduced-motion: reduce`, a Hero fica no fluxo normal e os
  deslocamentos são zerados, como no comportamento anterior.

Nenhuma dependência foi adicionada. `App.jsx` mantém a estrutura existente.
