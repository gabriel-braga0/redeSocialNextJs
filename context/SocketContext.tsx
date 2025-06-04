// // context/SocketContext.tsx
// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { io, Socket } from "socket.io-client";
// import { useAuth } from "./AuthContext"; // Importa o useAuth para aceder ao token

// interface SocketContextType {
//   socket: Socket | null;
//   isConnected: boolean;
// }

// const SocketContext = createContext<SocketContextType | undefined>(undefined);

// // URL do teu servidor WebSocket
// const SOCKET_SERVER_URL = "http://localhost:3001"; // Substitui se necessário

// export function SocketProvider({ children }: { children: ReactNode }) {
//   const { token, isAuthenticated, isLoadingToken } = useAuth(); // Obtém o token do AuthContext
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     // Não tenta conectar se o token inicial ainda estiver a ser carregado ou se não estiver autenticado
//     if (isLoadingToken || !isAuthenticated || !token) {
//       // Se já existia um socket e o utilizador deslogou, desconecta-o
//       if (socket && !isAuthenticated) {
//         console.log(
//           "Socket.IO: Desconectando devido a logout ou token inválido."
//         );
//         socket.disconnect();
//         setSocket(null);
//         setIsConnected(false);
//       }
//       return;
//     }

//     // Se já existe um socket e está conectado, ou se já estamos a tentar conectar, não faz nada
//     // (Esta verificação pode precisar de mais robustez dependendo de como o token pode mudar durante uma sessão ativa)
//     if (socket?.connected) {
//       return;
//     }

//     console.log("Socket.IO: Tentando conectar com token...");
//     const socketInstance = io(SOCKET_SERVER_URL, {
//       // query: { token } // Alguns preferem enviar o token na query
//       auth: { token }, // socket.io v3+ recomenda usar 'auth' para tokens
//       // autoConnect: false, // Podes controlar a conexão manualmente se necessário
//     });

//     socketInstance.on("connect", () => {
//       console.log("Socket.IO: Conectado com ID:", socketInstance.id);
//       setIsConnected(true);
//     });

//     socketInstance.on("disconnect", (reason) => {
//       console.log("Socket.IO: Desconectado. Razão:", reason);
//       setIsConnected(false);
//       // Tenta reconectar se não for uma desconexão manual ou por erro de autenticação
//       if (reason === "io server disconnect") {
//         // O servidor desconectou intencionalmente a conexão.
//         // Pode ser necessário limpar o socket aqui para evitar loops de reconexão se o token for inválido.
//         socketInstance.connect(); // Tenta reconectar
//       } else if (reason === "io client disconnect") {
//         // Desconexão manual pelo cliente.
//       } else {
//         // Outras razões (ex: transporte fechado), tenta reconectar.
//         // O socket.io já tem lógicas de reconexão, mas podes adicionar a tua aqui.
//       }
//     });

//     socketInstance.on("connect_error", (err) => {
//       console.error("Socket.IO: Erro de conexão:", err.message, err.name);
//       // err.data pode conter informações do servidor sobre o erro de autenticação
//       setIsConnected(false);
//       // Se for um erro de autenticação, talvez não queiras tentar reconectar com o mesmo token.
//     });

//     setSocket(socketInstance);

//     // Função de limpeza para desconectar quando o componente/token mudar
//     return () => {
//       console.log("Socket.IO: Limpando instância do socket.");
//       socketInstance.disconnect();
//       setSocket(null);
//       setIsConnected(false);
//     };
//   }, [token, isAuthenticated, isLoadingToken, socket]); // Adicionado 'socket' para evitar loops com a verificação de socket?.connected

//   return (
//     <SocketContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

// export function useSocket() {
//   const context = useContext(SocketContext);
//   if (context === undefined) {
//     throw new Error("useSocket deve ser usado dentro de um SocketProvider");
//   }
//   return context;
// }
