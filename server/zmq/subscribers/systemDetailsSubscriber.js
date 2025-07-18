// WebSocket dosyasından broadcast fonksiyonunu çek
const { broadcast } = require('../../core/websocket');

// Sistem detaylarını işleyen handler fonksiyonu
function handleMetrics(topic, msgBuf) {
  try {
    // Gelen mesajı Buffer'dan önce String'e, ardından da String'ten JSON nesnesine çevir
    const msg = msgBuf.toString();
    const parsed = JSON.parse(msg);

    // Gelen veriyi broadcast fonksiyonunda nasıl yayınlayacağını belirle
    // broadcast fonksiyonuna veri gönder
    broadcast({
      type: topic,
      data: parsed.data || parsed,
      context: parsed.context || 'default',
    });

    // Mesaj çözümlenemeyince error döndür
  } catch (e) {
    console.error("JSON hatası:", e);
  }
}

// handleMetrics fonksiyonunu dışa aktar
module.exports = handleMetrics;
