"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { setCookie } from "nookies";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const res = await fetch("https://reqres.in/api/login", { // Corrigido para usar login
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const data_rest = await res.json();
            console.log("Resposta da API:", data_rest);

            if (res.ok && data_rest.token) {
                // Salva o token no cookie
                setCookie(null, "authToken", data_rest.token, {
                    maxAge: 30 * 24 * 60 * 60, // Token válido por 30 dias
                    path: "/", // Disponível em todas as rotas
                });

                // Salva o id do usuário no cookie (verificar se a API retorna o id)
                if (data_rest.id) {
                    setCookie(null, "userId", data_rest.id, {
                        maxAge: 30 * 24 * 60 * 60,
                        path: "/",
                    });
                }

                console.log("Token e ID do usuário salvos no cookie:", data_rest.token, data_rest.id);

                // Redirecionar para o dashboard
                setTimeout(() => {
                    router.push("/dashboard");
                }, 100);
            } else {
                setApiError("Falha no login.");
            }
        } catch (error) {
            console.error("Erro no login:", error);
            setApiError("Erro ao tentar fazer login. Tente novamente.");
        }
    }

    return (
        <form
            onSubmit={login}
            className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-4 shadow-lg transition-transform transform hover:scale-105"
        >
            <h2 className="font-bold text-2xl text-gray-700 mb-6">Faça seu login</h2>
            <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-primary w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
            <input
                name="password"
                type="password"
                placeholder="Senha"
                className="input input-primary w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
            <button
                className="btn btn-primary w-full p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
                type="submit"
            >
                Login
            </button>

            {error === "CredentialsSignin" && (
                <div className="text-red-600">Erro no Login</div>
            )}

            {apiError && <div className="text-red-600">{apiError}</div>}
        </form>
    );
}
