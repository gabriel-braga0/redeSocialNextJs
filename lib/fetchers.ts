// lib/fetchers.ts (cria esta pasta e ficheiro, ou onde achares melhor)

// Função fetcher genérica
export const fetcher = async (url: string, token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const error = new Error("Ocorreu um erro ao buscar os dados.");
    // Anexa informações extras ao erro, se possível.
    try {
      // Tenta obter mais detalhes do corpo da resposta do erro
      const errorDetails = await res.json();
      // @ts-ignore (para adicionar propriedades dinâmicas ao objeto de erro)
      error.info = errorDetails;
    } catch (e) {
      // Ignora se não conseguir fazer o parse do corpo do erro
    }
    // @ts-ignore
    error.status = res.status;
    throw error;
  }

  return res.json();
};
