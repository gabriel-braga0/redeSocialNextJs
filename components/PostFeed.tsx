"use client";

import useSWR from "swr";
import { fetcher } from "../lib/fetchers";
import Feed from "./Feed";
import type { PostData } from "../types/index";
import CardSkeleton from "./CardSkeleton";
import { useAuth } from "../context/AuthContext"; // Já tens isto!

const API_URL_POSTS = `http://192.168.1.10:8080/post`;

const transformApiPostsToPostData = (apiPosts: any[]): PostData[] => {
  if (!Array.isArray(apiPosts)) {
    console.warn(
      "transformApiPostsToPostData: apiPosts não é um array. Retornando array vazio.",
      apiPosts
    );
    return [];
  }
  return apiPosts.map((apiPost) => ({
    id: String(apiPost.id),
    conteudo: apiPost.conteudo,
    dataCriacao: apiPost.dataCriacao,
    userName: `${apiPost.usuario.nome} ${apiPost.usuario.sobrenome}`,
    userHandle: apiPost.usuario.email,
    avatarInitials: `${apiPost.usuario.nome?.[0] || ""}${
      apiPost.usuario.sobrenome?.[0] || ""
    }`.toUpperCase(),
    initialLikes: apiPost.curtidas.length,
    initialIsLikedByCurrentUser: apiPost.isLikedByUser,
    commentsCount: apiPost.comentarios.length,
  }));
};

export default function PostFeed() {
  const { token, isAuthenticated, isLoadingToken } = useAuth();

  const swrKey = token ? [API_URL_POSTS, token] : null;

  const {
    data: rawApiPosts,
    error,
    isLoading: isLoadingSWRData,
  } = useSWR(swrKey, ([url, authToken]) => fetcher(url, authToken), {
    // revalidateOnFocus: false, // Para não revalidar automaticamente ao focar na janela (pode ser útil)
    // shouldRetryOnError: false, // Para não tentar novamente em caso de erro (ex: 401 não autorizado)
  });

  if (isLoadingToken) {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center p-10 text-gray-500 dark:text-gray-400">
        Por favor, faça login para ver os posts.
      </div>
    );
  }

  if (!swrKey || isLoadingSWRData) {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </>
    );
  }

  if (error) {
    console.error("Erro ao buscar posts com SWR no PostFeed:", error);
    const errorMessage =
      error.info?.message || error.message || "Erro desconhecido";

    return (
      <div className="text-center p-10 text-red-600 dark:text-red-400">
        <p>
          <strong>Oops! Algo deu errado ao carregar os posts.</strong>
        </p>
        <p>Detalhes: {String(errorMessage)}</p>
      </div>
    );
  }

  if (!rawApiPosts) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Nenhum post encontrado ou ainda a carregar.
      </p>
    );
  }

  const postsDoFeed = transformApiPostsToPostData(rawApiPosts);

  if (postsDoFeed.length === 0 && rawApiPosts.length > 0) {
    console.warn(
      "Os dados da API foram recebidos, mas a transformação resultou num array vazio de posts."
    );
  }
  if (postsDoFeed.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Ainda não há posts para mostrar. Seja o primeiro a postar!
      </p>
    );
  }

  return <Feed posts={postsDoFeed} />;
}
