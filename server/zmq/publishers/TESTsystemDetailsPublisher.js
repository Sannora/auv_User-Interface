const zmq = require('zeromq');

const sock = new zmq.Publisher();

async function start() {
  await sock.bind("tcp://*:8890"); // Test için ayrı bir port
  console.log("📡 SystemDetails Publisher aktif (8890)");

  // Her 2 saniyede bir sahte sistem verisi gönder
  setInterval(() => {
    const fakeData = {
      context: "SystemDetailsPanel",
      data: {
        cpuUsage: `${Math.floor(Math.random() * 100)}%`,
        gpuUsage: `${Math.floor(Math.random() * 100)}%`,
        temperature: `${(Math.random() * 40 + 20).toFixed(1)}°C`,
        pressure: `${(Math.random() * 5 + 1).toFixed(2)} bar`,
        depth: `${Math.floor(Math.random() * 1000)} m`,
        leak: Math.random() > 0.9 ? "💧 Sızıntı Var!" : "Yok",
        images: [] // Şimdilik boş
      }
    };

    const msg = JSON.stringify(fakeData);
    sock.send(['SystemDetails', msg]);
    console.log("🚀 Sahte sistem verisi gönderildi");
  }, 2000);
}

start();
