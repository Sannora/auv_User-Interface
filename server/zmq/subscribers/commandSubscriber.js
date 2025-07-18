console.log("🛠️ commandSubscriber.js yüklendi");
console.log('➡️ Komut mesajı alındı');

// WebSocket dosyasından broadcast fonksiyonunu çek
const { broadcast } = require('../../core/websocket');

// Veri komutlarını işleyen handler fonksiyonu
function handleCommand(msgBuf) {

    console.log("📥 Komut mesajı geldi");
    console.log("📦 Mesaj buf:", msgBuf);

    // Gelen mesajın uzunluğu 10 byte değilse, yani beklenen formatta değilse, işleme devam etme
    if (msgBuf.length !== 10){

      console.warn("❗ Hatalı uzunluk:", msgBuf.length);
      return;

    }

    console.log("✅ Mesaj uzunluğu doğru");
    console.log("➡️ handleCommand çağrıldı");

    // Gelen mesajın ilk 2 byte'ı sistem kodu ve komut kodunu, sonraki 8 byte'ı ise timestamp'i tutar
    // İlk byte'ın ilk 3 bit'i sistem kodunu, ikinci byte ise komut kodunu tutar
    // Zaman damgası ise 8 byte'lık bir unsigned integer olarak tutulur
    const system_code = msgBuf.readUInt8(0) & 0b111;
    const command_code = msgBuf.readUInt8(1);
    const timestamp = msgBuf.readBigUInt64LE(2).toString();


    broadcast({
      type: "command",
      context: "Module",
      data: {
        system_code,
        command_code,
        timestamp
      }
    });

    // Konsola gelen veriyi logla
    console.log('📥 Komut alındı ve gönderildi:', { system_code, command_code, timestamp });
}

// handleCommand fonksiyonunu dışa aktar
module.exports = handleCommand;
