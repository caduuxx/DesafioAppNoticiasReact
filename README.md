# 📰 App de Notícias - React + TypeScript + Vite

Aplicativo de notícias desenvolvido como desafio técnico.  
O app consome a **NewsAPI** para exibir manchetes em tempo real, com busca, favoritos e detalhamento das notícias.

---

## 🚀 Tecnologias
- **React** + **TypeScript**
- **Vite** (build rápido e simples)
- **React Router** (navegação entre telas)
- **Context API** (gestão de estado global)
- **Fetch API** (requisições HTTP)
- **TailwindCSS** (estilização)
- **Boxicons** (ícones)

---

## 📱 Funcionalidades
- **Tela Inicial (Home)**
  - Lista de notícias com imagem, título, fonte e data.
  - Scroll infinito para carregar mais notícias.
  - Barra de busca para filtrar por palavra-chave.
  
- **Tela de Detalhes**
  - Exibe título completo, imagem em destaque e conteúdo.
  - Botão para favoritar ou remover dos favoritos.
  - Link para acessar a notícia original.

- **Favoritos**
  - Salva notícias favoritas em estado global.
  - Permite remover favoritos.

- **Outros**
  - Header fixo com barra de busca.
  - Mensagens de erro e fallback com dados mockados caso a API falhe.
  - Layout responsivo, estilo mobile-first.

---

## 📦 Instalação e Execução

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/app-noticias.git
cd app-noticias
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com sua chave da **NewsAPI**:

```
VITE_NEWS_API_KEY=sua_chave_aqui
```

Inicie o servidor:

```bash
npm run dev
```

Abra no navegador em **[http://localhost:5173](http://localhost:5173)**

---

## ⚙️ Estrutura de Pastas

```
src/
 ├── components/   # Componentes reutilizáveis (Header, NewsCard, etc.)
 ├── context/      # Context API (NewsContext.tsx)
 ├── pages/        # Telas principais (Home, Details, Favorites)
 ├── services/     # Comunicação com API (newsApi.ts)
 ├── mock/         # Dados mockados para fallback
 ├── App.tsx       # Estrutura de rotas
 └── main.tsx      # Ponto de entrada
```

---

## 🛠️ Decisões Técnicas

* **Context API**: escolhido para simplificar a gestão de estado (busca, favoritos e artigo atual) sem necessidade de Redux.
* **React Router**: usado para navegação entre Home, Detalhes e Favoritos.
* **Fallback com mock**: implementado para evitar falha em caso de limite da API gratuita.
* **TypeScript**: adicionado para aumentar a confiabilidade e clareza no desenvolvimento.
* **Vite**: rápido, simples e ideal para projetos React modernos.

---


## 🧪 Testes Locais

* Buscar notícias por palavra-chave.
* Favoritar e desfavoritar.
* Acessar detalhes via “Ler mais”.
* Recarregar página em “Detalhes” (deve mostrar fallback).
* Conferir favoritos persistindo enquanto o app estiver aberto.

---

## 📌 Observações

* A **NewsAPI** no plano gratuito possui limite de requisições diárias.  
  Caso o limite seja atingido, o app utiliza um **arquivo mock (mock/news.json)** para continuar funcionando.  
* Esse projeto foi desenvolvido no contexto de um desafio técnico.

---

## 👨‍💻 Autor

Carlos Eduardo Brandão Rodrigues  
[LinkedIn](https://www.linkedin.com/in/carloseduardobrandãodev/)

