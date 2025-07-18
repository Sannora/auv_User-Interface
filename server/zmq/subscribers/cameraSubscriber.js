// WebSocket dosyasından broadcast fonksiyonunu çek
const { broadcast } = require('../../core/websocket');

// Kamera verilerini al ve WebSocket üzerinden yayınla
function handleCameraData(topic, msgBuf) {
    
    // Gelen mesajı Base64 formatına çevir
    // Çünkü WebSocket mesajları String formatında gönderilir
    // ve kamera verileri genellikle ikili (binary) formatta gelir.
    const cameraData = msgBuf.toString("base64");

    // Gelen veriyi yazdır
    console.log('📷 Kamera verisi alındı (base64):', cameraData.slice(0, 50) + '...');

    // Veriyi WebSocket üzerinden yayınla
    broadcast(
        {
            type: "cameraData",
            data: cameraData,
        }
    )
}

module.exports = {
    handleCameraData
};