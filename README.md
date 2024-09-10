# Projeto AutenticJwt

Este projeto é um estudo sobre como implementar autenticação JWT (JSON Web Token) e salvar o token em cookies utilizando Next.js com React. O objetivo principal é entender como funciona o fluxo de autenticação, gerenciamento de sessões e proteção de rotas em uma aplicação moderna.A autenticação JWT neste projeto usa a API reqres.in. Quando o usuário faz login, o token JWT é gerado e retornado pela API. Este token é armazenado em um cookie no navegador, permitindo o gerenciamento de sessões seguras.

https://github.com/user-attachments/assets/d2cb5aae-a233-41cc-9290-7df63f7e9035

### Tecnologias Utilizadas

- React: ^18.3.1
- Next ^14.2.3
- Tailwind ^3.4.10
- JWT
- Cookies
- Api
- Axios

### Funcionalidades

- [x] Autenticação via JWT usando um backend fictício (API do reqres.in).
- [x] Salvamento do token JWT e ID do usuário em cookies.
- [x] Proteção de rotas baseadas em tokens de autenticação.
- [x] Redirecionamento automático para o dashboard após login bem-sucedido.
- [x] Logout e remoção do token de autenticação.

### 📦 Bibliotecas

⬇️Biblioteca Para manipulação de cookies tanto no lado do cliente quanto no servidor, facilitando o armazenamento e a recuperação de tokens.

```
npm install nookies
```

<br>

⬇️Biblioteca Alternativa para manipular cookies em diferentes contextos (cliente ou servidor) de maneira simples e eficiente.

```
npm install cookies-next
```

### Como Executar o Projeto

1. Clone o repositório:

   ````bash
   https://github.com/DevGabrielrr/AutenticJwt-Next-React.git
   ````

2. Navegue até o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Atualize o projeto, Em seu terminal e na pasta do projeto

   ```bash
   npm install
   ```

4. Rodar o projeto

   ```bash
   npm run dev
   ```
