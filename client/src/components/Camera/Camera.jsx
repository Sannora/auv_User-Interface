import './Camera.css';
import { useState, useEffect } from "react";
import { CONFIG } from "../../config";

function Camera() {
    
    // Kamera verisini tutacak useState hook'u
    const [cameraData, setCameraData] = useState(null);

    // WebSocket bağlantısı kur ve mesajları dinle
    useEffect(() => {
        const socket = new WebSocket(`ws://${CONFIG.WS_IP}:${CONFIG.WS_PORT}`);

        socket.onopen = () => {
            console.log("🔗 WebSocket bağlı");
        }

        socket.onmessage = (event) => {

            try {

                const msg = JSON.parse(event.data);

                if (msg.type === 'cameraData') {
                    console.log("📷 Kamera verisi alındı:", msg.data);
                    setCameraData(msg.data);
                }

            } catch (error) {
                console.error("🛑 Mesaj işlenirken hata:", error);
            }

        }

        socket.onerror = (error) => console.error("❗ WebSocket hatası:", error);
        socket.onclose = () => console.log("❌ WebSocket bağlantısı kapandı");

        return () => socket.close();

    }, [])

    return (

        <div className="camera-component-container">
            {cameraData ? (
                <img src ={`data:image/jpeg;base64,${cameraData}`} alt="Kamera Görüntüsü" />
            ) : (
                <p>📷 Kamera verisi bekleniyor...</p>
            )}
        </div>

    );
}

export default Camera;
