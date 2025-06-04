// config/apiConfig.ts

const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL_BASE; // Ex: http://localhost:8080

if (!API_URL_BASE) {
  console.warn(
    "A variável de ambiente NEXT_PUBLIC_API_URL_BASE não está definida."
  );
}

export const apiConfig = {
  baseUrl: API_URL_BASE,
  posts: {
    list: `${API_URL_BASE}/post`,
    like: (postId: string | number) => `${API_URL_BASE}/post/${postId}`,
  },
  auth: {
    // Endpoint da TUA API Spring que recebe o 'code' do Google e retorna teu JWT
    googleCallback: `${API_URL_BASE}/login/oauth2/code/google`,
    // Endpoint da TUA API Spring para login com email/senha
    loginTradicional: `${API_URL_BASE}/api/auth/login`,
    exchangeGoogleCode: `${API_URL_BASE}/api/auth/google/exchange-code`,
  },
};
