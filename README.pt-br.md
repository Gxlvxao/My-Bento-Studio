# Bento Studio 🍱

> Crie Bento Grids incríveis e interfaces modernas com facilidade. Design sem limites.

[![English Version](https://img.shields.io/badge/Read_in-English-blue)](README.md)
![Status do Projeto](https://img.shields.io/badge/status-beta-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)

**Bento Studio** é uma ferramenta de design visual focada em interfaces modulares e estéticas. Funciona como um estúdio digital onde desenvolvedores e designers podem prototipar, criar e exportar layouts modernos, combinando a liberdade de um canvas com a estrutura de componentes web reais.

## 🚀 Funcionalidades Principais

* **Drag & Drop Magnético:** Sistema de posicionamento fluido via `react-rnd`.
* **UI Kits Inteligentes:** Componentes pré-construídos como Sidebars Dinâmicas, Navbars Modernas, Marquees e Headers.
* **Edição Granular:** Controle total sobre tipografia, cores, bordas, sombras e efeitos (blur, grayscale).
* **Formas Orgânicas:** Suporte a formas "vibes" como Blobs, Pílulas e Estrelas usando CSS Clip-path avançado.
* **Arquitetura SaaS:** (Em Progresso) Gestão de projetos, autenticação e suporte a múltiplas páginas.

## 🛠️ Stack Tecnológica

O projeto foi construído utilizando o que há de mais moderno no ecossistema React:

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Gerenciamento de Estado:** [Zustand](https://github.com/pmndrs/zustand)
* **Animações:** [GSAP](https://greensock.com/gsap) & CSS Nativo
* **Smooth Scroll:** [Lenis](https://github.com/studio-freight/lenis)
* **Ícones:** [Lucide React](https://lucide.dev/)

## 📦 Como Rodar

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/my-bento-studio.git](https://github.com/seu-usuario/my-bento-studio.git)
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor:**
    ```bash
    npm run dev
    ```

4.  **Acesse:** [http://localhost:3000](http://localhost:3000)

## 🔮 Arquitetura Futura (Roadmap)

Estamos migrando para uma Arquitetura Híbrida para a versão v1.0:
* **Frontend:** Next.js na Vercel (Atual)
* **Backend:** Laravel 11 API em VPS (Linux/Docker)
* **Tempo Real:** Laravel Reverb (WebSockets)

---
Feito com 💜 e TypeScript.