# Parque das Plantas 🌿

MVP de um jogo puzzle hypercasual mobile-first construído com Next.js, TypeScript e HTML5 Canvas.

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

## ✨ Experiência Premium (Phase 2)

O **Parque das Plantas** evoluiu de um MVP para uma experiência de jogo completa:
- **Visual Vibrante**: Sistema de partículas dinâmicas e animações secundárias (floating) para sementes.
- **Economia de Jogo**: Loja funcional (`/shop`) com itens de suporte que utilizam o saldo de moedas do jogador.
- **Som Imersivo**: Estrutura ready-to-go para BGM (Música de fundo) e SFX (Efeitos sonoros) via `AudioManager`.
- **Evolução de Assets**: Substituição de formas básicas por sprites artísticos (Hand-painted style).

## 📱 PWA & Mobile First

O jogo foi projetado para ser jogado prioritariamente em dispositivos móveis:
1. **Instalável**: No Android/iOS, use a opção "Adicionar à tela de início" para ter o ícone no seu menu e rodar em tela cheia (Standalone).
2. **Suporte a Vibração**: Feedback tátil ao cometer erros ou completar níveis.
3. **Leve e Rápido**: Construído com Next.js para carregamento instantâneo.

## 🧠 Alinhamento com Skills

- **Game Development**: Loop de 60fps com Delta Time, PWA, Particle Systems.
- **Game Design**: Core Loop de satisfação imediata, Curva de Dificuldade Balanceada, Meta-game (Loja).
- **Game Art**: Estilo visual harmônico, feedbaks de impacto (Shake/Flash/Particles).
- **Game Audio**: Mixagem modular e suporte a múltiplas categorias de som.

## 🌍 Como fazer Deploy no Vercel

O projeto está pronto para o Vercel (Next.js App Router).

1. Crie um novo projeto no [Vercel Dashboard](https://vercel.com/new).
2. Conecte este repositório.
3. Clique em **Deploy**. O Vercel detectará automaticamente as configurações do Next.js.

## 🛠️ Como Editar Níveis

As configurações dos níveis estão em `lib/game/levels.ts`. Você pode alterar:
- `colors`: Array de cores hexadecimais para sementes e canteiros.
- `seedsCount`: Quantidade de sementes que aparecerão no nível.
- `timeLimit`: Tempo em segundos para completar.
- `penalty`: Tempo subtraído em caso de erro.

## ✅ Testes Manuais (Passo a Passo)

1. **Gameplay Básico:** Arraste uma semente vermelha para um canteiro vermelho. Verifique se ela desaparece e a contagem de sementes aumenta.
2. **Sistema de Penalidade:** Arraste uma semente de uma cor para um canteiro de cor diferente. Verifique se o tempo diminui e a tela dá um "shake".
3. **Vitória:** Complete todas as sementes antes do tempo acabar. Verifique se a tela de vitória aparece com o prêmio em moedas.
4. **Linkagem:** Vá para o "Jardim" e verifique se a planta do nível anterior foi desbloqueada.
5. **Persistência:** Feche a aba e abra novamente. Verifique se as moedas e o nível atual foram mantidos.
6. **Reset:** Vá em "Configurações" e clique em "Apagar todos os dados". Verifique se o jogo volta ao Nível 1 com 0 moedas.
