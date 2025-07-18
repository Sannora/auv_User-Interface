const zmq = require('zeromq');
const express = require('express');
const cors = require('cors');

const sock = new zmq.Publisher();
const app = express();

app.use(cors());
app.use(express.json());

function sendCommand(system_code, command_code) {
  const buf = Buffer.alloc(10);
  const timestamp = BigInt(Math.floor(Date.now() / 1000));
  buf.writeUInt8(system_code & 0b111, 0);
  buf.writeUInt8(command_code, 1);
  buf.writeBigUInt64LE(timestamp, 2);

  sock.send(['Command', buf]);
  console.log(`📤 Gönderildi => system: ${system_code}, command: ${command_code}, timestamp: ${timestamp}`);
}

app.post('/api/send-command', (req, res) => {
  const { system_code, command_code } = req.body;

  if (
    typeof system_code !== 'number' || system_code < 0 || system_code > 7 ||
    typeof command_code !== 'number' || command_code < 0 || command_code > 255
  ) {
    return res.status(400).json({ error: 'Parametreler geçersiz' });
  }

  sendCommand(system_code, command_code);
  res.json({ success: true });
});

async function start() {
  await sock.bind("tcp://*:8889");
  console.log("📡 ZeroMQ Publisher aktif");

  app.listen(3001, '0.0.0.0', () => {
    console.log("🌐 Express 3001 portunda çalışıyor");
  });
}

start();
