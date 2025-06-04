// components/Card.tsx
"use client";

import React, { useState, useEffect } from "react";
import { mutate as globalMutate } from "swr"; // Importa a função de mutação global do SWR
import {
  PiHeart,
  PiHeartFill,
  PiChat,
  PiArrowUpBold,
  PiChartLineUp,
  PiShareNetwork,
} from "react-icons/pi";

// --- Configurações da API e Autenticação (Mantenha consistentes com PostFeed.tsx) ---
const API_URL_BASE = `http://192.168.1.10:8080`; // Substitua pela base da URL da tua API
const API_URL_POSTS_LIST = `${API_URL_BASE}/post`; // Endpoint da lista de posts (usado como chave SWR)
const MOCKED_AUTH_TOKEN =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2FvLnNpbHZhMkBleGFtcGxlLmNvbSIsImV4cCI6MTc0ODc1MDY4M30.YbXijnzP5LRSYoavfHjp1Jc4OtzC_uuwOjnnk5bPWtmas8bpMYTFIGdY6BdRUwOGmpYcTYDJeRDJd1ZPsF8R7g"; // SUBSTITUA pelo teu token real ou pela forma como o obténs

type PropsCard = {
  id: string; // ID do post é essencial
  conteudo: string;
  userName: string;
  userHandle: string;
  avatarInitials: string;
  comments: number; // Esta é a contagem de comentários
  initialLikes: number;
  initialIsLikedByCurrentUser: boolean;
};

// O tipo PostData não é usado diretamente neste ficheiro se PropsCard for bem definido,
// mas é bom tê-lo em types/index.ts para referência geral.
// export type PostData = { ... };

const Card = ({
  id: postId, // Extrai o 'id' e renomeia para 'postId'
  conteudo,
  userName,
  userHandle,
  avatarInitials,
  comments,
  initialLikes,
  initialIsLikedByCurrentUser,
}: PropsCard) => {
  const [currentLikeCount, setCurrentLikeCount] = useState(initialLikes);
  const [isCurrentlyLiked, setIsCurrentlyLiked] = useState(
    initialIsLikedByCurrentUser
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isLoadingLike, setIsLoadingLike] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = async () => {
    // Transforma em async para usar await
    if (isLoadingLike) return; // Evita múltiplos cliques se já estiver a processar
    setIsLoadingLike(true);

    // 1. Guarda o estado anterior para reverter em caso de erro
    const previousLikeCount = currentLikeCount;
    const previousIsLiked = isCurrentlyLiked;

    // 2. Atualização Otimista da UI Local
    setCurrentLikeCount(
      isCurrentlyLiked ? currentLikeCount - 1 : currentLikeCount + 1
    );
    setIsCurrentlyLiked(!isCurrentlyLiked);

    try {
      // 3. Chama a API para persistir a mudança
      const response = await fetch(`${API_URL_BASE}/post/${postId}`, {
        // Usa postId aqui
        method: "POST",
        headers: {
          Authorization: `Bearer ${MOCKED_AUTH_TOKEN}`,
          // 'Content-Type': 'application/json', // Não é necessário se não há corpo
        },
        // body: null, // Não há corpo na tua API para esta ação
      });

      if (!response.ok) {
        // Se a API falhar, reverte a atualização otimista
        setCurrentLikeCount(previousLikeCount);
        setIsCurrentlyLiked(previousIsLiked);
        console.error(
          "Erro ao processar like/deslike na API:",
          response.statusText,
          await response.text()
        );
        throw new Error("Falha ao atualizar o like na API"); // Lança o erro para o catch
      }

      // 4. Sucesso! Diz ao SWR para revalidar os dados do feed.
      // A chave [API_URL_POSTS_LIST, MOCKED_AUTH_TOKEN] DEVE ser a mesma usada no useSWR em PostFeed.tsx.
      console.log(
        `Like/Deslike para post ${postId} processado com sucesso. Revalidando o feed...`
      );
      globalMutate([API_URL_POSTS_LIST, MOCKED_AUTH_TOKEN]);
    } catch (error) {
      console.error("Erro na função handleLike:", error);
      // Garante que a UI otimista é revertida se a chamada à API falhou e não foi revertida antes
      // (Isto é uma salvaguarda extra, pois o `if (!response.ok)` já deveria ter revertido)
      if (isCurrentlyLiked !== previousIsLiked) {
        setCurrentLikeCount(previousLikeCount);
        setIsCurrentlyLiked(previousIsLiked);
      }
      // Poderias mostrar uma notificação de erro para o utilizador aqui
    } finally {
      setIsLoadingLike(false); // Garante que o estado de loading é desativado
    }
  };

  return (
    <div
      className={`
        max-w-lvw w-11/12 bg-white text-gray-900 dark:bg-gray-700 dark:text-white 
        rounded-2xl shadow-xl my-2 transition-all duration-500 ease-out motion-safe:hover:scale-105
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
      `}
    >
      <div className="flex items-center p-4">
        <div className="w-12 h-12 rounded-full text-gray-900 bg-gray-50 flex items-center justify-center text-lg font-semibold">
          {avatarInitials}
        </div>
        <div className="ml-4">
          <h2 className="font-semibold text-gray-900 text-lg">{userName}</h2>
          <p className="text-gray-900 text-sm">@{userHandle}</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="text-gray-500">{conteudo}</p>
      </div>
      <div className="flex justify-between items-center p-4 text-blue-500">
        <button className="flex items-center space-x-2 hover:text-blue-200">
          <PiChartLineUp size={20} />
          <span>5</span> {/* Contador estático por enquanto */}
        </button>
        <button className="flex items-center space-x-2 hover:text-green-200">
          <PiArrowUpBold size={20} />
          <span>3</span> {/* Contador estático por enquanto */}
        </button>
        <button className="flex items-center space-x-2 hover:text-green-200">
          <PiChat size={20} />
          <span>{comments}</span> {/* Usa a prop 'comments' */}
        </button>
        <button
          onClick={handleLike}
          disabled={isLoadingLike} // Desabilita o botão enquanto carrega
          className={`flex items-center space-x-2 hover:text-red-300 dark:hover:text-red-400 transition-all 
            active:scale-90 duration-100 ease-in-out cursor-pointer
            ${isLoadingLike ? "opacity-50 cursor-not-allowed" : ""}
            ${
              isCurrentlyLiked
                ? "text-red-500 dark:text-red-500"
                : "text-gray-500 dark:text-gray-400"
            }
          `}
          aria-label={isCurrentlyLiked ? "Descurtir post" : "Curtir post"}
        >
          {isLoadingLike ? (
            <svg
              className="animate-spin h-5 w-5"
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
          ) : isCurrentlyLiked ? (
            <PiHeartFill size={20} />
          ) : (
            <PiHeart size={20} />
          )}
          <span>{currentLikeCount}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-gray-300 dark:hover:text-gray-400">
          <PiShareNetwork size={20} />
        </button>
      </div>
    </div>
  );
};

export default Card;
