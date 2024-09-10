import LogoutButton from "@/components/LogoutButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('authToken');  // Recupera o cookie

    // Verifica se o token existe
    if (!tokenCookie || !tokenCookie.value) {
        redirect("/");  // Redireciona para o login se não houver token
        return null;
    }

    const token = tokenCookie.value;  // Extrai o valor do cookie

    console.log("Token:", token);

    // Fazer requisição para obter os dados do usuário com base no token
    const res = await fetch("https://reqres.in/api/users/2", {  // Exemplo de API
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,  // Passa o token no cabeçalho
            "Content-Type": "application/json"
        }
    });

    const userData = await res.json();

    if (!res.ok) {
        console.error("Erro ao buscar dados do usuário", userData);
        redirect("/");  // Redireciona se houver erro ao buscar o usuário
        return null;
    }

    const userId = userData.data.id;  // Acessa o ID do usuário retornado pela API
    const userEmail = userData.data.email;  // Exemplo de como acessar o email também

    console.log("ID do Usuário:", userId);
    console.log("Email do Usuário:", userEmail);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-500"> {/* Centraliza na tela */}
            <div className="bg-gray-200 shadow-lg rounded-lg p-8 max-w-lg w-full text-center"> {/* Estilo do cartão */}
                <h1 className="text-2xl font-bold mb-4 text-black">Dashboard</h1>
                <div className="text-lg mb-2 text-black">Olá, {userEmail}</div>
                <div className="text-sm text-gray-600 mb-4">Seu Token: {token}</div>
                <div className="text-sm text-gray-600 mb-4">Seu ID: {userId}</div>
                <LogoutButton /> {/* Botão de Logout */}
            </div>
        </div>
    );
}
