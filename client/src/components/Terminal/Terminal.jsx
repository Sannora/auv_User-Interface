import { useEffect, useRef, useState } from 'react';
import './Terminal.css';
import { CONFIG } from '../../config';

function Terminal({ context }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://${CONFIG.WS_IP}:${CONFIG.WS_PORT}`);

    socket.onopen = () => {
      console.log("🔗 WebSocket bağlı");
    };

    socket.onmessage = (event) => {
      console.log("💬 Gelen raw veri:", event.data);
    
      try {
        const incoming = JSON.parse(event.data);
        console.log("💬 Gelen JSON:", incoming);
        console.log("📌 Gelen context:", incoming.context);
        console.log("📌 Bileşen context:", context);
      
        if (incoming.context === context) {
          const display = incoming.data ?? incoming;
          setMessages(prev => [...prev, JSON.stringify(display, null, 2)]);
          console.log("✅ context eşleşti, yazdırıldı");
        } else {
          console.warn("⚠️ Beklenmeyen context:", incoming.context);
        }
      
      } catch (e) {
        console.error("🛑 JSON parse hatası:", e, "Veri:", event.data);
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket bağlantısı kapandı");
    };

    return () => socket.close();
  }, [context]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="terminal" ref={messagesEndRef}>
      <ul className="terminal-output">
        {messages.map((msg, i) => (
          <li key={i} className="terminal-message">{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Terminal;
