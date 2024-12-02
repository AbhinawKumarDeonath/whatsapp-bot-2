const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './session_data' // Specify folder to save session data
    }),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});


// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
 
});
client.on('message_create', message => {
	if (message.body === 'Hi') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'Hello! How can I help you?');
	}
});


// Start your client
client.initialize();
