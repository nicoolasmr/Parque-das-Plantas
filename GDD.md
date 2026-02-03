# Documento de Design de Jogo (GDD): Parque das Plantas 🌿

Este documento descreve as decisões de design e arquitetura do jogo, alinhadas com as melhores práticas de desenvolvimento, design, arte e áudio.

## 1. Visão Geral (Game Design)
O **Parque das Plantas** é um puzzle hypercasual mobile-first.
- **Pitch**: Um jogo de relaxamento e precisão onde você cultiva seu jardim organizando as sementes corretas.
- **Core Loop (30-Second Test)**:
    1. **Ação**: Arrastar semente colorida (Seed).
    2. **Feedback**: Visual de arraste, colisão com canteiro (Bed), animação de erro/acerto.
    3. **Recompensa**: Moedas, desbloqueio de novas espécies no Jardim.

## 2. Implementação Técnica (Game Development)
Arquitetura baseada em **Next.js 14** e **HTML5 Canvas**.
- **Game Loop**: Implementado via `requestAnimationFrame` com cálculo de `deltaTime` para garantir suavidade independente da taxa de quadros (Performance Budget).
- **Estado**: Máquina de estados simples no motor (`idle`, `playing`, `won`, `lost`).
- **Input**: Abstração via `PointerEvents` para suporte nativo a Mouse (Desktop) e Touch (Mobile).
- **Física**: Detecção de colisão AABB simples para os canteiros e distância euclidiana para seleção de sementes.

## 3. Direção de Arte (Game Art)
- **Estilo**: Minimalista / Flat Design. Focado em formas geométricas limpas e cores vibrantes para alta legibilidade.
- **Feedback Visual**: 
    - **Shake**: Feedback de erro que comunica imediatamente a falha (Princípio de Exageração).
    - **Interpolação**: Movimentos suaves ao soltar peças fora do alvo.
- **Paleta**: Cores de alto contraste baseadas em HSL para garantir acessibilidade e harmonia.

## 4. Experiência Sonora (Game Audio)
Embora o MVP foque na lógica, a estrutura está preparada para:
- **Categorias**: BGM (Música de fundo calmanete), SFX (Acerto/Erro) e UI (Cliques).
- **Mixagem**: Hierarquia definida onde SFX de feedback tem prioridade sobre a música.
- **Controle**: Toggle global de som implementado na lógica de preferência do usuário.

## 5. Progressão e Psicologia do Jogador
- **Dificuldade**: Balanceada através de 3 níveis iniciais:
    - Nível 1: Tutorial e mecânica básica (Flow inicial).
    - Nível 2: Aumento de complexidade (Mais sementes, menos tempo).
    - Nível 3: Introdução de mecânica emergente (Semente Coringa).
- **Recompensa**: Sistema de "Sunlight" (moedas) e coleção visual no Jardim para estimular o perfil de "Colecionador/Conquistador".
