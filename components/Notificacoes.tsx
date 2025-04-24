import React, { useEffect, useState } from "react";

const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const userId = 1;

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8080/ws/notificacoes/${userId}`
    );

    socket.onmessage = (event) => {
      setNotificacoes((prev) => [...prev, event.data]);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>🔔 Notificações</h2>
      <ul>
        {notificacoes.map((notificacao, index) => (
          <li key={index}>{notificacao}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notificacoes;
