# IMDB React Native App

Este é um aplicativo móvel desenvolvido em **React Native**, que permite a interação com a API [OMDb](https://www.omdbapi.com/) para adicionar e gerenciar filmes, além de realizar login e cadastro de usuários. A aplicação inclui funcionalidades para exibir uma lista de filmes em cards, visualizar detalhes do filme, adicionar e excluir filmes, além de gerenciar o estado do usuário.

## 📱 Funcionalidades

### 1. Tela de **Login**
- **Campos:** E-mail e Senha.
- **Botões:**
  - **Entrar:** Realiza a autenticação e leva o usuário à tela de "Cards".
  - **Cadastrar Usuário:** Direciona o usuário para a tela de cadastro.

### 2. Tela de **Cadastro de Usuário**
- **Campos:** Nome, Telefone, CPF, E-mail, Curso.
- **Botão:** 
  - **Salvar:** Salva as informações localmente utilizando **AsyncStorage** e redireciona o usuário para a tela de login.

### 3. Tela de **Cards**
- Exibe uma lista de filmes usando dados obtidos da API **OMDb**.
- **Campos:** Imagem, nome, status e outras informações relacionadas ao filme.
- **Botões:**
  - **Add:** Permite adicionar novos filmes utilizando a API.
  - **Excluir:** Permite excluir filmes da lista.
  - **Ver Mais Detalhes:** Direciona o usuário para a tela de detalhes do filme.

### 4. Tela de **Mais Detalhes do Filme**
- Exibe detalhes mais completos sobre o filme, como ano, gênero, classificação, etc.

### 5. **Logout**
- Permite que o usuário faça logout e seja redirecionado à tela de login.

---

## 🧠 Tecnologias Utilizadas

- **React Native:** Desenvolvimento mobile com JavaScript e React.
- **OMDb API:** Fornece dados dos filmes.
- **Axios:** Requisições HTTP.
- **AsyncStorage:** Armazenamento local de dados.
- **Styled-components:** Estilização dos componentes.
- **React Navigation:** Navegação entre as telas.

---

## 📦 Dependências

```bash
# Bibliotecas para navegação
npx expo install @react-navigation/native @react-navigation/stack

# Dependências adicionais para navegação
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler

# Styled-components para estilização
npx expo install styled-components

# Ícones
npx expo install @expo/vector-icons

# Axios para requisições HTTP
npx expo install axios

# AsyncStorage para armazenamento local
npx expo install @react-native-async-storage/async-storage
```
---

## 💾 Como rodar o projeto?

```bash
# Clone o repositório:
git clone https://github.com/seu-repositorio/imdb-react_native.git

# Instale as dependências:
cd imdb-react_native
npx expo install

# Rode o projeto:
npx expo start

