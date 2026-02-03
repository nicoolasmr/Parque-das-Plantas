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

## 🧠 Alinhamento com Skills (Expertise)

Este projeto foi construído seguindo rigorosamente os princípios de:
- **Game Development**: Loop de 60fps com Delta Time, PWA (Progressive Web App) e Sistema de Partículas.
- **Game Design**: Core Loop validado, Sistema de Loja (`/shop`) e progressão persistente.
- **Game Art**: UI Premium, Micro-animações (Floating) e Assets Gerados por IA.
- **Game Audio**: Audio Manager centralizado com suporte a categorias SFX/BGM.

## 🏪 Loja e Economia
O jogo agora possui uma loja funcional onde você pode usar suas moedas para comprar itens que ajudam na gameplay.

## 📱 PWA (App Mobile)
O jogo pode ser instalado no seu celular! Basta acessar o link no Chrome e selecionar "Adicionar à tela de início".

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
