// WebSocket'i çağır, port olarak da config dosyasından alınan portu kullan
const WebSocket = require('ws');
const { wsPort } = require('../config');

// WebSocket'a bağlanan bütün istemcilerin tutulduğu dizi
const clients = [];

// WebSocket sunucusunu almış olduğumuz wsPort portu üzerinden başlat
// 0.0.0.0 ile tüm IP'lerden gelen bağlantıları kabul et
const wsServer = new WebSocket.Server({ host:'0.0.0.0', port: wsPort });

// WebSocket bağlantısı kurulduğunda
wsServer.on('connection', (ws) => {
    // Yeni bağlantıyı clients dizisine ekle(push'la)
    clients.push(ws);
    // Yeni bağlantıyı logla
    console.log('✅ Yeni WebSocket bağlantısı');

    // Yeni kurulan bağlantıya bir test mesajı gönder
    ws.send(JSON.stringify({
        type: "test",
        context: "Module",
        data: "İlk WebSocket mesajı geldi."
    }));

    // Websocket bağlantısı kapandığında
    ws.on('close', () => {
        // Bağlantıyı clients dizisinden bul
        const i = clients.indexOf(ws);
        // index'i -1 değilse, yani bağlantı bulunmuşsa
        if (i !== -1) {
            // .splice() ile bağlantıyı diziden kaldır
            clients.splice(i, 1);
            // Bağlantının kapandığını logla
            console.log('❌ WebSocket bağlantısı kapatıldı');
        }
    })
});

// Verileri tüm istemcilere yayınlayacak fonksyion
function broadcast(data) {
    // Gelen veriyi String'e çevir. Çünkü WebSocket mesajları String yalnızca formatında gönderilir.
    const msg = JSON.stringify(data);
    console.log("📡 [broadcast] Gönderilen veri:", msg);
    // Tüm istemcileri dolaş
    clients.forEach(client => {
        // Eğer istemci açık ise (yani bağlantı hâlâ aktifse)
        if (client.readyState === WebSocket.OPEN) {
            // O istemciye mesajı gönder
            try{
                // Mesajı gönder
                client.send(msg);
            } catch (e) {
                console.error("🛑 Mesaj gönderilirken hata:", e);
            }
        }
    });
}

// broadcast fonksiyonunu dışa aktar
module.exports = { broadcast };