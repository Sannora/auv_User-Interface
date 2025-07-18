// ZeroMQ'yu çağır, port olarak da config dosyasından alınan portu kullan
const zmq = require('zeromq');
const { zmqPort } = require('../config');
const { ipAddress } = require('../config');

// Veriyi topic'e göre ayrıştıracak handler fonksiyonları'nı çağır
const handleCommand = require('../zmq/subscribers/commandSubscriber');
const handleMetrics = require('../zmq/subscribers/systemDetailsSubscriber');
const { handleCameraData } = require('../zmq/subscribers/cameraSubscriber');


// ZeroMQ mesajlarını dinleyecek Subscriber'ı oluştur
const sock = new zmq.Subscriber();
sock.connect(`tcp://${ipAddress}:${zmqPort}`);

// Test SystemDetails yayınına da bağlan
sock.connect(`tcp://127.0.0.1:8890`);

// Kamera test yayınına bağlan
sock.connect(`tcp://127.0.0.1:8891`);
console.log('🔗 Kamera test yayınına bağlanıldı (8891)');

// Tüm topic'leri dinlemek için boş bir topic aboneliği yap (spesifik bir topic için örn. 'Command' yaz)
sock.subscribe('');

// Gelecek verinin topic verilerini tutacak bir dizi ve onu işleyecek bir forEach döngüsü
const topics = ['Command', 'SystemDetails', 'Camera'];
topics.forEach(topic => sock.subscribe(topic));

// ZeroMQ soketinin dinlenmeye başladığını logla
console.log(`✅ ZeroMQ Subscriber başlatıldı, port: ${zmqPort}`);

// Asenkron döngü ile
(async () => {
    // Mesaj geldikçe sock çalışacak
    // Topic ve mesaj bilgilerini tutacak topicBuf ve msgBuf
    for await (const [topicBuf, msgBuf] of sock){
        // Topic bilgisini Buffer'dan String'e çevir. Çünkü ZeroMQ mesajları Buffer formatında gelir.
        const topic = topicBuf.toString();

        console.log('✅ ZMQ mesajı alındı:', topic, msgBuf.toString());

        // Topic verisine göre handler fonksiyonunu çağıracak switch-case bloğu
        switch(topic){
            case 'Command':
                console.log('➡️ Komut mesajı alındı');
                handleCommand(msgBuf);
                break;
            case 'SystemDetails':
                console.log('➡️ Sistem detayları mesajı alındı');
                handleMetrics(topic, msgBuf);
                break;
            case 'Camera':
                console.log('➡️ Kamera mesajı alındı');
                handleCameraData(topic, msgBuf);
                break;
            default:
                console.warn(`❗ Bilinmeyen topic: ${topic}`);
        }
    }
})();