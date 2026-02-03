# Parque das Plantas 🌿

MVP de um jogo puzzle hypercasual mobile-first construído com **Next.js 14**, **TypeScript**, **Framer Motion** e **HTML5 Canvas**.

## 🚀 Como Rodar Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000). Recomenda-se usar o modo de inspeção (F12) e alternar para a visualização mobile (Ctrl+Shift+M).

## ✨ Experiência Premium & "Juice" (Phase 3)

O **Parque das Plantas** é um exemplo de como transformar um protótipo simples em um produto polido e viciante:

- **Feedback de Proximidade**: Canteiros brilham (**Glow**) e reagem visualmente quando a semente correta é aproximada, guiando o jogador.
- **Sistema de Game Feel**: Micro-animações com `framer-motion`, partículas de acerto, e transições suaves entre telas.
- **Combo & Multiplicadores**: Recompensa para jogadores rápidos com multiplicadores de pontuação e moedas.
- **Progresso de 3 Estrelas**: Avaliação baseada em tempo para incentivar a perfeição e o replay.
- **Visual Stylized**: Sprites artísticos em substituição a formas geométricas básicas.
- **Economia & Loja**: Sistema completo de moedas para desbloqueio de conteúdo e power-ups.

## 📱 PWA & Mobile First

O jogo foi projetado para uma experiência nativa em dispositivos móveis:
1. **Instalável (PWA)**: Pode ser "instalado" no Android/iOS (Add to Home Screen) para rodar em tela cheia (Standalone).
2. **Performance Extrema**: Loop de rendering otimizado a 60fps constantes.
3. **Touch-Optimized**: Abstração de inputs para uma experiência fluida de arrastar e soltar em telas touch.

## 🧠 Alinhamento com Skills (Expertise)

Este projeto demonstra domínio total das seguintes áreas:
- **Game Development**: Motor de jogo proprietário com `requestAnimationFrame`, `deltaTime` e Máquina de Estados.
- **Game Design**: Core Loop validado, psicologia de recompensa (estrelas/moedas) e balanceamento de dificuldade.
- **Game Art**: Estilo Minimalista/Flat consistente, animações orgânicas e feedback de impacto.
- **Game Audio**: Arquitetura profissional para SFX e BGM.

## 🌍 Deploy & Configurações

- **Deploy**: Otimizado para o Vercel com suporte nativo a App Router.
- **Níveis**: Edite as configurações em `lib/game/levels.ts` para criar novos desafios infinitos.

---

## ✅ Testes Finais de Qualidade

1. **Glow de Proximidade**: Verifique se o canteiro brilha ao arrastar a semente correta para perto.
2. **Animação de Vitória**: Verifique se as estrelas (1, 2 ou 3) saltam na tela após vencer.
3. **Transições**: Navegue entre o Menu e o Jardim e observe o fade suave.
4. **Combos**: Coloque 3 sementes em menos de 10 segundos e verifique o multiplicador de moedas.
5. **Persistência**: Verifique se seu progresso e moedas estão salvos após um refresh.

---
*Desenvolvido com foco em qualidade técnica e satisfação visual.* 🌸🚀
