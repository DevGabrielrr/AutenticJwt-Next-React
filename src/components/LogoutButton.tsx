"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        // Remover o cookie manualmente
        document.cookie = "authToken=; Max-Age=0; path=/;";  // Define o tempo de vida do cookie para 0

        // Redireciona para a página de login após logout
        router.push("/");
    };

    return (
        <button className="btn btn-outline text-black" onClick={handleLogout}>Sair</button>
    );
}
