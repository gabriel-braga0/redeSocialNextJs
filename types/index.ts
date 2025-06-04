// Tipo para o objeto 'usuario' dentro do post, como vem da API
export type ApiPostUser = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: string; // Ou Date se fizeres a conversão
};

export type UserProfile = {
  id: number;
  nome: string;
  email: string;
  // Se a tua API de login puder retornar mais campos úteis (ex: sobrenome, avatarUrl),
  // podes adicioná-los aqui como opcionais ou obrigatórios.
  // sobrenome?: string;
};

// Tipo para um item na lista de 'curtidas', como vem da API
// Assumindo que tem a mesma estrutura do usuário
export type ApiPostCurtida = ApiPostUser;

// Tipo para um item na lista de 'comentarios', como vem da API (define os campos necessários)
export type ApiPostComentario = {
  id: number;
  // Adiciona outros campos que um comentário possa ter, ex: texto, dataCriacao, usuario, etc.
  // Por agora, a tua API retorna um array vazio, mas é bom prever.
};

// Tipo para a estrutura de um post como vem diretamente da tua API
export type ApiPost = {
  id: number;
  conteudo: string;
  dataCriacao: string; // Ou Date se fizeres a conversão
  usuario: ApiPostUser;
  comentarios: ApiPostComentario[];
  curtidas: ApiPostCurtida[];
  isLikedByUser: boolean;
};

// Tipo PostData - O formato que os teus componentes frontend (Feed, Card) esperam
// Este é o tipo que resulta da transformação dos dados da API.
export type PostData = {
  id: string; // Geralmente é bom usar string para IDs no frontend
  conteudo: string;
  dataCriacao: string; // Mantém como string ou converte para Date se precisares de manipulação
  userName: string; // Ex: "João Silva"
  userHandle: string; // Ex: "joao.silva2" ou email
  avatarInitials: string; // Ex: "JS"
  initialLikes: number;
  initialIsLikedByCurrentUser: boolean;
  commentsCount: number;
  // Adiciona aqui quaisquer outros campos que o teu componente Card ou Feed possa precisar
  // Por exemplo, se tiveres imagens no post:
  // imageUrl?: string;
};
