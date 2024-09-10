import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials: Credentials | undefined) => {
        if (!credentials) return null;

        const { email, password } = credentials;

        const res = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
          // Retorna um objeto compatível com o tipo 'User'
          return {
            email: email,
            accessToken: data.token,  // Adiciona o token
            name: email,              // Ou outro valor apropriado, se necessário
            id: data.id,              // Adiciona o ID do usuário, se necessário
          };
        }

        return null;  // Se a autenticação falhar, retorna null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userId = user.id;  // Certifique-se de que o 'id' esteja presente no retorno da função authorize
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.userId = token.userId as string;
      return session;
    },
  },
});
