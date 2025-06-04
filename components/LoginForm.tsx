"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { apiConfig } from "../config/ApiConfig";
import type { UserProfile } from "../types/index";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login: loginWithContext } = useAuth();

  // --- Login Tradicional (Email/Senha) ---
  const handleTraditionalLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(apiConfig.auth.loginTradicional, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
          (data as any).message || "Falha no login. Verifique suas credenciais."
        );
      }

      const { token, ...userDetails } = data;

      const userProfileForContext: UserProfile = {
        id: userDetails.id,
        nome: userDetails.nome,
        email: userDetails.email,
      };

      loginWithContext(token, userProfileForContext);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Login com Google ---
  const handleGoogleLogin = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    if (!googleClientId || !googleRedirectUri) {
      console.error(
        "Variáveis de ambiente do Google (Client ID ou Redirect URI) não configuradas!"
      );
      setError("Configuração de login com Google indisponível no momento.");
      return;
    }

    const escopo = "openid email profile";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
      googleRedirectUri
    )}&response_type=code&scope=${encodeURIComponent(escopo)}`;

    window.location.href = authUrl;
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
      <div className="relative px-4 py-10 bg-black mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto text-white">
          <div className="flex items-center space-x-5 justify-center">
            {/* SVG ou Logo */}
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleTraditionalLogin} className="mt-5">
            <div>
              <label
                htmlFor="email"
                className="font-semibold text-sm text-gray-400 pb-1 block"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="font-semibold text-sm text-gray-400 pb-1 block"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500"
              />
            </div>
            <div className="text-right mb-4">
              <a
                href="#" // TODO: Implementar "Esqueci a senha"
                className="text-xs font-display font-semibold text-gray-500 hover:text-gray-400 cursor-pointer"
              >
                Forgot Password?
              </a>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                disabled={isLoading}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-6">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            <span className="text-xs text-gray-500 uppercase dark:text-gray-400">
              Or
            </span>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading} // Pode desabilitar durante o login tradicional também
              className="flex items-center justify-center py-2.5 px-4 bg-white hover:bg-gray-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg disabled:opacity-50"
            >
              <FcGoogle size={25} />
              <span className="ml-3">Sign in with Google</span>
            </button>
          </div>

          <div className="flex items-center justify-center mt-8">
            <a
              href="#" // TODO: Link para página de cadastro
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
