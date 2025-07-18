const zmq = require('zeromq');
const fs = require('fs');
const path = require('path');

async function main() {
    // Publisher soketi oluştur
    const sock = new zmq.Publisher();

    // 1 saniyede bir frame yayınlayalım
    const FPS = 1;

    // Bağlantıyı başlat
    await sock.bind(`tcp://127.0.0.1:8891`);
    console.log(`📡 Kamera Test Publisher başlatıldı: tcp://127.0.0.1:8891`);

    // Test için bir JPEG görsel oku (./test-images/test.jpg)
    const imagePath = path.join(__dirname, '../../test-images/test.jpg');

    // Periyodik gönderim
    setInterval(() => {
        try {
            const imageBuffer = fs.readFileSync(imagePath);
            sock.send(['Camera', imageBuffer]);
            console.log('📷 Görüntü gönderildi');
        } catch (err) {
            console.error('❗ Görüntü okunamadı:', err.message);
        }
    }, 1000 / FPS);
}

main();
