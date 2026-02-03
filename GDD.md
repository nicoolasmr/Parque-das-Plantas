# Documento de Design de Jogo (GDD): Parque das Plantas 🌿 (Phase 2)

## 1. Evolução Visual e UX
O jogo agora conta com:
- **Partículas de Feedback**: Ao acertar um canteiro, partículas coloridas explodem para celebrar o progresso.
- **Micro-animações**: Sementes flutuam suavemente no terreno, dando vida ao ambiente 2D (Princípio da Animação Secundária).
- **Sistema PWA**: O jogo pode ser instalado em dispositivos móveis como um aplicativo nativo, com ícone e tela de carregamento própria.

## 2. Áudio Manager
Implementado um sistema singleton para gerenciar:
- **SFX**: Efeitos sonoros para erros (tremor), acertos (partículas) e vitórias.
- **BGM**: Estrutura pronta para música ambiente relaxante que mantém o jogador no "Flow".

## 3. Economia e Loja (Game Depth)
Introdução da **Loja do Parque** (`/shop`):
- Os jogadores gastam moedas (Sunlight) para comprar utilitários que alteram a dificuldade (Congelar tempo, Tempo extra).
- Isso adiciona uma camada estratégica ao gerenciamento de recursos.

## 4. Alinhamento de Skills
- **Game Development**: Uso de `requestAnimationFrame` com interpolação e sistema de partículas eficiente.
- **Game Design**: Loop de feedback aprimorado e novos sinks de economia.
- **Game Art**: Uso de assets estilizados e animações orgânicas.
- **Game Audio**: Hierarquia sonora pronta para expansão.
