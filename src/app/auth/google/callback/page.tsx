"use client";

import { useEffect, Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../../../../context/AuthContext";
import { apiConfig } from "../../../../../config/ApiConfig";
import type { UserProfile } from "../../../../../types";

function GoogleCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login: loginWithContext } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const code = searchParams.get("code");
    const googleError = searchParams.get("error");

    if (googleError) {
      console.error("Erro retornado pelo Google OAuth:", googleError);
      setError(
        `Ocorreu um erro durante a autenticação com o Google: ${googleError}. Por favor, tente novamente.`
      );
      setIsProcessing(false);
      // Opcional: redirecionar para /login com mensagem de erro após um tempo
      // setTimeout(() => router.push('/login?error=google_auth_failed'), 5000);
      return;
    }

    if (code) {
      const exchangeCodeForToken = async (authCode: string) => {
        try {
          const response = await fetch(apiConfig.auth.exchangeGoogleCode, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: authCode }),
          });

          type LoginApiResponse = {
            token: string;
            id: number;
            nome: string;
            email: string;
          };

          const data: LoginApiResponse = await response.json();

          if (!response.ok) {
            throw new Error(
              (data as any).message ||
                `Erro do servidor ao trocar código: ${response.status}`
            );
          }

          const { token, ...userDetails } = data;

          if (
            token &&
            userDetails.id != null &&
            userDetails.nome &&
            userDetails.email
          ) {
            const userProfileForContext: UserProfile = {
              id: userDetails.id,
              nome: userDetails.nome,
              email: userDetails.email,
            };
            loginWithContext(token, userProfileForContext);
            router.push("/");
          } else {
            throw new Error(
              "Token ou dados do utilizador essenciais não recebidos da API de callback."
            );
          }
        } catch (err: any) {
          console.error(
            "Erro ao trocar código de autorização do Google com o backend:",
            err
          );
          setError(
            err.message ||
              "Falha ao processar o login com Google. Tente novamente."
          );
        } finally {
          setIsProcessing(false);
        }
      };

      exchangeCodeForToken(code);
    } else if (!googleError) {
      setError(
        "Código de autorização não encontrado na URL. Redirecionando para login..."
      );
      setIsProcessing(false);
      setTimeout(() => router.push("/login"), 3000);
    }

    if (googleError) {
      setIsProcessing(false);
    }
  }, [searchParams, router, loginWithContext]);

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <p>Processando login com Google...</p>
        {/* spinner? */}
        <svg
          className="animate-spin h-8 w-8 text-blue-500 mt-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
        <p className="text-red-500 text-xl font-semibold">
          Erro no Login com Google
        </p>
        <p className="text-red-400 mt-2 mb-6 text-center">{error}</p>
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <p>Login com Google concluído. Redirecionando...</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
          <p>Carregando informações do Google...</p>
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
